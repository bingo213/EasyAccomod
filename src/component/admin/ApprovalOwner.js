import concatAddress from 'helper/concatAddress';
import React, { useEffect, useState } from 'react';
import 'assets/css/approvalOwner.css';
import girlImg from 'assets/img/girl.jpg';
import axios from 'axios';
import authHeader from 'helper/auth-header';

function ApprovalOwner({ loading, listItem }) {
  const [ownerArr, setOwnerArr] = useState(listItem);
  if (loading) return <h2>Loading.....</h2>;

  const handleActive = async (id, active) => {
    await axios
      .post(
        `http://localhost:3001/users/${id}/changeStatus`,
        { active: active },
        { headers: authHeader() }
      )
      .then(res => {
        if (res.data.success) {
          if (active === 1) {
            alert('Tài khoản đã được phê duyệt');
          } else {
            alert('Tài khoản đã bị từ chối');
          }

          setOwnerArr(ownerArr.filter(item => item.user._id !== id));
          window.location.reload()
        }
      });
  };

  return (
    <div className="ApprovalOwner">
      {ownerArr.map(item => (
        <div className="ApprovalRow" key={item._id}>
          <div className="img">
            <img
              src={
                item.avatar ? `http://localhost:3001/${item.avatar}` : girlImg
              }
              alt=""
            />
          </div>
          <div className="fullName field">{item.fullname}</div>
          <div className="email field">{item.email}</div>
          <div className="phoneNumber field">{item.phoneNumber}</div>
          <div className="address field">{concatAddress(item.address)}</div>
          <div className="userName field">{item.user.username}</div>
          <div className="icon field">
            <i
              className="far fa-check-circle"
              onClick={() => handleActive(item.user._id, 1)}
            ></i>
            <i
              className="fal fa-trash-alt"
              onClick={() => handleActive(item.user._id, 2)}
            ></i>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ApprovalOwner;
