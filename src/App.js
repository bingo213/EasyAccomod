import './App.css';
import ListRentalUnit from './component/header/ListRentalUnit';
import NavBar from './component/header/NavBar';
import SearchBar from './component/header/SearchBar';

function App() {
  return (
    <div className="App">
      <NavBar />
      <SearchBar />
      <ListRentalUnit />
    </div>
  );
}

export default App;
