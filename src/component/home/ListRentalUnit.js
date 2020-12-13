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
          {currentRentals.map(rentalUnit => (
            <Link to={`/detail/${rentalUnit.id}`} key={rentalUnit.id}>
              <RentalUnit
                title={rentalUnit.title}
                description={rentalUnit.body}
              />
            </Link>
          ))}
        </div>
      </div>
    );
  }
}

export default ListRentalUnit;
