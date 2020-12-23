import React from 'react';
import 'assets/css/post.css';
import formatDate from 'helper/formatDate';

function Post({image, title, price, address, createDate}) {
  return (
    <div className="Post">
      <img src={`http://localhost:3001/${image}`} alt="" />
      <div className="rentalContent">
        <div className="title">{title}</div>
        <div className='description'>
            <div className="price">{price/1000000} triệu/tháng</div>
            <div className="address">{address}</div>
            <div className="dateCreate">Ngày tạo: {formatDate(new Date(createDate))}</div>
        </div>
      </div>
    </div>
  );
}

export default Post;
