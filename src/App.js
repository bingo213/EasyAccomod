import './App.css';
import axios from 'axios';
import ListRentalUnit from './component/main/ListRentalUnit';
import NavBar from './component/header/NavBar';
import SearchBar from './component/header/SearchBar';
import Footer from './component/Footer';
import { useEffect, useState } from 'react';
import Pagination from './component/Pagination';
import LoginOrRegister from './component/login/LoginOrRegister';

function App() {
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
    <div className="App">
      {/* <NavBar />
      <SearchBar />
      <ListRentalUnit currentRentals={currentRentals} loading={loading}/>
      <Pagination 
      rentalUnitPerPage={rentalUnitPerPage}
      totalRentalUnit = {rentalUnit.length}
      paginate={paginate}/>
      <Footer /> */}
      <LoginOrRegister />
    </div>
  );
}

export default App;
