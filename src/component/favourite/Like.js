import React, { useEffect, useState } from 'react';
import 'assets/css/like.css';
import axios from 'axios';
import authHeader from 'helper/auth-header';

function Like({ postId, isLogin }) {
  console.log(isLogin);
  const [heartState, setHeartState] = useState(false);
  useEffect(() => {
    const checkLike = async () => {
      await axios
        .get(`http://localhost:3001/favorites/checkFavorite/${postId}`, {
          headers: authHeader(),
        })
        .then(res => {
          setHeartState(res.data.like);
          console.log('res..', res);
        })
        .catch(err => console.log(err));
    };
    if (isLogin) checkLike();
  }, []);

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
        console.log(res);
      })
      .catch(err => console.log(err));
  };

  const handleClick = () => {
    postLikeState();
  };

  return (
    <div className="Like">
      <i
        className={heartState ? 'fas fa-heart' : 'far fa-heart'}
        onClick={handleClick}
      ></i>
    </div>
  );
}

export default Like;
