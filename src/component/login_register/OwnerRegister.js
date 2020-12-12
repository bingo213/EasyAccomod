import React from 'react'
import Register from './Register'

function OwnerRegister() {
    return (
        <div className="OwnerRegister">
        <form action="">
          <div className="row">
            <label>Họ tên</label>
            <input type="text" />
          </div>
          <div className="row">
            <label>Số căn cước</label>
            <input type="text" />
          </div>
          <div className="row">
            <label>Địa chỉ thường trú</label>
            <input type="text" />
          </div>
          <div className="row">
            <label>Số điện thoại</label>
            <input type="text" />
          </div>
          <div className="row">
            <label>Email</label>
            <input type="text" />
          </div>
          <div className="row">
            <label>Username</label>
            <input type="text" />
          </div>
          <div className="row">
            <label>Password</label>
            <input type="password" />
          </div>
          <div className="bottom">
            <button>Đăng ký</button>
            <span className="text">
              Bạn đã có tài khoản? <a href="">Login</a>
            </span>
          </div>
        </form>
      </div>
    )
}

export default OwnerRegister
