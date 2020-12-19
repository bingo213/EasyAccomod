import React from 'react';
import girlImg from 'assets/img/girl.jpg';
import 'assets/css/commentAlreadyExist.css';
import Star from 'component/favourite/Star';

function CommentAlreadyExist({ rating }) {
  const stars = Array.from({ length: 5 }, (i, index) =>
    index + 1 <= rating ? (
      <Star key={index} starId={index + 1} marked={true} />
    ) : (
      <Star key={index} starId={index + 1} marked={false} />
    )
  );

  return (
    <div className="CommentAlreadyExist">
      <img src={girlImg} alt="" />
      <div className="right">
        <div className="user-rating">
          <div className="username">Bingo</div>
          <div>{stars}</div>
        </div>
        <div className="cmt">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Libero ipsum
          quaerat eos. Suscipit ducimus, facilis quam delectus nihil
          consequuntur molestias, repudiandae perferendis maxime et neque
          architecto culpa earum, eligendi nobis! Lorem ipsum dolor sit amet
          consectetur, adipisicing
        </div>
      </div>
    </div>
  );
}

export default CommentAlreadyExist;
