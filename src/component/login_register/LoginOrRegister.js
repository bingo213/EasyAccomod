import React from 'react';
import { Link } from 'react-router-dom';

import 'assets/css/login.css';
import formImage from 'assets/img/formImage.jpg';

import OwnerRegister from './OwnerRegister';
import RenterRegister from './RenterRegister';
import Login from './Login';
import Logo from 'component/Logo';

function LoginOrRegister({ type }) {
  return (
    <div className="LoginOrRegister">
      <div className="logoTop">
        <Logo />
      </div>
      <div className="decorator">
        <div className="image">
          <img src={formImage} alt="" />
          <div className="logo">
            <Logo />
          </div>
        </div>
      </div>
      {type === 'login' && <Login />}
      {type === 'register' && (
        <div className="chooseTypeAccount">
          <h3>Chọn loại tài khoản:</h3>
          <Link to="/owner_register"><i class="fas fa-home-lg-alt"></i>Tài khoản chủ trọ</Link>
          <br />
          <Link to="/renter_register"><i className="fas fa-user-alt"></i>Tài khoản thuê trọ</Link>
        </div>
      )}
      {type === 'owner_register' && <OwnerRegister />}
      {type === 'renter_register' && <RenterRegister />}
      {/* <OwnerRegister /> */}
      {/* <RenterRegister /> */}
    </div>
  );
}

export default LoginOrRegister;
