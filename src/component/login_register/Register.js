import { ErrorMessage } from '@hookform/error-message';
import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';

function Register({ fields, button, text, type, url, additionField}) {
  const { register, handleSubmit, errors} = useForm();

  const header = {
    'Content-Type': 'application/json',
   ' Access-Control-Allow-Origin': '*'
  }

  const history = useHistory()
  const onSubmit = async (data) => {
    data.user_type = additionField
   await axios.post(url, {...data},{header})
   .then(res => {
     if(res.data.success){
       if(type === 'Đăng nhập'){
        localStorage.setItem('user', JSON.stringify(res.data))
         history.push('/');
       }
       else if(type === 'Đăng ký'){
        history.push('/login')
       }
     }
   })
  };
  return (
    <div>
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
