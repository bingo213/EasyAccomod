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
              <select name="bathRoom" ref={register}>
                <option value="">Khép kín</option>
                <option value="">Không khép kín</option>
              </select>
            </label>
            <label className="createPostLabel2">
              <p>Bếp</p>
              <select name="kitchen" ref={register}>
                <option value="k1">Bếp riêng</option>
                <option value="k2">Bếp chung</option>
                <option value="k3">Không nấu ăn</option>
              </select>
            </label>
            <label className="createPostLabel2">
              <p>Điều hòa</p>
              <select name="airCondition" ref={register}>
                <option value="true">Có</option>
                <option value="false">Không</option>
              </select>
            </label>
          </div>
          <div className="createPostRow">
            <label className="createPostLabel2">
              <p>Ban công</p>
              <select name="bacony" ref={register}>
                <option value="true">Có</option>
                <option value="false">Không</option>
              </select>
            </label>
            <label className="createPostLabel2">
              <p>Điện (đồng/kWh)</p>
              {errors.electricity && (
                <p className="createPostErrorMessage">
                  {errors.electricity.message}
                </p>
              )}
              <input
                name="electricity"
                ref={register({ required: 'Bạn cần nhập tiền điện' })}
                type="number"
                defaultValue={0}
              />
            </label>
            <label className="createPostLabel2">
              <p>Nước (đồng/m3)</p>
              {errors.water && (
                <p className="createPostErrorMessage">{errors.water.message}</p>
              )}
              <input
                name="water"
                type="number"
                ref={register({ required: 'Bạn cần nhập tiền nước' })}
                defaultValue={0}
              />
            </label>
          </div>
        </div>
        <label className="createPostLabel labelSelect">
          <p>Bình nóng lạnh</p>
          <select name="bacony" ref={register}>
            <option value="true">Có</option>
            <option value="false">Không</option>
          </select>
        </label>
        <label className="createPostLabel">
          <p>Tiện ích khác</p>
          <textarea name="other" ref={register} />
        </label>
        <div className="createPostContainerButton">
          <button className="createPostButton" type="submit">
            Tiếp theo
          </button>
        </div>
      </form>
    </div>
  );
}

export default withRouter(Facilities);
