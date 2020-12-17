import React from 'react';
import Register from './Register';
import config from 'config'

function RenterRegister() {
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
      label: 'Email',
      type: 'email',
      name: 'email',
      registerObj: {
        required: 'Bạn cần nhập email',
        pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
      },
    },
    {
      key: 3,
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
      key: 4,
      label: 'Mật khẩu',
      type: 'password',
      name: 'password',
      registerObj: {
        required: 'Bạn cần nhập mật khẩu',
        minLength: {
          value: 5,
          message: 'Mật khẩu cần dài tối thiểu 5 kí tự',
        },
        maxLength: {
          value: 30,
          message: 'Mật khẩu dài tối đa 30 kí tự',
        },
      },
    },
    {
      key: 5,
      label: 'Nhập lại mật khẩu',
      type: 'password',
      name: 'rePassword',
      registerObj: {
        required: 'Bạn cần nhập lại mật khẩu',
        // validate: {
        //   rePass: value =>
        //     value === getValues().password || 'Mật khẩu nhập lại không khớp',
        // },
      },
    },
  ];
  return (
    <div className="RenterRegister">
      <Register
        fields={fields}
        url={`${config}/users/signup`}
        additionField='rental'
        button="Đăng ký"
        text="Bạn đã có tài khoản? "
        type="Đăng nhập"
      />
    </div>
  );
}

export default RenterRegister;
