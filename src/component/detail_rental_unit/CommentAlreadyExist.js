import React from 'react';
import girlImg from 'assets/img/girl.jpg';
import 'assets/css/commentAlreadyExist.css';

function CommentAlreadyExist() {
  return (
    <div className="CommentAlreadyExist">
        <img src={girlImg} alt="" />
        <div className="right">
          <div className="username">Bingo</div>
          <div className="cmt">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Libero
            ipsum quaerat eos. Suscipit ducimus, facilis quam delectus nihil
            consequuntur molestias, repudiandae perferendis maxime et neque
            architecto culpa earum, eligendi nobis!
          </div>
        </div>
    </div>
  );
}

export default CommentAlreadyExist;
