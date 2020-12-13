import React, {useState, useEffect} from 'react';
import axios from 'axios';
import 'assets/css/home.css';

import NavBar from 'component/NavBar';
import SearchBar from './SearchBar';
import ListRentalUnit from './ListRentalUnit';
import Pagination from 'component/Pagination';
import Footer from 'component/Footer';

function Home() {
    const [rentalUnit, setRentalUnit] = useState([])
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [rentalUnitPerPage] = useState(18)
  
    useEffect(() => {
      const fetchRentalUnitData = async () => {
        setLoading(true);
        const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
        setRentalUnit(res.data);
        setLoading(false);
      };
      fetchRentalUnitData();
    }, []);
  
    const indexOfLastRental = currentPage * rentalUnitPerPage;
    const indexOfFirstRental = indexOfLastRental - rentalUnitPerPage;
    const currentRentals = rentalUnit.slice(indexOfFirstRental, indexOfLastRental);
  
    const paginate = (pageNumber) => setCurrentPage(pageNumber)
  return (
    <div className="Home">
      <NavBar />
      <div className="homeImage"></div>
      <SearchBar />
      <ListRentalUnit currentRentals={currentRentals} loading={loading}/>
      <Pagination 
      rentalUnitPerPage={rentalUnitPerPage}
      totalRentalUnit = {rentalUnit.length}
      paginate={paginate}/>
      <Footer />
    </div>
  );
}

export default Home;
