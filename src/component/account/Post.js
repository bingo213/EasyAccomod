import React from 'react';
import 'assets/css/post.css';
// import img from 'C:/Users/Admin/Desktop/web/New folder (2)/backend/EasyAccomod/Server';

function Post({image, title, price, address, createDate}) {
  return (
    <div className="Post">
      <img src={`http://localhost:3001/${image}`} alt="" />
      <div className="rentalContent">
        <div className="title">{title}</div>
        <div className='description'>
            <div className="price">{price/1000000} triệu/tháng</div>
            <div className="address">{address}</div>
            <div className="dateCreate">Ngày tạo: {createDate}</div>
        </div>
      </div>
    </div>
  );
}
// 'C:/Users/Admin/Desktop/web/New folder (2)/backend/EasyAccomod/Server/' + image.replace('\\','/'))

export default Post;
