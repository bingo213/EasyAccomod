import React from 'react';
import Register from './Register';

function OwnerRegister() {
  const fields = [
    { key: 1, label: 'Họ tên', type: 'text', name: 'name', registerObj: {}},
    { key: 2, label: 'Số căn cước', type: 'text', name: 'ID', registerObj: {required: true} },
    { key: 3, label: 'Địa chỉ thường trú', type: 'text', name: 'address', registerObj:{required: true} },
    { key: 4, label: 'Số điện thoại', type: 'text', name: 'phoneNumber', registerObj:{required: true} },
    { key: 5, label: 'Email', type: 'email', name: 'email', registerObj:{required: true} },
    { key: 6, label: 'Username', type: 'text', name: 'username', registerObj:{required: true} },
    { key: 7, label: 'Mật khẩu', type: 'password', name: 'password', registerObj:{required: true} },
  ];
  return (
    <div className="OwnerRegister">
      <Register 
      fields={fields} 
      button="Đăng ký" 
      text="Bạn đã có tài khoản? " 
      type="Đăng nhập" />
    </div>
  );
}

export default OwnerRegister;
