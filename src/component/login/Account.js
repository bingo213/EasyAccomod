import React, { useState } from 'react';
import '../../assets/css/account.css';
import girlImg from '../../assets/img/girl.jpg';

function Account() {
    const [toggle, setToggle] = useState(false)
  return (
    <div className="Account" onClick={()=>setToggle(!toggle)}>
      <img src={girlImg} alt="" />
      <div className="userName">
        Bingo<i className="fas fa-sort-down"></i>
      </div>
      {toggle && <ul id="item">
        <a href=""><li><i className="fas fa-address-card"></i>Hồ sơ</li></a>
        <a href=""><li><i className="fas fa-heart"></i>Yêu thích</li></a>
        <a href=""><li><i className="fas fa-sign-out"></i>Đăng xuất</li></a>
      </ul>}
    </div>
  );
}

export default Account;
