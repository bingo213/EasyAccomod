import { ErrorMessage } from '@hookform/error-message';
import axios from 'axios';
import AutoAddress from 'component/address/AutoAddress';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';

function Register({ fields, button, text, type, url, additionField, action }) {
  const { register, handleSubmit, errors } = useForm();

  const header = {
    'Content-Type': 'application/json',
    ' Access-Control-Allow-Origin': '*',
  };

  const history = useHistory();
  const onSubmit = async data => {
    data.user_type = additionField;
    await axios
      .post(url, { ...data }, { header })
      .then(res => {
        if (res.data.success) {
          if (action === 'login') {
            localStorage.setItem('user', JSON.stringify(res.data));
            history.push('/');
          } else if (action === 'signup') {
            alert('Đăng ký thành công');
            history.push('/login');
          }
        } else {
        }
      })
      .catch(errors => {
        if (action === 'login') {
          alert('Tên đăng nhập hoặc mật khẩu không đúng');
        } else if (action === 'signup') {
          alert('Tên tài khoản đã tồn tại');
        }
      });
  };

  const validation = [
    {
      required: 'Bạn chưa chọn tỉnh/thành phố',
    },
    {
      required: 'Bạn chưa chọn quận/huyện',
    },
    {
      required: 'Bạn chưa chọn xã/phường',
    },
    {
      required: 'Bạn chưa nhập tên đường',
    },
    { required: 'Bạn chưa nhập số nhà' },
  ];
  return (
    <div className="Register">
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        {fields.map(field => (
          <div className="row" key={field.key}>
            <label>{field.label}</label>
            <ErrorMessage
              errors={errors}
              name={field.name}
              render={({ message }) => <p className="message">{message}</p>}
            />
            <input
              type={field.type}
              name={field.name}
              ref={register(field.registerObj)}
            />
          </div>
        ))}
        {action === 'signup' && additionField === 'owner' && (
          <AutoAddress
            register={register}
            validation={validation}
            errors={errors}
            extend={true}
          />
        )}
        <div className="bottom">
          <button type="submit">{button}</button>
          <span className="text">
            {text}
            {type === 'Đăng ký' && <Link to="/register">{type}</Link>}
            {type === 'Đăng nhập' && <Link to="/login">{type}</Link>}
          </span>
        </div>
      </form>
    </div>
  );
}

export default Register;
