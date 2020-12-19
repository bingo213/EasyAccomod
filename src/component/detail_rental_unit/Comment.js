import Star from 'component/favourite/Star';
import React, { useEffect, useState } from 'react';
import girlImg from 'assets/img/girl.jpg';
import 'assets/css/commentAlreadyExist.css';
import { useForm } from 'react-hook-form';
import StarRating from 'component/favourite/StarRating';

function Comment({ rating }) {
  const { register, handleSubmit, setValue, errors } = useForm();

  const onSubmit = (data) => {
      console.log(data);
  }
  
  useEffect(() => {
      register({name: "rating"})
  }, [])

  return (
    <div className="Comment">
      <div className="CommentAlreadyExist">
        <img src={girlImg} alt="" />
        <div className="right">
          <div className="username">Bingo</div>
          <div className="cmt">
            {errors.comment && (
              <p style={{ color: 'red' }}>{errors.comment.message}</p>
            )}
            <form onSubmit={handleSubmit(onSubmit)}>
              <textarea
                name="comment"
                placeholder="Viết bình luận"
                ref={register({ required: 'Vui lòng thêm bình luận' })}
              ></textarea>
              <StarRating name="rating" onClick={e => setValue("rating", e.target.hooks.State)}/>
              <button type="submit">Bình luận</button>
            </form>
          </div>
        </div>
      </div>
      <Star starId={5} marked={true} />
    </div>
  );
}

export default Comment;
