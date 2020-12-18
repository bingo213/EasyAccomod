import { useStateMachine } from 'little-state-machine';
import React from 'react';
import { useForm } from 'react-hook-form';
import { withRouter } from 'react-router-dom';
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
          <input name="typeRoom" ref={register} />
        </label>
        <label className="createPostLabel">
          <p>Số lượng phòng</p>
          <input name="numRoom" ref={register} />
        </label>
        <label className="createPostLabel">
          <p>Giá</p>
          <input name="cost" ref={register} />
        </label>
        <label className="createPostLabel">
          <p>Diện tích</p>
          <input name="area" ref={register} />
        </label>
        <label className="createPostLabel">
          <p>Chung chủ</p>
          <input name="host" ref={register} />
        </label>
        <div className="createPostContainerButton"><button className="createPostButton" type="submit">Tiếp theo</button></div>
      </form>
    </div>
  );
}

export default withRouter(GeneralDetail);
