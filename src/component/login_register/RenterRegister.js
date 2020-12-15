import React from 'react';
import Register from './Register';

function RenterRegister() {
  const fields = [
    { key: 1, label: 'Họ tên', type: 'text', name: 'name' , registerObj : {}},
    { key: 2, label: 'Email', type: 'email', name: 'email', registerObj : {} },
    { key: 3, label: 'Username', type: 'text', name: 'username', registerObj : {} },
    { key: 4, label: 'Mật khẩu', type: 'password', name: 'password', registerObj : {} },
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
