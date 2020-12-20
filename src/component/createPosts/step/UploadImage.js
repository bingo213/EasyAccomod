import { useStateMachine } from 'little-state-machine';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { withRouter } from 'react-router-dom';
import updateAction from './updateAction';
import * as yup from 'yup';
import axios from 'axios';
import authHeader from 'helper/auth-header';
import caculatePrice from 'helper/caculatePrice';

function UploadImage(props) {
  const { action, state } = useStateMachine(updateAction);
  const schema = yup.object().shape({
    image: yup
      .array()
      .required('Bạn cần tải ảnh lên')
      .length(3, ({ min }) => 'Bạn cẩn chọn ít nhất 3 ảnh'),
  });
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = data => {
    action(data);
    state.data.priceOfPost = price;

    const postData = async post_data => {
      console.log('trong async function');
      const header = { ...authHeader(), 'Content-Type': 'multipart/form-data' };
      await axios
        .post(
          'http://localhost:3001/post',
          { ...post_data },
          { headers: header }
        )
        .then(res => {
          if (res.data.success) {
            props.history.push('/create_post/submit');
          }
        })
        .catch(err => alert('Điền thiếu thông tin.'));
    };
    postData({ ...state.data });
  };

  const [time, setTime] = useState(0);
  const [typeOfTime, setTypeOfTime] = useState('');
  const [price, setPrice] = useState(0);

  const handleChangeTime = e => {
    setTime(e.target.value);
  };

  const handleChangeTypeOfTime = e => {
    setTypeOfTime(e.target.value);
  };

  useEffect(() => {
    setPrice(caculatePrice({ time: time, typeOfTime: typeOfTime }));
  }, [time, typeOfTime]);

  return (
    <div className="createPostContainer">
      <form className="createPostForm" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="createPostTitle">Tải ảnh lên</h2>
        <label className="createPostLabel">
          Tiêu đề
          <input
            type="text"
            name="title"
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
        <label className="createPostLabel">
          Mô tả thêm thông tin
          <textarea
            name="description"
            placeholder="Gần những địa điểm công cộng nào? ..."
          ></textarea>
        </label>
        <label className="createPostLabel">
          <p>Ảnh phòng trọ</p>
          {errors.image && (
            <p className="createPostErrorMessage">{errors.image.message}</p>
          )}
          <input
            name="postImages"
            type="file"
            ref={register({
              required: 'alo',
            })}
            multiple
          />
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
              placeholder="1 - 100000000000"
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
                defaultValue=""
              >
                <option value="" hidden>
                  Đơn vị
                </option>
                <option value="month">Tháng</option>
                <option value="quarter">Quý</option>
                <option value="year">Năm</option>
              </select>
            </label>
          </div>
        </div>

        <label>Số tiền phải thanh toán: {price}</label>
        <div className="createPostContainerButton">
          <button
            className="createPostButtonCancel"
            onClick={() => {
              props.history.push('/');
            }}
          >
            Huỷ
          </button>
          <button className="createPostButton" type="submit">
            Gửi
          </button>
        </div>
      </form>
    </div>
  );
}

export default withRouter(UploadImage);
