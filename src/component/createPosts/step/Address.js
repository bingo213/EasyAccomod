import { useStateMachine } from 'little-state-machine';
import React from 'react';
import { useForm } from 'react-hook-form';
import { withRouter } from 'react-router-dom';
import updateAction from './updateAction';
import 'assets/css/createPost.css';
import AutoAddress from 'component/address/AutoAddress';

function Address(props) {
  const { register, handleSubmit, errors } = useForm();
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
    { required: 'Bạn chưa nhập số nhà' },
  ];

  const { action, state } = useStateMachine(updateAction);
  const onSubmit = data => {
    action(data);
    props.history.push('/create_post/general_detail');
  };
  return (
    <div className="createPostContainer">
      <form className="createPostForm" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="createPostTitle">Nhập địa chỉ phòng trọ</h2>
        <AutoAddress
          register={register}
          errors={errors}
          validation={validation}
          extend={true}
        />
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
