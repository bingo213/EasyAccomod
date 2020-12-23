import RentalUnit from 'component/home/RentalUnit';
import React from 'react';

function ListLike({ list }) {
  return (
    <div className="ListLike">
      {list.map(item => (
        <RentalUnit rentalUnit={item} isLogin={true}/>
      ))}
    </div>
  );
}

export default ListLike;
