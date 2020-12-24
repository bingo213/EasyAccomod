import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import 'assets/css/searchBar.css';
import AutoAddress from 'component/address/AutoAddress';
import axios from 'axios';

function SearchBar({rentalUnitSearch}) {
  const { register, handleSubmit, errors, datas } = useForm();
  const validation = [{}, {}, {}, {}, {}];
  const onSubmit = data => {
    const postSearchData = async () => {
      await axios
        .post('http://localhost:3001/search/findRoom', { ...data })
        .then(res => {
          console.log('Search return: ', res);
          rentalUnitSearch(res.data)
        });
    };
    postSearchData();
  };
  return (
    <div className="SearchBar">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="formContainer">
          <AutoAddress
            register={register}
            errors={errors}
            validation={validation}
            extend={false}
          />
          <div className="second">
            <select name="typeOfRoom" ref={register}>
              <option value="" hidden>
                Loại phòng
              </option>
              <option value="phongtro">Phòng trọ</option>
              <option value="chungcu">Chung cư mini</option>
              <option value="nha_nguyencan">Nhà nguyên căn</option>
              <option value="chungcu_nguyencan">Chung cư nguyên căn</option>
            </select>
            <div className="money">
              <select name="price" ref={register} className="price">
                <option value="" hidden>
                  Giá tiền
                </option>
                <option value="0-999999">Dưới 1 triệu</option>
                <option value="1000000-1499999">Từ 1 - 1.5 triệu</option>
                <option value="1500000-1999999">Từ 1.5 - 2 triệu</option>
                <option value="2000000-2499999">Từ 2 - 2.5 triệu</option>
                <option value="2500000-2999999">Từ 2.5 - 3 triệu</option>
                <option value="3000000-100000000">Trên 3 triệu</option>
              </select>
              <select name="typeOfPrice" className="time" ref={register}>
                <option value="" hidden>
                  Tính theo
                </option>
                <option value="month">Tháng</option>
                <option value="quarter">Quý</option>
                <option value="year">Năm</option>
              </select>
            </div>
            <select name="area" ref={register}>
              <option value="" hidden>
                Diện tích
              </option>
              <option value="0-19">Dưới 20 m²</option>
              <option value="20-29">Từ 20 - 30 m²</option>
              <option value="30-39">Từ 30 - 40 m²</option>
              <option value="40-49">Từ 40 - 50 m²</option>
              <option value="50-1000000">Trên 50 m²</option>
            </select>
          </div>
        </div>
        <div className="btn">
          <button className="searchBtn" type="submit" onClick={() => handleSubmit()}>Tìm kiếm</button>
          <button className="resetSearchBar" onClick={() => window.location.reload()}>Làm mới thanh tìm kiếm</button>
        </div>
      </form>
    </div>
  );
}

export default SearchBar;
