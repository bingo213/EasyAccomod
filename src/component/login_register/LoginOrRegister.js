import React from 'react';
import { useForm } from 'react-hook-form';
import '../../assets/css/login.css';
import formImage from '../../assets/img/formImage.jpg';
import OwnerRegister from './OwnerRegister';
import RenterRegister from './RenterRegister';
import Login from './Login';
import Logo from '../Logo';

function LoginOrRegister() {
  const { register, handleSubmit } = useForm();

  return (
    <div className="LoginOrRegister">
      <div className="logoTop"><Logo /></div>
      <div className="decorator">
        <div className="image">
          <img src={formImage} alt="" />
          <div className="logo"><Logo /></div>
        </div>
      </div>
      {/* <OwnerRegister /> */}
      {/* <RenterRegister /> */}
      <Login />
    </div>
  );
}

export default LoginOrRegister;
