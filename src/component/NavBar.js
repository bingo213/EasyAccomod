import React, { useState, useEffect } from 'react';

import 'assets/css/navBar.css';

import Account from './account/Account';
import Logo from './Logo';
import { Link } from 'react-router-dom';

function NavBar() {
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
    return(()=>window.removeEventListener('scroll', handleScroll));
  }, []);

  const user = JSON.parse(localStorage.getItem('user'));
  const [isLogin, setIsLogin] = useState(() => {
    if (localStorage.getItem('user')) return true;
    else return false;
  });
  const [username, setUsername] = useState('name');
  useEffect(() => {
    if (isLogin) {
      setUsername(user.username);
    }
  }, []);

  const [role, setRole] = useState('');
  useEffect(() => {
    if (isLogin) {
      setRole(user.role);
    }
  }, []);

  const [avatar, setAvatar] = useState('');
  useEffect(() => {
    if (isLogin) {
      setAvatar(user.avatar);
    }
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
                <Link to='/'>Trang chủ</Link>
              </li>
              <li>
                <Link to='/'>Liên hệ</Link>
              </li>
              <li>
                <Link to='/'>Về chúng tôi</Link>
              </li>
              {
                role === 'owner' && <li className="btn">
                  <Link to='/create_post' id="btn">
                  <button><i className="fal fa-plus-circle"></i>Tạo bài viết</button>
                  </Link>
                </li>
              }
              {isLogin ? (
                <li>
                  <Account username={username} role={role} avatar={avatar}/>
                </li>
              ) : (
                <>
                  <li>
                    <Link to='/login'>Đăng nhập</Link>
                  </li>
                  <li>
                    <Link to='/register'>Đăng ký</Link>
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
