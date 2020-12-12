import React, { useState } from 'react';

import '../assets/css/pagination.css';

function Pagination({ rentalUnitPerPage, totalRentalUnit, paginate }) {
  const pageNumber = [];

  for (let i = 1; i <= Math.ceil(totalRentalUnit / rentalUnitPerPage); i++) {
    pageNumber.push(i);
  }

  return (
    <div className="Pagination">
      <ul className="pageNumberContainer">
        {pageNumber.map(number => (
          <li key={number}>
            <a
              onClick={() => {paginate(number)}}
              href="#ListRentalUnit"
              className="pageLink"
            >
              {number}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Pagination;
