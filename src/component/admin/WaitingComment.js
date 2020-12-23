import concatAddress from 'helper/concatAddress';
import React, { useEffect, useState } from 'react';
import 'assets/css/approvalOwner.css';
import girlImg from 'assets/img/girl.jpg';
import axios from 'axios';
import authHeader from 'helper/auth-header';
import { Link } from 'react-router-dom';
import formatDate from 'helper/formatDate';
import typeOfRoom from 'helper/typeRoom';
import typeOfTime from 'helper/typeTime';

function WaitingComment({ loading, listItem }) {
  const [commentArr, setCommentArr] = useState(listItem);
  if (loading) return <h2>Loading.....</h2>;

  const handleActive = async (id, active) => {
    await axios
      .post(
        `http://localhost:3001/comments/${id}/changeStatus`,
        { active: active },
        { headers: authHeader() }
      )
      .then(res => {
        if (res.data.success) {
          if (active === 1) {
            alert('Bình luận đã được phê duyệt');
          } else {
            alert('Bình luận đã bị từ chối');
          }

          setCommentArr(commentArr.filter(item => item._id !== id));
        }
      });
  };

  return (
    <div className="ApprovalOwner">
      {commentArr.map(item => (
        <div className="ApprovalRow" key={item._id}>
          <div className="username field">{item.author.username}</div>
          <div className="comment field">{item.comment}</div>
          <div className="date field">
            {formatDate(new Date(item.createdAt))}
          </div>
          <div className="rating field">{item.rating}</div>
          <Link to={`/detail/${item.post._id}`}>
              <div className="postId field" style={{textDecoration: 'underline', color:'blue'}}>
                {item._id}
              </div>
          </Link>
          <div className="icon field">
            <i
              className="far fa-check-circle"
              onClick={() => handleActive(item._id, 1)}
            ></i>
            <i
              className="fal fa-trash-alt"
              onClick={() => handleActive(item._id, 2)}
            ></i>
          </div>
        </div>
      ))}
    </div>
  );
}

export default WaitingComment;