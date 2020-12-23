import React, { useEffect, useState } from 'react';
import girlImg from 'assets/img/girl.jpg';
import 'assets/css/commentAlreadyExist.css';
import Star from 'component/favourite/Star';
import axios from 'axios';

function CommentAlreadyExist({ cmt, loading }) {
  const [loadAvt, setLoadAvt] = useState(true);
  const [avatar, setAvatar] = useState(false);
  const [path, setPath] = useState('')
  useEffect(() => {
    const getAvatar = async () => {
      setLoadAvt(true);
      await axios
        .get(`http://localhost:3001/users/${cmt.author._id}/getAvatar`)
        .then(res => {
          if (res.data.avatar) {
            setAvatar(true);
            setPath(res.data.avatar)
          }
          setLoadAvt(false);
          console.log(res.data);
        });
    };

    getAvatar();
  }, []);

  if (loading) return <h2>Loading .....</h2>;

  //

  const stars = Array.from({ length: 5 }, (i, index) =>
    index + 1 <= cmt.rating ? (
      <Star key={index} starId={index + 1} marked={true} />
    ) : (
      <Star key={index} starId={index + 1} marked={false} />
    )
  );

  return (
    <div className="CommentAlreadyExist">
      <img src={!loadAvt && avatar ? `http://localhost:3001/${path}` : girlImg} alt="" />
      <div className="right">
        <div className="user-rating">
          <div className="username">{cmt.author.username}</div>
          <div>{stars}</div>
        </div>
        <div className="cmt">{cmt.comment}</div>
      </div>
    </div>
  );
}

export default CommentAlreadyExist;
