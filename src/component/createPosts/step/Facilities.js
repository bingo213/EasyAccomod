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
              <input name="bathRoom" ref={register} />
            </label>
            <label className="createPostLabel2">
              <p>Bếp</p>
              <input name="kitchen" ref={register} />
            </label>
            <label className="createPostLabel2">
              <p>Điều hòa</p>
              <input name="airCondition" ref={register} />
            </label>
          </div>
          <div className="createPostRow">
            <label className="createPostLabel2">
              <p>Ban công</p>
              <input name="bacony" ref={register} />
            </label>
            <label className="createPostLabel2">
              <p>Điện (đồng/kWh)</p>
              <input
                name="electricity"
                ref={register}
                type="number"
                defaultValue={0}
              />
            </label>
            <label className="createPostLabel2">
              <p>Nước (đồng/m3)</p>
              {errors.electricity && (
                <p className="">{errors.electricity.message}</p>
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
