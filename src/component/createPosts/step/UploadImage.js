import { useStateMachine } from 'little-state-machine';
import React from 'react';
import { useForm } from 'react-hook-form';
import { withRouter } from 'react-router-dom';
import updateAction from './updateAction';
import * as yup from 'yup';

function UploadImage(props) {
  const schema = yup.object().shape({
    image: yup
      .array()
      .required('Bạn cần tải ảnh lên')
      .min(3, ({ min }) => 'Bạn cẩn chọn ít nhất 3 ảnh'),
  });
  const { register, handleSubmit, errors } = useForm();
  const { action, state } = useStateMachine(updateAction);
  const onSubmit = data => {
    action(data);
    props.history.push('/create_post/submit');
  };

  return (
    <div className="createPostContainer">
      <form className="createPostForm" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="createPostTitle">Tải ảnh lên</h2>
        <label className="createPostLabel">
          <p>Ảnh phòng trọ</p>
          {errors.image && (
            <p className="createPostErrorMessage">{errors.image.message}</p>
          )}
          <input
            name="image"
            type="file"
            ref={register({
              required: 'alo',
            })}
            multiple
          />
        </label>
        <label className="createPostLabel">
          Hiển thị bài đăng trong:
          <input name="money" ref={register} />
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

export default withRouter(UploadImage);
