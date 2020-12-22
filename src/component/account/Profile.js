import AutoAddress from 'component/address/AutoAddress';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import girlImg from 'assets/img/girl.jpg';
import 'assets/css/profile.css';

function Profile() {
  const { register, handleSubmit, errors } = useForm();
  const validation = [
    { required: false },
    { required: false },
    { required: false },
    { required: false },
    { required: false },
  ];

  const defaultValue = {
    province: 'Hà Nội',
    district: 'Cầu Giấy',
    village: 'Dịch Vọng Hậu',
    street: 'Xuân Thủy',
    houseNumber: 144,
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
  return (
    <div className="Profile">
     <form>
         <div className="infoTop">
              <label className="preview">
                {err && (
                  <p style={{ color: 'red', textAlign:"center"}}>Vui lòng chọn file ảnh jpg/jpeg/png</p>
                )}
                <div
                  className="imgPreview"
                  style={{
                    background: imgPreview
                      ? `url("${imgPreview}") no-repeat center/cover`
                      : `url("${girlImg}") no-repeat center/cover`,
                  }}
                >
                  {!imgPreview && <p className="chooseImg">Chọn ảnh</p>}
                  <input type="file" onChange={handleImageChange} />
                  {imgPreview && (
                    <button className="deleteImg">
                      <i className="far fa-trash-alt"></i>
                    </button>
                  )}
                </div>
              </label>
              <div className="user-pw">
                  <label><h3>Tên tài khoản</h3><input type="text"/></label>
                  <label><h3>Mật khẩu</h3><input type="password"/></label>
              </div>
         </div>
          <div className="information">
              <label>
                <h3>Họ và tên</h3>
                <input type="text" />
              </label>
              <label>
                <h3>Số căn cước</h3>
                <input type="text" />
              </label>
              <label>
                <h3>Email</h3>
                <input type="text" />
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
          <div className="containerBtn"><button type="submit">Thay đổi</button></div>
     </form>
    </div>
  );
}

export default Profile;
