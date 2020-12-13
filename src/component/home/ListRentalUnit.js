import React from 'react';
import RentalUnit from './RentalUnit';
import 'assets/css/listRentalUnit.css';
import { Link } from 'react-router-dom';

function ListRentalUnit({ currentRentals, loading }) {
  if (loading) {
    return <h1>Loading...</h1>;
  } else {
    return (
      <div className="ListRentalUnit" id="ListRentalUnit">
        <div className="container">
          {currentRentals.map(unit => (
            <RentalUnit
              key={unit.id}
              rentalUnit={unit}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default ListRentalUnit;
