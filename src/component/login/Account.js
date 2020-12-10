import React from 'react';
import '../../assets/css/avata.css';
import girlImg from '../../assets/img/girl.jpg';

function Account() {
  return (
    <div className="Account">
      <img src={girlImg} alt="" />
      <div className="userName">
        Bingo<i class="fas fa-sort-down"></i>
      </div>
      <ul>
        <li>Yêu thích</li>
        <li>Đăng xuất</li>
    </ul>
    </div>
  );
}

export default Account;
