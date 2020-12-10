import React from 'react';
import RentalUnit from './RentalUnit';
import '../../assets/css/listRentalUnit.css';

function ListRentalUnit() {
  return (
    <div className="ListRentalUnit">
      <div className="container">
        <RentalUnit />
        <RentalUnit />
        <RentalUnit />
        <RentalUnit />
      </div>
    </div>
  );
}

export default ListRentalUnit;
