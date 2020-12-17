import {BrowserRouter as Router,  Switch, Route, Redirect} from 'react-router-dom';

import './App.css';

import LoginOrRegister from 'component/login_register/LoginOrRegister';
import Home from 'component/home/Home';
import NotFound from 'component/NotFound';
import DetailRentalUnit from 'component/detail_rental_unit/DetailRentalUnit';
import AdminPage from 'component/admin/AdminPage';
import AccountPage from 'component/account/AccountPage';

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
          <Route exact path="/admin" component={AdminPage} />
          <Route exact path="/account" component={AccountPage} />
          <Route exact path="/404" component={NotFound}/>
          <Route><Redirect to={{pathname: "/404"}}/></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
