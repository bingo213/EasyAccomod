import React from 'react';
import { useForm } from 'react-hook-form';
import 'assets/css/modifyPost.css';

function ModifyPost() {
  const { register, handleSubmit } = useForm();
  const onSubmit = data => console.log(data);
  return (
    <div className="ModifyPost">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="address">
          <h2>Địa chỉ</h2>
          <label>
            <p>Tỉnh/Thành phố</p>
            <input type="text" ref={register} name="city" />
          </label>
          <label>
            <p>Quận/Huyện</p>
            <input type="text" ref={register} name="district" />
          </label>
          <label>
            <p> Xã/Phường</p>
            <input type="text" ref={register} name="village" />
          </label>
          <label>
            <p> Đường</p>
            <input type="text" ref={register} name="street" />
          </label>
          <label>
            <p> Số nhà</p>
            <input type="text" ref={register} name="houseNumber" />
          </label>
          <label>
            <p>Mô tả</p>
            <input type="text" ref={register} name="description" />
          </label>
        </div>
        <div className="general">
          <h2>Mô tả chung</h2>
          <label>
            <p>Số lượng phòng</p>
            <input type="number" ref={register} name="numberOfRoom" />
          </label>
          <label>
            <p>Giá (triệu/tháng)</p>
            <input type="number" ref={register} name="cost" />
          </label>
          <label>
            <p>Diện tích (m2)</p>
            <input type="number" ref={register} name="area" />
          </label>
          <label>
            <p>Chung chủ</p>{' '}
            <select ref={register} name="host">
              <option value="true">Có</option>
              <option value="false">Không</option>
            </select>
          </label>
        </div>
        <div className="facilities">
          <h2>Cơ sở vật chất</h2>
          <label>
            <p> Phòng tắm</p>
            <select name="bathRoom" ref={register}>
              <option value="b1">Khép kín</option>
              <option value="b2">Không khép kín</option>
            </select>
          </label>
          <label>
            <p>Nóng lạnh</p>
            <select name="heater" ref={register}>
              <option value="true">Có</option>
              <option value="false">Không</option>
            </select>
          </label>
          <label>
            <p>Bếp</p>
            <select name="kitchen" ref={register}>
              <option value="k1">Bếp riêng</option>
              <option value="k2">Bếp chung</option>
              <option value="k3">Không nấu ăn</option>
            </select>
          </label>
          <label>
            {' '}
            <p>Điều hòa</p>
            <select name="air" ref={register}>
              <option value="true">Có</option>
              <option value="false">Không</option>
            </select>
          </label>
          <label>
            <p> Ban công</p>
            <select name="bacony" ref={register}>
              <option value="true">Có</option>
              <option value="false">Không</option>
            </select>
          </label>
          <label>
            <p> Điện (đồng/kWh)</p>
            <input type="number" name="electricity" ref={register} />
          </label>
          <label>
            <p>Nước (đồng/m3)</p>
            <input type="number" name="water" ref={register} />
          </label>
          <label>
            <p>Tiện ích khác</p>
            <textarea name="other" ref={register}></textarea>
          </label>
        </div>
        <div className="button">
          <button type="submit">Hoàn thành</button>
        </div>
      </form>
    </div>
  );
}

export default ModifyPost;
