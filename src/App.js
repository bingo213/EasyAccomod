import './App.css';
import NavBar from './component/header/NavBar';
import RentalUnit from './component/header/RentalUnit';
import SearchBar from './component/header/SearchBar';

function App() {
  return (
    <div className="App">
      <NavBar />
      <SearchBar />
      <RentalUnit />
    </div>
  );
}

export default App;
