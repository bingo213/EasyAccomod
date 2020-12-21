import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import authHeader from 'helper/auth-header';

function TestUploadImage() {
    const {register, handleSubmit} = useForm();

    const onSubmit = async data => {
        const formData = new FormData();
        for(let i = 0; i< data.img.length; i++)
        formData.append("image",data.img[i])

        formData.append("name", data.hoten)
      await axios
        .post('http://localhost:3001/upload', formData, {headers: authHeader()})
        .then(res => console.log(res))
        .catch(err => console.log(err));
    };
    return (
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input type="file" ref={register} name="img" multiple/>
          <input type="text" ref={register} name="hoten"/>
          <button type="submit">SUBMIT</button>
        </form>
      </div>
    );
}

export default TestUploadImage

