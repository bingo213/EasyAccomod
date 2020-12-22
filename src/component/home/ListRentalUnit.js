import React from 'react';
import RentalUnit from './RentalUnit';
import 'assets/css/listRentalUnit.css';
import { Link } from 'react-router-dom';

function ListRentalUnit({ currentRentals, loading, isLogin }) {
  if (loading) {
    return <h1>Loading...</h1>;
  } else {
    return (
      <div className="ListRentalUnit" id="ListRentalUnit">
        <div className="container">
          {currentRentals.map(unit => (
            <RentalUnit
              key={unit._id}
              rentalUnit={unit}
              isLogin={isLogin}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default ListRentalUnit;
