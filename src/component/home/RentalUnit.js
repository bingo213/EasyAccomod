import React, { useEffect, useState } from 'react';
import 'assets/css/rentalUnit.css';
import roomImg from 'assets/img/blue-400x314.jpg';
import Like from 'component/favourite/Like';
import { Link } from 'react-router-dom';

import axios from 'axios';
import typeOfRoom from 'helper/typeRoom';
import concatAddress from 'helper/concatAddress';
import authHeader from 'helper/auth-header';
import typeOfTime from 'helper/typeTime';

function RentalUnit({ rentalUnit, isLogin }) {
  const title = rentalUnit.title;
  const id = rentalUnit._id;

  const [loadCmt, setLoadCmt] = useState(true);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const getComment = async () => {
      setLoadCmt(true);
      await axios
        .get(`http://localhost:3001/post/${id}/comments`)
        .then(res => {
          setComments(res.data.comments);
          setLoadCmt(false);
        })
        .catch(err => console.log(err));
    };

    getComment();
  }, []);

  return (
    <div className="RentalUnit">
      <Link to={`/detail/${id}`}>
        <>
          <div className="image">
            <img src={roomImg} alt="Room Image" />
            <div className="cost">
              {rentalUnit.price}
              <p className="small"> /{typeOfTime(rentalUnit.typeOfPrice)}</p>
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
              {typeOfRoom(rentalUnit.typeOfRoom)} - Diện tích:
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
            <p className="comment">{loadCmt ? 0 : comments.length} bình luận</p>
          </div>
        </>
      </Link>
      <Like postId={rentalUnit._id} isLogin={isLogin} />
    </div>
  );
}

export default RentalUnit;
