import React from 'react';
import 'assets/css/accountPage.css';
import Post from './Post';
import NavBar from 'component/NavBar';
import { Link } from 'react-router-dom';

function AccountPage() {
  return (
      <div className="AccountPage">
        <div className="AccountNav">
          <div className="icon" tabIndex="0">
            <i className="far fa-bars"></i>
            <i class="fal fa-times"></i>
          </div>
          <ul className="navContent" tabIndex="0">
            <Link to='/'><li>Home</li></Link>
            <li>Bài đăng đã tạo</li>
            <li>Bài đăng chờ duyệt</li>
            <li>Bài đăng bị từ chối</li>
            <li>Đăng xuất</li>
          </ul>
        </div>
        <div className="content">
          <Post />
          <Post />
        </div>
      </div>
  );
}

export default AccountPage;
