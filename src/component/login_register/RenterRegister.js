import React from 'react';
import Register from './Register';

function RenterRegister() {
  const fields = [
    { key: 1, label: 'Họ tên', type: 'text', name: 'name' },
    { key: 2, label: 'Email', type: 'email', name: 'email' },
    { key: 3, label: 'Username', type: 'text', name: 'username' },
    { key: 4, label: 'Mật khẩu', type: 'password', name: 'password' },
  ];
  return (
    <div className="RenterRegister">
      <Register
        fields={fields}
        button="Đăng ký"
        text="Bạn đã có tài khoản? "
        type="Đăng nhập"
      />
    </div>
  );
}

export default RenterRegister;
