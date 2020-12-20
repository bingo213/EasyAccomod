import React from 'react';
import Register from './Register';

function OwnerRegister() {
  const fields = [
    {
      key: 1,
      label: 'Họ tên',
      type: 'text',
      name: 'name',
      registerObj: {
        required: 'Bạn cần nhập họ tên',
      },
    },
    {
      key: 2,
      label: 'Số căn cước',
      type: 'text',
      name: 'ID',
      registerObj: { required: 'Bạn cần nhập số căn cước' },
    },
    {
      key: 3,
      label: 'Số điện thoại',
      type: 'text',
      name: 'phoneNumber',
      registerObj: { required: 'Bạn cần nhập số điện thoại' },
    },
    {
      key: 4,
      label: 'Email',
      type: 'email',
      name: 'email',
      registerObj: {
        required: 'Bạn cần nhập email',
        pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
      },
    },
    {
      key: 5,
      label: 'Tên tài khoản',
      type: 'text',
      name: 'username',
      registerObj: {
        required: 'Bạn cần nhập tên tài khoản',
        minLength: {
          value: 4,
          message: 'Tên tài khoản cần dài tối thiểu 4 kí tự',
        },
        maxLength: {
          value: 12,
          message: 'Tên tài khoản dài tối đa 12 kí tự',
        },
      },
    },
    {
      key: 6,
      label: 'Mật khẩu',
      type: 'password',
      name: 'password',
      registerObj: { required: 'Bạn cần nhập mật khẩu' },
    },
    {
      key: 7,
      label: 'Nhập lại mật khẩu',
      type: 'password',
      name: 'rePassword',
      registerObj: { required: 'Bạn cần nhập lại mật khẩu' },
    },
  ];
  return (
    <div className="OwnerRegister">
      <Register
        fields={fields}
        url='http://localhost:3001/owner/signup'
        additionField='owner'
        button="Đăng ký"
        text="Bạn đã có tài khoản? "
        type="Đăng nhập"
        action="signup"
      />
    </div>
  );
}

export default OwnerRegister;
