import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'assets/css/home.css';

import NavBar from 'component/NavBar';
import SearchBar from './SearchBar';
import ListRentalUnit from './ListRentalUnit';
import Pagination from 'component/Pagination';
import Footer from 'component/Footer';

function Home() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [isLogin, setIsLogin] = useState(() => {
    if (localStorage.getItem('user')) return true;
    else return false;
  });

  // const [avatar, setAvatar] = useState('');
  // useEffect(() => {
  //   if (isLogin) {
  //     setAvatar(user.avatar);
  //   }
  // }, []);

  const [rentalUnit, setRentalUnit] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rentalUnitPerPage] = useState(18);

  useEffect(() => {
    const fetchRentalUnitData = async () => {
      setLoading(true);
      const res = await axios.get('http://localhost:3001/post/getAllActive');
      setRentalUnit(res.data);
      setLoading(false);
    };
    fetchRentalUnitData();
  }, []);

  const indexOfLastRental = currentPage * rentalUnitPerPage;
  const indexOfFirstRental = indexOfLastRental - rentalUnitPerPage;
  const currentRentals = rentalUnit.slice(
    indexOfFirstRental,
    indexOfLastRental
  );

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const rentalUnitSearch = searchList => {
    setRentalUnit(searchList);
  };
  return (
    <div className="Home" style={{ overflowX: 'hidden' }}>
      <NavBar />
      <div className="homeImage"></div>

      <SearchBar rentalUnitSearch={rentalUnitSearch} />
      <ListRentalUnit
        currentRentals={currentRentals}
        loading={loading}
        isLogin={isLogin}
      />
      <Pagination
        rentalUnitPerPage={rentalUnitPerPage}
        totalRentalUnit={rentalUnit.length}
        paginate={paginate}
      />
      <div id="footer"><Footer /></div>
    </div>
  );
}

export default Home;
