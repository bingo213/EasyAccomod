import React from 'react';
import logo from '../assets/img/logo.png';

function Logo() {
  const logoStyle = {
    // width: '3rem',
    // height: '3rem',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  };
  const imgStyle = {
    width: '3rem',
    height: '3rem',
  };

  const text = {
    paddingLeft: "0.3rem",
    fontFamily:"Langar, cursive",
    color: "#e9e9e9"
  };

  return (
    <div className="Logo" style={logoStyle}>
      <img src={logo} alt="" style={imgStyle} />
      <p style={text}>Easy<br />Accomod</p>
    </div>
  );
}

export default Logo;
