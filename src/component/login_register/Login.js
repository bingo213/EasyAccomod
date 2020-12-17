import React from 'react';
import Register from './Register';

function Login() {
  const fields = [
    {
      key: 1,
      label: 'Tên đăng nhập',
      type: 'text',
      name: 'username',
      registerObj: { required: 'Bạn cần nhập username' },
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
        url='http://localhost:3001/users/login'
        additionField="login"
        button="Đăng nhập"
        text="Bạn chưa có tài khoản? "
        type="Đăng ký"
      />
    </div>
  );
}

export default Login;
