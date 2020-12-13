import React, { useEffect, useState } from 'react';
import 'assets/css/rentalUnit.css';
import roomImg from 'assets/img/blue-400x314.jpg';

function RentalUnit(props) {
  const [heartState, setHeartState] = useState(false);
  const title = props.title;
  const description = props.description;
  return (
    <div className="RentalUnit">
      <div className="image">
        <img src={roomImg} alt="Room Image" />
        <div className="cost">
          2.5 triệu<p className="small"> /tháng</p>
        </div>
      </div>
      <div className="description">
        <div className="title">{title}</div>
        <div className="area">
          <i className="far fa-home"></i>Area: 20m²
        </div>
        <div className="address">
          <i className="fas fa-map-marker-alt"></i>Cau Giay District, Ha Noi
          abceffffffffffffffffabc hdufa abc vbca sfajf jfashifj ajf jfja jfahfl
          fa last jfaudf
        </div>
        <div className="additionInfo">
          <i className="far fa-file-invoice"></i>
          {description}
        </div>
        <div className="icon">
          <p className="comment">12 bình luận</p>
          <i
            className={heartState ? 'fas fa-heart' : 'far fa-heart'}
            onClick={() => setHeartState(!heartState)}
          ></i>
        </div>
      </div>
    </div>
  );
}

export default RentalUnit;
