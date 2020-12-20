import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import 'assets/css/searchBar.css';
import AutoAddress from 'component/address/AutoAddress';

function SearchBar() {
  const { register, handleSubmit, errors } = useForm();
  const validation = [{}, {}, {}, {}, {}];
  const onSubmit = data => console.log(data);
  return (
    <div className="SearchBar">
      <form onSubmit={handleSubmit(onSubmit)}>
        <AutoAddress
          register={register}
          errors={errors}
          validation={validation}
          extend={false}
        />
        <select name="typeRoom" id="type" ref={register}>
          <option value="t1">Phòng trọ</option>
          <option value="t2">Chung cư mini</option>
          <option value="t3">Nhà nguyên căn</option>
          <option value="t4">Chung cư nguyên căn</option>
        </select>
        <select name="cost" id="cost" ref={register}>
          <option value="cost1">Dưới 1 triệu</option>
          <option value="cost2">Từ 1 - 1.5 triệu</option>
          <option value="cost3">Từ 1.5 - 2 triệu</option>
          <option value="cost4">Từ 2 - 2.5 triệu</option>
          <option value="cost5">Từ 2.5 - 3 triệu</option>
          <option value="cost6">Trên 3 triệu</option>
        </select>
        <select name="area" id="area" ref={register}>
          <option value="area1">Dưới 20 m²</option>
          <option value="area2">Từ 20 - 30 m²</option>
          <option value="area3">Từ 30 - 40 m²</option>
          <option value="area4">Từ 40 - 50 m²</option>
          <option value="area5">Trên 50 m²</option>
        </select>
        <div className="btn"><button type="submit">Tìm kiếm</button></div>
      </form>
    </div>
  );
}

export default SearchBar;
