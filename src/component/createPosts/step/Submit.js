import { useStateMachine } from 'little-state-machine';
import React from 'react';
import updateAction from './updateAction';
import 'assets/css/createPost.css';

function Submit(props) {
  // const { state } = useStateMachine(updateAction);

  return (
    <div className="createPostContainer">
      <div className="notice">
        <div className="createPostContainerButton">
          <button
            className="createPostButtonCancel"
            onClick={() => {
              props.history.push('/');
            }}
          >
            Trở lại trang chủ
          </button>
          <button
            className="createPostButton"
            onClick={() => {
              props.history.push('/create_post');
            }}
          >
            Tạo bài viết mới
          </button>
        </div>
      </div>
    </div>
  );
}

export default Submit;
