import Star from 'component/favourite/Star';
import React, { useEffect, useState } from 'react';
import girlImg from 'assets/img/girl.jpg';
import 'assets/css/commentAlreadyExist.css';
import 'assets/css/comment.css';
import { useForm } from 'react-hook-form';
import StarRating from 'component/favourite/StarRating';
import axios from 'axios';
import authHeader from 'helper/auth-header';

function Comment({ postId }) {
  const { register, handleSubmit, setValue, errors } = useForm();

  const user = JSON.parse(localStorage.getItem('user'));
  const [isLogin, setIsLogin] = useState(() => {
    if (localStorage.getItem('user')) return true;
    else return false;
  });
  const [username, setUsername] = useState('name');
  useEffect(() => {
    if (isLogin) {
      setUsername(user.username);
    }
  }, []);

  const [avatar, setAvatar] = useState('');
  useEffect(() => {
    if (isLogin) {
      setAvatar(user.avatar);
    }
  }, []);

  const onSubmit = data => {
    const submitComment = async () => {
      await axios
        .post(
          'http://localhost:3001/comments',
          { ...data, post: postId },
          { headers: authHeader() }
        )
        .then(res => {
          alert('Bình luận cần được phê duyệt trước khi hiển thị');
          window.location.reload();
        })
        .catch(err => console.log(err));
    };

    submitComment();
  };

  useEffect(() => {
    register({ name: 'rating' });
  }, []);

  return (
    <div className="Comment">
      <div className="CommentAlreadyExist">
        <img
          src={avatar ? `http://localhost:3001/${avatar}` : girlImg}
          alt=""
        />
        <div className="right">
          <div className="username">{username}</div>
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
              {/* <StarRating name="rating"  onClick={e => setValue("rating", e.target.starId)}/>
              <Rating name="half-rating" defaultValue={2.5} precision={0.5} /> */}
              <div className="choose">
                <span>Đánh giá (/5)</span>
                <select name="rating" ref={register}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
                <button type="submit">Bình luận</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Comment;
