import React from 'react';
import Register from './Register';

function OwnerRegister() {
  const fields = [
    { key: 1, label: 'Họ tên', type: 'text', name: 'name' },
    { key: 2, label: 'Số căn cước', type: 'text', name: 'ID' },
    { key: 3, label: 'Địa chỉ thường trú', type: 'text', name: 'address' },
    { key: 4, label: 'Số điện thoại', type: 'text', name: 'phoneNumber' },
    { key: 5, label: 'Email', type: 'email', name: 'email' },
    { key: 6, label: 'Username', type: 'text', name: 'username' },
    { key: 7, label: 'Mật khẩu', type: 'password', name: 'password' },
  ];
  return (
    <div className="OwnerRegister">
      <Register fields={fields} button="Đăng ký" text="Bạn đã có tài khoản? " type="Đăng nhập" />
    </div>
  );
}

export default OwnerRegister;
