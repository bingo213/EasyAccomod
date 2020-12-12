import React from 'react';
import RentalUnit from './RentalUnit';
import '../../assets/css/listRentalUnit.css';

function ListRentalUnit({ currentRentals, loading }) {
  if (loading) {
    return <h1>Loading...</h1>;
  } else {
    return (
      <div className="ListRentalUnit" id="ListRentalUnit">
        <div className="container">
          {
            currentRentals.map(rentalUnit => (
              <RentalUnit key={rentalUnit.id} title={rentalUnit.title} description={rentalUnit.body}/>
            ))
          }
        </div>
      </div>
    );
  }
}

export default ListRentalUnit;
