import React from 'react'
import Register from './Register'

function OwnerRegister() {
    const field = [
        {
            key: 1,
            label: 'Họ tên',
            type: 'text',
            name: 'name'
        },
        {
            key: 2,
            label: 'Số căn cước',
            type: 'text',
            name: 'ID'
        },
        {
            key: 3,
            label: 'Địa chỉ thường trú',
            type: 'text',
            name: 'address'
        },
        {
            key: 4,
            label: 'Số điện thoại',
            type: 'text',
            name: 'phoneNumber'
        },
        {
            key: 5,
            label: 'Email',
            type: 'email',
            name: 'email'
        },
        {
            key: 6,
            label: 'Tên tài khoản',
            type: 'text',
            name: 'username'
        },
        {
            key: 7,
            label: 'Mật khẩu',
            type: 'password',
            name: 'password'
        }
    ]

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
