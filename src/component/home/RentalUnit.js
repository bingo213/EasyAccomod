import React, { useEffect, useState } from 'react';
import 'assets/css/rentalUnit.css';
import roomImg from 'assets/img/blue-400x314.jpg';
import Like from 'component/favourite/Like';
import { Link } from 'react-router-dom';

function RentalUnit({rentalUnit}) {
  // const [heartState, setHeartState] = useState(false);
  const heart = false;
  const title = rentalUnit.title;
  const description = rentalUnit.body;
  const id = rentalUnit.id;
  return (
    <div className="RentalUnit">
      <Link to={`/detail/${id}`}>
        <>
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
              abceffffffffffffffffabc hdufa abc vbca sfajf jfashifj ajf jfja
              jfahfl fa last jfaudf
            </div>
            <div className="additionInfo">
              <i className="far fa-file-invoice"></i>
              {description}
            </div>
            <p className="comment">12 bình luận</p>
          </div>
        </>
      </Link>
      <div className="heart">
        <Like isLike={heart} />
      </div>
    </div>
  );
}

export default RentalUnit;
