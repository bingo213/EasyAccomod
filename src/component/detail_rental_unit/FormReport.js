import React, { useState } from 'react';
import 'assets/css/report.css';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import authHeader from 'helper/auth-header';

function FormReport({ postId }) {
  const { register, handleSubmit } = useForm();
  const [err, setErr] = useState('');
  const onSubmitReport = data => {
    if (
      data.wrongAddress ||
      data.roomNotFound ||
      data.notAsDescribed ||
      data.other
    ) {
      setErr('');
      alert(JSON.stringify(data));
    } else {
      setErr('Bạn cần chọn ít nhất một lý do');
    }
    console.log(data);

    const postFormReport = async () => {
      await axios.post(
        `http://localhost:3001/report`,
        { ...data, post: postId  },
        { headers: authHeader() }
      );
    };

    postFormReport();
  };
  return (
    <div className="FormReport">
      <form action="" onSubmit={handleSubmit(onSubmitReport)}>
        <label >Tại sao bạn muốn báo cáo bài đăng này?</label>
        <div style={{ color: 'red', marginBottom: '1rem' }}>{err}</div>
        <div className="option">
          <input type="checkbox" name="wrongAddress" ref={register} />
          Sai địa chỉ
        </div>
        <div className="option">
          <input type="checkbox" name="roomNotFound" ref={register} />
          Phòng cho thuê không tồn tại
        </div>
        <div className="option">
          <input type="checkbox" name="notAsDescribed" ref={register} />
          Cơ sở vật chất không giống mô tả
        </div>
        <div className="option">
          <input type="checkbox" name="other" ref={register} />
          Khác
        </div>

        <div className="textArea">
          <textarea
            name="description"
            ref={register}
            placeholder="Thêm mô tả của bạn tại đây"
          />
        </div>
        <div className="btnCenter">
          <button type="submit">Gửi</button>
        </div>
      </form>
    </div>
  );
}

export default FormReport;
