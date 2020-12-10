import React, { useEffect, useState } from 'react';
import '../../assets/css/rentalUnit.css';
import roomImg from '../../assets/img/blue-400x314.jpg';

function RentalUnit() {
  const [heartState, setHeartState] = useState(false);

  return (
    <div className="RentalUnit">
      <div className="image">
        <img src={roomImg} alt="Room Image" />
        <div className="cost">2.5 triệu<p className="small"> /tháng</p></div>
      </div>
      <div className="description">
        <div className="title">Modern Villa with Pool</div>
        <div className="area"><i class="far fa-home"></i>Area: 20m²</div>
        <div className="address"><i class="fas fa-map-marker-alt"></i>Cau Giay District, Ha Noi</div>
        <div className="additionInfo">
          Phòng đẹp , tủ bếp mới , mọi người có nhu cầu gọi mình nhé , phòng có
          hạn ạ !
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
