import AutoAddress from 'component/address/AutoAddress';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import girlImg from 'assets/img/girl.jpg';
import 'assets/css/profile.css';
import axios from 'axios';
import authHeader from 'helper/auth-header';
import { Link, useHistory } from 'react-router-dom';

function Profile({ userId }) {
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({});
  useEffect(() => {
    const getProfile = async () => {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:3001/users/${userId}/profile`,
        {
          headers: authHeader(),
        }
      );
      setProfile(res.data.profile);
      setLoading(false);
    };

    getProfile();
  }, []);

  const checkProfile = JSON.stringify(profile) !== JSON.stringify({});

  console.log('check profile ', checkProfile);

  const { register, handleSubmit, errors } = useForm();
  const validation = [
    { required: false },
    { required: false },
    { required: false },
    { required: false },
    { required: false },
  ];

  const defaultValue = {
    province: checkProfile ? profile.address.province : '',
    district: checkProfile ? profile.address.district : '',
    village: checkProfile ? profile.address.village : '',
    street: checkProfile ? profile.address.street : '',
    houseNumber: checkProfile ? profile.address.houseNumber : '',
  };

  const [imgPreview, setImgPreview] = useState(null);
  const [err, setErr] = useState(false);

  const handleImageChange = e => {
    setErr(false);
    const selected = e.target.files[0];
    const ALLOW_TYPE = ['image/png', 'image/jpeg', 'image/jpg'];
    if (selected && ALLOW_TYPE.includes(selected.type)) {
      let reader = new FileReader();
      reader.onloadend = () => {
        setImgPreview(reader.result);
      };
      reader.readAsDataURL(selected);
    } else {
      setErr(true);
    }
  };

  const history = useHistory();

  const onSubmit = data => {
    const formData = new FormData();
    for (let i in data) {
      if(i !== "avatar")
      formData.append(i, data[i]);
    }
    formData.append("avatar", data.avatar[0]);
    const updateProfile = async () => {
      await axios
        .put(
          `http://localhost:3001/profile/${profile._id}`,
          formData,
          { headers: authHeader() }
        )
        .then(res => {
          if (res.data.success) {
            alert('Thay đổi thông tin thành công');
            window.location.reload();
          }
        })
        .catch(err => {
          if (err.res.status === 403) {
            alert(
              'Bạn không có quyền chỉnh sửa thông tin. Liên hệ admin để được cấp quyền'
            );
          }
        });
    };

    updateProfile();
  };

  const avt = profile.avatar
    ? `http://localhost:3001/${profile.avatar}`
    : girlImg;
  return (
    <div className="Profile">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="infoTop">
          <label className="preview">
            {err && (
              <p style={{ color: 'red', textAlign: 'center' }}>
                Vui lòng chọn file ảnh jpg/jpeg/png
              </p>
            )}
            <div
              className="imgPreview"
              // style={{
              //   background: imgPreview
              //     ? `url("${imgPreview}") no-repeat center/cover`
              //     : `url("${avt}") no-repeat center/cover`,
              // }}>
            >
              <img src={imgPreview ? imgPreview : avt} className="imgStyle" />
              {!imgPreview && <p className="chooseImg">Chọn ảnh</p>}
              <input
                type="file"
                onChange={handleImageChange}
                name="avatar"
                ref={register}
              />
              {/* {imgPreview && (
                <button className="deleteImg" >
                  <i className="far fa-trash-alt" onClick={() => setImgPreview(null)} tabIndex="0"></i>
                </button>
              )} */}
            </div>
          </label>
          <div className="user-pw">
            <label>
              <h3>Tên tài khoản</h3>
              <p>{checkProfile ? profile.user.username : ''}</p>
            </label>
            {/* <label>
              <h3>Mật khẩu</h3>
              <input type="password" />
            </label> */}
          </div>
        </div>
        <div className="information">
          <label>
            <h3>Họ và tên</h3>
            <input
              type="text"
              name="fullname"
              ref={register}
              defaultValue={checkProfile ? profile.fullname : ''}
            />
          </label>
          <label>
            <h3>Số căn cước</h3>
            <input
              type="text"
              name="identity"
              ref={register}
              defaultValue={checkProfile ? profile.identity : ''}
            />
          </label>
          <label>
            <h3>Số điện thoại</h3>
            <input
              type="number"
              name="phoneNumber"
              ref={register}
              defaultValue={checkProfile ? profile.phoneNumber : ''}
            />
          </label>
          <label>
            <h3>Email</h3>
            <input
              type="text"
              name="email"
              type="email"
              ref={register}
              defaultValue={checkProfile ? profile.email : ''}
            />
          </label>
          <label>
            <div className="address">
              <AutoAddress
                register={register}
                validation={validation}
                errors={errors}
                defaultValue={defaultValue}
                extend={true}
              />
            </div>
          </label>
        </div>
        <div className="containerBtn">
          <button type="submit">Thay đổi</button>
        </div>
      </form>
    </div>
  );
}

export default Profile;
