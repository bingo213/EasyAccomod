import React from 'react'

function Login() {
    return (
        <div>
             <div className="Login">
        <form action="">
          <div className="row">
            <label>Email</label>
            <input type="text" />
          </div>
          <div className="row">
            <label>Password</label>
            <input type="password" />
          </div>
          <div className="bottom">
            <button>Đăng nhập</button>
            <span className="text">
              Bạn chưa có tài khoản? <a href="">Đăng ký</a>
            </span>
          </div>
        </form>
      </div>
        </div>
    )
}

export default Login
