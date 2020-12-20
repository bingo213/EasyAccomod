import { useStateMachine } from 'little-state-machine';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Redirect, withRouter } from 'react-router-dom';
import updateAction from './updateAction';
import 'assets/css/createPost.css';
import { ErrorMessage } from '@hookform/error-message';

function GeneralDetail(props) {
  const { register, handleSubmit, errors } = useForm();
  const { action, state } = useStateMachine(updateAction);
  const onSubmit = data => {
    action(data);
    props.history.push('/create_post/facilities');
  };
  return (
    <div className="createPostContainer">
      <form onSubmit={handleSubmit(onSubmit)} className="createPostForm">
        <h2 className="createPostTitle">Nhập thông tin phòng trọ</h2>
        <label className="createPostLabel">
          <p>Loại phòng</p>
          <select name="typeOfRoom" ref={register}>
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
              ref={register({
                required: 'Bạn cần nhập vào giá tiền',
                min: { value: 1, message: 'Giá tiền không hợp lệ' },
                max: { value: 100000000000, message: 'Diện tích không hợp lệ' },
              })}
            />
          </label> <p className="slash">/</p>
          <div className="typeOfPrice">
            <label>
              <p>tháng</p>
              <select name="typeOfPrice" ref={register}>
                <option value="month">Tháng</option>
                <option value="quarter">Quý</option>
                <option value="year">Năm</option>
              </select>
            </label>
          </div>
        </div>
        <label className="createPostLabel">
          <p>Diện tích (m<sup>2</sup>)</p>
          <input
            name="area"
            placeholder="1 - 1000"
            ref={register({
              required: 'Bạn cần nhập vào diện tích',
              min: { value: 1, message: 'Diện tích không hợp lệ' },
              max: { value: 1000, message: 'Diện tích không hợp lệ' },
            })}
          />
        </label>
        <label className="createPostLabel">
          <p>Chung chủ</p>
          <select name="withOwner" ref={register} >
            <option value="true">Có</option>
            <option value="false">Không</option>
          </select>
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

export default withRouter(GeneralDetail);
