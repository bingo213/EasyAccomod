import React from 'react';

function Register({ fields,button, text, type }) {
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
          <button>{button}</button>
          <span className="text">
            {text}<a href="">{type}</a>
          </span>
        </div>
      </form>
    </div>
  );
}

export default Register;
