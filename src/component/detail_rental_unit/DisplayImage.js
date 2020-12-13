import React from 'react';

import '../../assets/css/displayImage.css';

function DisplayImage({ images, handleClickImage }) {
  return (
    <div className="DisplayImage">
      <div className="imgContainer" onClick={handleClickImage}>
        <img src={images[0]} alt="" />
        <img src={images[1]} alt="" />
        <img src={images[2]} alt="" />
        <button>Hiển thị tất cả ảnh</button>
      </div>
    </div>
  );
}

export default DisplayImage;
