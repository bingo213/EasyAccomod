import { useStateMachine } from 'little-state-machine';
import React from 'react';
import { useForm } from 'react-hook-form';
import { withRouter } from 'react-router-dom';
import updateAction from './updateAction';
import 'assets/css/createPost.css';

function Address(props) {
  const { register, handleSubmit } = useForm();
  const { action, state } = useStateMachine(updateAction);
  const onSubmit = data => {
    action(data);
    props.history.push('/create_post/general_detail');
  };
  return (
    <div className="createPostContainer">
      <form className="createPostForm" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="createPostTitle">Nhập địa chỉ phòng trọ</h2>
        <label className="createPostLabel">
          <p>Tỉnh/Thành phố</p>
          <input name="city" ref={register} />
        </label>
        <label className="createPostLabel">
          <p>Quận/Huyện</p>
          <input name="district" ref={register} />
        </label>
        <label className="createPostLabel">
          <p>Xã/Phường</p>
          <input name="village" ref={register} />
        </label>
        <label className="createPostLabel">
          <p>Đường</p>
          <input name="street" ref={register} />
        </label>
        <label className="createPostLabel">
          <p>Số nhà</p>
          <input name="houseNumber" ref={register} />
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

export default withRouter(Address);
