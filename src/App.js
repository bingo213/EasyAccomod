import './App.css';
import ListRentalUnit from './component/main/ListRentalUnit';
import NavBar from './component/header/NavBar';
import SearchBar from './component/header/SearchBar';
import Footer from './component/footer/Footer';

function App() {
  return (
    <div className="App">
      <NavBar />
      <SearchBar />
      <ListRentalUnit />
      <Footer />
    </div>
  );
}

export default App;
