import React, { useState,useEffect } from 'react'
import '../../assets/css/navBar.css'
import Account from '../login/Account'

function NavBar() {
  function myFunction(x) {
    if (x.matches) {
      // If media query matches
      document.getElementById('nav').classList.remove('large-nav')
      document.getElementById('nav').classList.add('small-nav')
    } else {
      document.getElementById('nav').classList.add('large-nav')
      document.getElementById('nav').classList.remove('small-nav')
    }
  }

  const handleScroll = () => {
    var navbar = document.getElementById('nav')
    window.onscroll = function () {
      if (
        document.body.scrollTop >= 200 ||
        document.documentElement.scrollTop >= 200
      ) {
        navbar.classList.add('scrolled')
      } else {
        navbar.classList.remove('scrolled')
      }
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll) //Handle scroll
    var x = window.matchMedia('(max-width: 900px)')
    myFunction(x) // Call listener function at run time
    x.addListener(myFunction) // Attach listener function on state changes
  }, []);

  const [logIn, setLogIn] = useState(false)

  return (
    <div className="NavBar">
      <div id="nav" className="large-nav small-nav">
        <div className="logo">LOGO</div>
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
              {logIn ? <li><Account /></li> :
                <>
                   <li>
                    <a href="">Đăng nhập</a>
                  </li>
                  <li>
                    <a href="">Đăng ký</a>
                  </li>
                </>
            }
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
