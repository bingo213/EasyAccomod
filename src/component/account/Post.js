import React from 'react';
import 'assets/css/post.css';
import img from 'assets/img/4.jpg';

function Post() {
  return (
    <div className="Post">
      <img src={img} alt="" />
      <div className="rentalContent">
        <div className="title">Rental ABC Test</div>
        <div className='description'>
            <div className="price">2.5 triệu/tháng</div>
            <div className="address">Xuân Thủy, Cầu Giấy</div>
            <div className="dateCreate">Ngày tạo: 17/12/2020</div>
        </div>
      </div>
    </div>
  );
}

export default Post;
