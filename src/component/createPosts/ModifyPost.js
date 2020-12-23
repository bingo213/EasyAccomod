import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import 'assets/css/modifyPost.css';
import axios from 'axios';
import authHeader from 'helper/auth-header';
import caculatePrice from 'helper/caculatePrice';
import AutoAddress from 'component/address/AutoAddress';
import PreviewImage from './PreviewImage';
import { useParams } from 'react-router-dom';

function ModifyPost() {
  const { register, handleSubmit, errors } = useForm();

  const { id } = useParams();
  console.log(id);
  const [post, setPost] = useState({});

  useEffect(() => {
    const getPost = async () => {
      await axios
        .get(`http://localhost:3001/post/${id}`)
        .then(res => {
          console.log(res);
          setPost(res.data.post);
        })
        .catch(err => console.log(err));
    };

    if (id) getPost();
  }, []);

  const checkPost = JSON.stringify(post) !== JSON.stringify({});
  const defaultAddress = checkPost ? post.address : '';

  const validation = [
    {
      required: 'Bạn chưa chọn tỉnh/thành phố',
    },
    {
      required: 'Bạn chưa chọn quận/huyện',
    },
    {
      required: 'Bạn chưa chọn xã/phường',
    },
    {
      required: 'Bạn chưa nhập tên đường',
    },
    {
      required: 'Bạn chưa nhập số nhà',
      min: {
        value: 1,
        message: 'Số nhà không hợp lệ',
      },
    },
  ];
  const [time, setTime] = useState(0);
  const [typeOfTime, setTypeOfTime] = useState('');
  const [price, setPrice] = useState(0);

  useEffect(() => {
    checkPost && setTime(post.duration);
    checkPost && setTypeOfTime(post.typeOfTime);
    checkPost && setPrice(post.priceOfPost);
  }, []);

  const handleChangeTime = e => {
    setTime(e.target.value);
  };

  const handleChangeTypeOfTime = e => {
    setTypeOfTime(e.target.value);
  };

  useEffect(() => {
    setPrice(caculatePrice({ time: time, typeOfTime: typeOfTime }));
  }, [time, typeOfTime]);

  const onSubmit = async data => {
    const formData = new FormData();
    data.priceOfPost = price;
    for (let i in data) {
      if (i !== 'postImages') {
        formData.append(i, data[i]);
      }
    }
    if (!(checkPost && data.postImages.length == 0)) {
      for (let j = 0; j < data.postImages.length; j++) {
        formData.append('postImages', data.postImages[j]);
      }
    }

    const postData = await (() => {
      axios
        .post('http://localhost:3001/post', formData, { headers: authHeader() })
        .then(res => console.log(res))
        .catch(err => console.log(err));
    });
    const putData = await (() => {
      console.log('put:...', data);
      axios
        .put(`http://localhost:3001/post/${post._id}`, formData, {
          headers: authHeader(),
        })
        .then(res => console.log(res))
        .catch(err => console.log(err));
    });

    if (checkPost) putData();
    else postData();
  };

  return (
    <div className="ModifyPost">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="address">
          <h2>Địa chỉ</h2>
          {/* {id ? } */}
          {checkPost ? (
            <AutoAddress
              register={register}
              validation={[
                { required: false },
                { required: false },
                { required: false },
                { required: false },
                { required: false },
              ]}
              errors={errors}
              extend={true}
              defaultValue={defaultAddress}
            />
          ) : (
            <AutoAddress
              register={register}
              validation={validation}
              errors={errors}
              extend={true}
              defaultValue={defaultAddress}
            />
          )}
          {/* <label>
            <p>Mô tả</p>
            <input
              type="text"
              ref={register}
              name="description"
              defaultValue={checkPost ? post.description : ''}
            />
          </label> */}
          <label className="createPostLabel">
            <p>Mô tả thêm thông tin</p>
            <textarea
              name="services"
              ref={register}
              defaultValue={checkPost ? post.services : ''}
              placeholder="Gần những địa điểm công cộng nào (trường học, bện viện, chợ,...)"
            />
          </label>
        </div>

        <div className="general">
          <h2>Mô tả chung</h2>
          <label className="createPostLabel">
            <p>Loại phòng</p>
            <select
              name="typeOfRoom"
              ref={register}
              defaultValue={checkPost ? post.typeOfRoom : ''}
            >
              <option value="phongtro">Phòng trọ</option>
              <option value="chungcu">Chung cư mini</option>
              <option value="nha_nguyencan">Nhà nguyên căn</option>
              <option value="chungcu_nguyencan">Chung cư nguyên căn</option>
            </select>
          </label>
          <label className="createPostLabel">
            <p>Số lượng phòng</p>
            {errors.numberOfRoom && (
              <p className="createPostErrorMessage">
                {errors.numberOfRoom.message}
              </p>
            )}
            <input
              name="numberOfRoom"
              type="number"
              placeholder="1 - 1000"
              defaultValue={checkPost ? post.numberOfRoom : ''}
              ref={register({
                required: 'Bạn chưa nhập số lượng phòng',
                min: {
                  value: 1,
                  message: 'Số lượng phòng ít nhất là 1',
                },
                max: {
                  value: 1000,
                  message: 'Số lượng phòng ít nhất là 1',
                },
              })}
            />
          </label>
          <div className="createPostPrice">
            <label className="createPostLabel flexLabel">
              <p>Giá phòng</p>
              {errors.price && (
                <p className="createPostErrorMessage">{errors.price.message}</p>
              )}
              <input
                name="price"
                placeholder="1 - 100.000.000.000"
                defaultValue={checkPost ? post.price : ''}
                ref={register({
                  required: 'Bạn cần nhập vào giá tiền',
                  min: { value: 1, message: 'Giá tiền không hợp lệ' },
                  max: {
                    value: 100000000000,
                    message: 'Diện tích không hợp lệ',
                  },
                })}
              />
            </label>{' '}
            <p className="slash">/</p>
            <div className="typeOfPrice">
              <label>
                <p>tháng</p>
                <select
                  name="typeOfPrice"
                  ref={register}
                  defaultValue={checkPost ? post.typeOfPrice : ''}
                >
                  <option value="month">Tháng</option>
                  <option value="quarter">Quý</option>
                  <option value="year">Năm</option>
                </select>
              </label>
            </div>
          </div>
          <label className="createPostLabel">
            <p>
              Diện tích (m<sup>2</sup>)
            </p>
            <input
              name="area"
              placeholder="1 - 1000"
              defaultValue={checkPost ? post.area : ''}
              ref={register({
                required: 'Bạn cần nhập vào diện tích',
                min: { value: 1, message: 'Diện tích không hợp lệ' },
                max: { value: 1000, message: 'Diện tích không hợp lệ' },
              })}
            />
          </label>
          <label className="createPostLabel">
            <p>Chung chủ</p>
            <select
              name="withOwner"
              ref={register}
              defaultValue={checkPost ? post.createPostLabel : ''}
            >
              <option value="true">Có</option>
              <option value="false">Không</option>
            </select>
          </label>
        </div>
        <div className="facilities">
          <h2>Cơ sở vật chất</h2>
          <div className="createPostFlex">
            <div className="createPostRow">
              <label className="createPostLabel2">
                <p>Phòng tắm</p>
                <select
                  name="typeOfBathroom"
                  ref={register}
                  defaultValue={checkPost ? post.typeOfBathroom : ''}
                >
                  <option value="private">Khép kín</option>
                  <option value="public">Không khép kín</option>
                </select>
              </label>
              <label className="createPostLabel2">
                <p>Bếp</p>
                <select
                  name="typeOfKitchen"
                  ref={register}
                  defaultValue={checkPost ? post.typeOfKitchen : ''}
                >
                  <option value="public">Bếp riêng</option>
                  <option value="private">Bếp chung</option>
                  <option value="no">Không nấu ăn</option>
                </select>
              </label>
              <label className="createPostLabel2">
                <p>Điều hòa</p>
                <select
                  name="hasAirCon"
                  ref={register}
                  defaultValue={checkPost ? post.hasAirCon : ''}
                >
                  <option value="true">Có</option>
                  <option value="false">Không</option>
                </select>
              </label>
            </div>
            <div className="createPostRow">
              <label className="createPostLabel2">
                <p>Ban công</p>
                <select
                  name="hasBalcony"
                  ref={register}
                  defaultValue={checkPost ? post.hasBalcony : ''}
                >
                  <option value="true">Có</option>
                  <option value="false">Không</option>
                </select>
              </label>
              <label className="createPostLabel2">
                <p>Điện (đồng/kWh)</p>
                {errors.priceOfElect && (
                  <p className="createPostErrorMessage">
                    {errors.priceOfElect.message}
                  </p>
                )}
                <input
                  name="priceOfElect"
                  placeholder="0 - 10.000"
                  defaultValue={checkPost ? post.priceOfElect : ''}
                  ref={register({
                    required: 'Bạn cần nhập tiền điện',
                    min: { value: 0, message: 'Số tiền bạn nhập không hợp lệ' },
                    max: {
                      value: 10000,
                      message: 'Số tiền bạn nhập không hợp lệ',
                    },
                  })}
                  type="number"
                />
              </label>
              <label className="createPostLabel2">
                <p>Nước (đồng/m3)</p>
                {errors.priceOfWater && (
                  <p className="createPostErrorMessage">
                    {errors.priceOfWater.message}
                  </p>
                )}
                <input
                  placeholder="0 - 50.000"
                  name="priceOfWater"
                  type="number"
                  defaultValue={checkPost ? post.priceOfWater : ''}
                  ref={register({
                    required: 'Bạn cần nhập tiền nước',
                    min: { value: 0, message: 'Số tiền bạn nhập không hợp lệ' },
                    max: {
                      value: 50000,
                      message: 'Số tiền bạn nhập không hợp lệ',
                    },
                  })}
                />
              </label>
            </div>
          </div>
          <label className="createPostLabel labelSelect">
            <p>Bình nóng lạnh</p>
            <select
              name="hasHeater"
              ref={register}
              defaultValue={checkPost ? post.hasHeater : ''}
            >
              <option value="true">Có</option>
              <option value="false">Không</option>
            </select>
          </label>
          <label className="createPostLabel">
            <p>Tiện ích khác</p>
            <textarea
              name="services"
              ref={register}
              defaultValue={checkPost ? post.services : ''}
              placeholder="Máy giặt, tủ lạnh, giường tủ,..."
            />
          </label>
        </div>
        <div className="uploadImg">
          <h2>Ảnh phòng trọ</h2>
          <label className="createPostLabel">
            <p>Tiêu đề</p>
            <input
              type="text"
              name="title"
              defaultValue={checkPost ? post.title : ''}
              placeholder="Tối đa 100 kí tự"
              ref={register({
                required: 'Bạn cần đặt tiêu đề cho bài đăng',
                maxLength: {
                  value: 100,
                  message: 'Tiêu đề quá dài',
                },
              })}
            />
          </label>
          {/* <label className="createPostLabel">
            Mô tả thêm thông tin
            <textarea
              name="description"
              placeholder="Gần những địa điểm công cộng nào? ..."
              defaultValue={checkPost ? post.description : ''}
              ref={register}
            ></textarea>
          </label> */}
          <label className="createPostLabel">
            <p>Ảnh phòng trọ</p>
            {errors.postImages && (
              <p className="createPostErrorMessage">
                {errors.postImages.message}
              </p>
            )}
            {checkPost ? (
              <input
                name="postImages"
                type="file"
                ref={register({ required: false })}
                multiple
              />
            ) : (
              <input
                name="postImages"
                type="file"
                ref={register({
                  required: 'Bạn chưa chọn ảnh nào',
                })}
                multiple
              />
            )}
            {checkPost ? (
              <div>
                Những ảnh đã chọn:
                <PreviewImage images={post.images} />
              </div>
            ) : (
              ''
            )}
          </label>
          <div className="createPostPrice">
            <label className="createPostLabel flexLabel">
              <p>Thời gian hiển thị bài đăng</p>
              {errors.duration && (
                <p className="createPostErrorMessage">
                  {errors.duration.message}
                </p>
              )}
              <input
                name="duration"
                type="number"
                placeholder="1 - 100000000000"
                defaultValue={post ? post.duration : 0}
                ref={register({
                  required: 'Bạn cần nhập vào giá tiền',
                  min: { value: 1, message: 'Thời gian hiển thị không hợp lệ' },
                  max: {
                    value: 100000000000,
                    message: 'Thời gian hiển thị không hợp lệ',
                  },
                })}
                onChange={handleChangeTime}
              />
            </label>
            <div>
              <label>
                <p>Đơn vị</p>
                {errors.typeOfTime && (
                  <p className="createPostErrorMessage">
                    {errors.typeOfTime.message}
                  </p>
                )}
                <select
                  name="typeOfTime"
                  ref={register({ required: 'Chọn đơn vị' })}
                  onChange={handleChangeTypeOfTime}
                  defaultValue={checkPost ? post.typeOfTime : ''}
                >
                  <option value="" hidden>
                    Dv
                  </option>
                  <option value="month">Tháng</option>
                  <option value="quarter">Quý</option>
                  <option value="year">Năm</option>
                </select>
              </label>
            </div>
          </div>

          <label>Số tiền phải thanh toán: {price}</label>
        </div>
        <div className="button">
          <button type="submit">Hoàn thành</button>
        </div>
      </form>
    </div>
  );
}

export default ModifyPost;
