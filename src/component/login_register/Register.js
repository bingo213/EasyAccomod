import React from 'react';

function Register({ fields }) {
  return (
    <div>
      <form action="">
        {fields.map(field => (
          <div className="row" key={field.key}>
            <label>{field.label}</label>
            <input type={field.type} name={field.name}/>
          </div>
        ))}

        <div className="bottom">
          <button>Đăng ký</button>
          <span className="text">
            Bạn đã có tài khoản? <a href="">Login</a>
          </span>
        </div>
      </form>
    </div>
  );
}

export default Register;
