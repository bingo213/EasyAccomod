import React, { useEffect, useState } from 'react';
import 'assets/css/like.css';
import axios from 'axios';
import authHeader from 'helper/auth-header';
import { useHistory } from 'react-router-dom';

function Like({ postId, isLogin }) {
  const [loadNumberOfLike, setLoadNumberOfLike] = useState(true);
  const [numberOfLike, setNumberOfLike] = useState(0);
  useEffect(() => {
    const getRentalUnit = async () => {
      setLoadNumberOfLike(true);
      await axios
        .get(`http://localhost:3001/post/${postId}`)
        .then(res => {
          setNumberOfLike(res.data.number);
          setLoadNumberOfLike(false);
        })
        .catch(err => console.log(err));
    };
    getRentalUnit();
  }, []);

  const [heartState, setHeartState] = useState(false);

  useEffect(() => {
    const checkLike = async () => {
      await axios
        .get(`http://localhost:3001/favorites/checkFavorite/${postId}`, {
          headers: authHeader(),
        })
        .then(res => {
          setHeartState(res.data.like);
        })
        .catch(err => console.log(err));
    };
    if (isLogin) checkLike();
  }, []);

  const history = useHistory();

  const postLikeState = async () => {
    await axios
      .post(
        `http://localhost:3001/favorites`,
        {
          post: postId,
        },
        { headers: authHeader() }
      )
      .then(res => {
        setHeartState(res.data.like);
      })
      .catch(err => console.log(err));
  };

  const handleClick = () => {
    if (isLogin) {
      postLikeState();
      if(heartState){
        setNumberOfLike(numberOfLike - 1)
      }
      else{
        setNumberOfLike(numberOfLike + 1)
      }
    } else {
      alert('Bạn cần đăng nhập để sử dụng tính năng này')
      // history.push('/login');
    }
  };

  return (
    <div className="heart">
      <p>{loadNumberOfLike ? 0 : numberOfLike}</p>
      <div className="Like">
        <i
          className={heartState ? 'fas fa-heart' : 'far fa-heart'}
          onClick={handleClick}
        ></i>
      </div>
    </div>
  );
}

export default Like;
