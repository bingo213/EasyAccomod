import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

function Register({ fields, button, text, type }) {
  const { register, handleSubmit } = useForm();

  const onSubmit = data => {
    console.log(data);
  };
  return (
    <div>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        {fields.map(field => (
          <div className="row" key={field.key}>
            <label>{field.label}</label>
            <input type={field.type} name={field.name} ref={register} />
          </div>
        ))}

        <div className="bottom">
          <button>{button}</button>
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
