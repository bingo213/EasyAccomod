import { useStateMachine } from 'little-state-machine';
import React from 'react';
import { useForm } from 'react-hook-form';
import { withRouter } from 'react-router-dom';
import updateAction from './updateAction';
import 'assets/css/createPost.css';
import { required } from 'react-admin';

function Facilities(props) {
  const { register, handleSubmit, errors } = useForm();
  const { action, state } = useStateMachine(updateAction);
  const onSubmit = data => {
    action(data);
    props.history.push('/create_post/upload_image');
  };
  return (
    <div className="createPostContainer">
      <form className="createPostForm" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="createPostTitle">Nhập thông tin cơ sở vật chất</h2>
        <div className="createPostFlex">
          <div className="createPostRow">
            <label className="createPostLabel2">
              <p>Phòng tắm</p>
              <select name="typeOfBathroom" ref={register}>
                <option value="private">Khép kín</option>
                <option value="public">Không khép kín</option>
              </select>
            </label>
            <label className="createPostLabel2">
              <p>Bếp</p>
              <select name="typeOfKitchen" ref={register}>
                <option value="public">Bếp riêng</option>
                <option value="private">Bếp chung</option>
                <option value="no">Không nấu ăn</option>
              </select>
            </label>
            <label className="createPostLabel2">
              <p>Điều hòa</p>
              <select name="hasAirCon" ref={register}>
                <option value="true">Có</option>
                <option value="false">Không</option>
              </select>
            </label>
          </div>
          <div className="createPostRow">
            <label className="createPostLabel2">
              <p>Ban công</p>
              <select name="hasBalcony" ref={register}>
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
                ref={register({
                  required: 'Bạn cần nhập tiền điện',
                  min: { value: 0, message: 'Số tiền bạn nhập không hợp lệ' },
                  max: { value: 10000, message: 'Số tiền bạn nhập không hợp lệ' }
                })}
                type="number"
              />
            </label>
            <label className="createPostLabel2">
              <p>Nước (đồng/m3)</p>
              {errors.priceOfWater && (
                <p className="createPostErrorMessage">{errors.priceOfWater.message}</p>
              )}
              <input
                placeholder="0 - 50.000"
                name="priceOfWater"
                type="number"
                ref={register({
                  required: 'Bạn cần nhập tiền nước',
                  min: { value: 0, message: 'Số tiền bạn nhập không hợp lệ' },
                  max: { value: 50000, message: 'Số tiền bạn nhập không hợp lệ' }
                })}
              />
            </label>
          </div>
        </div>
        <label className="createPostLabel labelSelect">
          <p>Bình nóng lạnh</p>
          <select name="hasHeater" ref={register}>
            <option value="true">Có</option>
            <option value="false">Không</option>
          </select>
        </label>
        <label className="createPostLabel">
          <p>Tiện ích khác</p>
          <textarea name="services" ref={register} placeholder="Máy giặt, tủ lạnh, giường tủ,..."/>
        </label>
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
            Tiếp theo
          </button>
        </div>
      </form>
    </div>
  );
}

export default withRouter(Facilities);
