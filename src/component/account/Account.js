import React, { useState, useEffect } from 'react';
import '../../assets/css/account.css';
import girlImg from 'assets/img/girl.jpg';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Account({username, role, avatar}) {
    const [toggle, setToggle] = useState(false);
    const logOut = async () =>{
      await axios.get('http://localhost:3001/users/logout')
      .then(response => {
        if(response.data.success){
          localStorage.removeItem('user');
          window.location.reload();
        }
      })
      .catch(err=>console.log(err))
    }
    
  return (
    <div className="Account" onClick={()=>setToggle(!toggle)}>
      <img src={avatar ? `http://localhost:3001/${avatar}` : girlImg} alt="" />
      <div className="userName">
        {username}<i className="fas fa-sort-down"></i>
      </div>
      {toggle && <ul id="item">
        <Link to="/profile"><li><i className="fas fa-address-card"></i>Hồ sơ</li></Link>
        <a href=""><li><i className="fas fa-heart"></i>Yêu thích</li></a>
        {(role ==='owner') && (<a href="/account"><li><i className="fal fa-newspaper"></i>Bài đăng</li></a>)}
        <a onClick={logOut}><li><i className="fas fa-sign-out"></i>Đăng xuất</li></a>
      </ul>}
    </div>
  );
}

export default Account;
