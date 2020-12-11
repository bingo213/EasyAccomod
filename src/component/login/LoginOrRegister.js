import React from 'react';
import { useForm } from 'react-hook-form';
import '../../assets/css/login.css';
import formImage from '../../assets/img/formImage.jpg';
import OwnerRegister from './OwnerRegister';

function LoginOrRegister() {
  const { register, handleSubmit } = useForm();

  return (
    <div className="LoginOrRegister">
      <div className="decorator">
        <div className="image">
          <img src={formImage} alt="" />
          <div className="logo">LOGO</div>
        </div>
      </div>
      <OwnerRegister />
    </div>
  );
}

export default LoginOrRegister;
