import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import './App.css';

import LoginOrRegister from 'component/login_register/LoginOrRegister';
import Home from 'component/home/Home';
import NotFound from 'component/NotFound';
import DetailRentalUnit from 'component/detail_rental_unit/DetailRentalUnit';
import AdminPage from 'component/admin/AdminPage';
import AccountPage from 'component/account/AccountPage';
import Address from 'component/createPosts/step/Address';
import GeneralDetail from 'component/createPosts/step/GeneralDetail';
import Facilities from 'component/createPosts/step/Facilities';
import UploadImage from 'component/createPosts/step/UploadImage';
import { createStore, StateMachineProvider } from 'little-state-machine';
import Submit from 'component/createPosts/step/Submit';
import ModifyPost from 'component/createPosts/ModifyPost';



function App() {
  createStore({
    data: {},
  });
  return (<StateMachineProvider>
    <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/detail/:id" component={DetailRentalUnit} />
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
          
      {/* <Router> */}
        <Route exact path="/create_post" component={Address} />
        <Route exact path="/modify_post/:id" component={ModifyPost} />
        <Route
          exact
          path="/create_post/general_detail"
          component={GeneralDetail}
        />
        <Route
          exact
          path="/create_post/facilities"
          component={Facilities}
        />
        <Route
          exact
          path="/create_post/upload_image"
          component={UploadImage}
        />
        <Route
          exact
          path="/create_post/submit"
          component={Submit}
        />
      {/* </Router> */}
    
          <Route exact path="/404" component={NotFound} />
          <Route>
            <Redirect to={{ pathname: '/404' }} />
          </Route>
        </Switch>
    </Router></StateMachineProvider>
  );
}

export default App;
