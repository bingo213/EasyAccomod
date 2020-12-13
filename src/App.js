import {BrowserRouter as Router,  Switch, Route} from 'react-router-dom';

import './App.css';

import LoginOrRegister from './component/login_register/LoginOrRegister';
import Home from './component/home/Home';
import NotFound from './component/NotFound';
import DetailRentalUnit from './component/detail_rental_unit/DetailRentalUnit';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/detail" component={DetailRentalUnit} />
          <Route exact path="/login">
            <LoginOrRegister type="login" />
          </Route>
          <Route exact path="/register">
            <LoginOrRegister type="register" />
          </Route>
          <Route exact path="/owner_register">
            <LoginOrRegister type="owner_register" />
          </Route>
          <Route exact path="/renter_register">
            <LoginOrRegister type="renter_register" />
          </Route>
          <Route component={NotFound}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
