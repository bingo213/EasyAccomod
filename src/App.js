import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import './App.css';
import React, { useState, useEffect } from 'react';
import LoginOrRegister from 'component/login_register/LoginOrRegister';
import Home from 'component/home/Home';
import NotFound from 'component/NotFound';
import DetailRentalUnit from 'component/detail_rental_unit/DetailRentalUnit';
import AdminPage from 'component/admin/AdminPage';
import PostPage from 'component/account/PostPage';
import ModifyPost from 'component/createPosts/ModifyPost';
import TestUploadImage from 'component/TestUploadImage';
import ProfilePage from 'component/account/ProfilePage';
import NavBar from 'component/NavBar';
import Footer from 'component/Footer';

function App() {
  // const user = JSON.parse(localStorage.getItem('user'));
  // const [isLogin, setIsLogin] = useState(() => {
  //   if (localStorage.getItem('user')) return true;
  //   else return false;
  // });
  // const [username, setUsername] = useState('name');
  // useEffect(() => {
  //   if (isLogin) {
  //     setUsername(user.username);
  //   }
  // }, []);

  // const [role, setRole] = useState('');
  // useEffect(() => {
  //   if (isLogin) {
  //     setRole(user.role);
  //   }
  // }, []);

  // const [avatar, setAvatar] = useState('');
  // useEffect(() => {
  //   if (isLogin) {
  //     setAvatar(user.avatar);
  //   }
  // }, []);

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

        <Route exact path="/create_post" component={ModifyPost} />
        <Route exact path="/modify_post/:id" component={ModifyPost} />

        <Route exact path="/profile">
          <ProfilePage defaultType="account" />
        </Route>
        <Route exact path="/favorite_list">
          <ProfilePage defaultType="listLike" />
        </Route>

        <Route exact path="/404" component={NotFound} />
        <Route>
          <Redirect to={{ pathname: '/404' }} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
