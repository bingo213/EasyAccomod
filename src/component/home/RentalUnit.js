import React, { useEffect, useState } from 'react';
import 'assets/css/rentalUnit.css';
import roomImg from 'assets/img/blue-400x314.jpg';
import Like from 'component/favourite/Like';
import { Link } from 'react-router-dom';
import concatAddress from 'helper/concatAddress';
import axios from 'axios';
import authHeader from 'helper/auth-header';

function RentalUnit({ rentalUnit, isLogin }) {
  const title = rentalUnit.title;
  const id = rentalUnit._id;

  return (
    <div className="RentalUnit">
      <Link to={`/detail/${id}`}>
        <>
          <div className="image">
            <img src={roomImg} alt="Room Image" />
            <div className="cost">
              {rentalUnit.price}
              <p className="small"> /{rentalUnit.typeOfPrice}</p>
            </div>
          </div>
          <div className="description">
            <div className="title">{title}</div>
            <div className="address">
              <i className="fas fa-map-marker-alt"></i>
              {concatAddress(rentalUnit.address)}
            </div>{' '}
            <div className="area">
              <i className="far fa-home"></i>
              {rentalUnit.typeOfRoom} - Diện tích:
              {rentalUnit.area}m<sup>2</sup>
            </div>
            <div className="additionInfo">
              <div className="area">
                <i className="fal fa-charging-station"></i>
                <span>Điện:</span> {rentalUnit.priceOfElect}/kWh
              </div>
              <div className="area">
                <i className="fal fa-hand-holding-water"></i>
                <span>Nước:</span> {rentalUnit.priceOfWater}/m<sup>3</sup>
              </div>
            </div>
            <p className="comment">12 bình luận</p>
          </div>
        </>
      </Link>
      <div className="heart">
        <p>125</p>
        <Like postId={rentalUnit._id} isLogin={isLogin}/>
      </div>
    </div>
  );
}

export default RentalUnit;
