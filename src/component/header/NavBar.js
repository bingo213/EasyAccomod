import React, { useState, useEffect } from 'react';
import '../../assets/css/navBar.css';
import Account from '../login_register/Account';
import Logo from '../Logo';

function NavBar() {
  const [logIn, setLogIn] = useState(false);
  const [nav, setNav] = useState(() => {
    if (window.innerWidth < 900) {
      return 'small-nav';
    } else {
      return 'large-nav';
    }
  });

  const [scroll, setScroll] = useState(()=>{
    if(window.pageYOffset >= 200){
      return 'scrolled';
    }
    else{
      return '';
    }
  });

  useEffect(() => {
    window.addEventListener('resize', () => {
      if (window.innerWidth < 900) {
        setNav('small-nav');
      } else {
        setNav('large-nav');
      }
    });
  }, []);

  const handleScroll = () => {
    if(window.pageYOffset >= 200){
      setScroll('scrolled');
    }
    else{
      setScroll('');
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="NavBar">
      <div id="nav" className={nav + " " + scroll}>
        <div className="logo"><Logo /></div>
        <div className="nav-container">
          <div className="button" tabIndex="0">
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </div>
          <div className="nav-content" tabIndex="0">
            <ul>
              <li>
                <a href="">Trang chủ</a>
              </li>
              <li>
                <a href="">Liên hệ</a>
              </li>
              <li>
                <a href="">Về chúng tôi</a>
              </li>
              {logIn ? (
                <li>
                  <Account />
                </li>
              ) : (
                <>
                  <li>
                    <a href="">Đăng nhập</a>
                  </li>
                  <li>
                    <a href="">Đăng ký</a>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
