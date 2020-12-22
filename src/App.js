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
import PostPage from 'component/account/PostPage';
import ModifyPost from 'component/createPosts/ModifyPost';
import TestUploadImage from 'component/TestUploadImage';
import ProfilePage from 'component/account/ProfilePage';

function App() {

  return (
    <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/detail/:id" component={DetailRentalUnit} />
          <Route path="/upload" component={TestUploadImage} />
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
          <Route exact path="/posts_page" component={PostPage} />
          <Route exact path="/profile" component={ProfilePage} />
          
      {/* <Router> */}
        <Route exact path="/create_post" component={ModifyPost} />
        <Route exact path="/modify_post/:id" component={ModifyPost} />
        
      {/* </Router> */}
    
          <Route exact path="/404" component={NotFound} />
          <Route>
            <Redirect to={{ pathname: '/404' }} />
          </Route>
        </Switch>
    </Router>
  );
}

export default App;
