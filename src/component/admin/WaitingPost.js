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

function WaitingPost({ loading, listItem }) {
  const [postArr, setPostArr] = useState(listItem);
  if (loading) return <h2>Loading.....</h2>;

  const handleActive = async (id, active) => {
    await axios
      .post(
        `http://localhost:3001/post/${id}/changeStatus`,
        { active: active },
        { headers: authHeader() }
      )
      .then(res => {
        if (res.data.success) {
          if (active === 1) {
            alert('Bài đăng đã được phê duyệt');
          } else {
            alert('Bài đăng đã bị từ chối');
          }

          setPostArr(postArr.filter(item => item._id !== id));
        }
      });
  };

  return (
    <div className="ApprovalOwner">
      {postArr.map(item => (
        <div className="ApprovalRow" key={item._id}>
          <div className="roomImg">
            <img src={`http://localhost:3001/${item.images[0].name}`} alt="" />
          </div>
          <div className="username field">{item.owner.username}</div>
          <div className="title field">{item.title}</div>
          <div className="date field">
            {formatDate(new Date(item.createdAt))}
          </div>
          <div className="addressPost field">{`${item.address.district}, ${item.address.province}`}</div>
          <div className="typeOfRoom field">{typeOfRoom(item.typeOfRoom)}</div>
          <div className="price field">
            {item.price / 1000000} triệu/{typeOfTime(item.typeOfPrice)}
          </div>
          <div className="icon field">
            <i
              className="far fa-check-circle"
              onClick={() => handleActive(item._id, 1)}
            ></i>
            <i
              className="fal fa-trash-alt"
              onClick={() => handleActive(item._id, 2)}
            ></i>
            <Link to={`/detail/${item._id}`}>
              <i className="fal fa-info-circle"></i>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default WaitingPost;
