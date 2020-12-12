import React from 'react'

function RenterRegister() {
    return (
        <div className="RenterRegister">
        <form action="">
          <div className="row">
            <label>Họ tên</label>
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
              Bạn đã có tài khoản? <a href="">Đăng nhập</a>
            </span>
          </div>
        </form>
      </div>
    )
}

export default RenterRegister
