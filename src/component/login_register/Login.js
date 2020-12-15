import React from 'react';
import Register from './Register';

function Login() {
  const fields = [
    {
      key: 1,
      label: 'Email',
      type: 'email',
      name: 'email',
      registerObj: { required: 'Bsnj cần nhập email' },
    },
    {
      key: 2,
      label: 'Mật khẩu',
      type: 'password',
      name: 'password',
      registerObj: { required: 'Bạn cần nhập mật khẩu' },
    },
  ];

  return (
    <div className="Login">
      <Register
        fields={fields}
        button="Đăng nhập"
        text="Bạn chưa có tài khoản? "
        type="Đăng ký"
      />
    </div>
  );
}

export default Login;
