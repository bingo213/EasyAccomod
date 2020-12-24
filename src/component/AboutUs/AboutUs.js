import React from 'react';
import img1 from 'assets/img/a.jpg'
import img2 from 'assets/img/b.jpg'
import img3 from 'assets/img/c.jpg'
import 'assets/css/aboutUs.css'

function AboutUs() {
  return (
    <div className="AboutUs">
      <div className="team-section">
        <h1>About Us</h1>
        <span className="border"></span>

        <div className="ps">
          <a href="#p1">
            <img src={img1} alt="" />
          </a>
          <a href="#p2">
            <img src={img2} alt="" />
          </a>
          <a href="#p3">
            <img src={img3} alt="" />
          </a>
        </div>
      </div>
      <div>
        <div className="section" id="p1">
          <span className="name">Đỗ Văn Long</span>
          <span className="border"></span>
          <p>
            Thu rất thật thu là cái lúc chớm đông sang Em rất thật em là lúc em
            hoang mang lựa chọn Anh rất thật anh là sớm biết ra đi nhẹ gọn Để
            tránh cho em mất một lời chào Và Bớt cho trời một chút gió xôn xao…
          </p>
        </div>
        <div className="section" id="p2">
          <span className="name">Trần Thị Hoa Hiên</span>
          <span className="border"></span>
          <p>
            Hơi thở của mùa thu chẳng phải đọng nhất ở làn heo may chớm lạnh lúc
            đầu đông hay sao? Người đàn bà chẳng phải sẽ hiện ra một cách tường
            tận trong những đắn đo, lựa chọn, trong những băn khoăn cân nhắc hay
            sao? Và anh, trong giới hạn này của cuộc đời, biết ra đi nhẹ gọn là
            một ứng xử mang màu lang bạt, lặng im mà thấu suốt. Nếu gán cho anh
            nét giang hồ của gió, thì sự ra đi này chẳng phải còn kiêu bạc hơn
            gió sao? Trên ngưỡng cực hạn, bài thơ rất đỗi thành thực, dẫu đó là
            sự thành thực lạnh lùng mang hình hài một nỗi đau câm nín.
          </p>
        </div>
        <div className="section" id="p3">
          <span className="name">Nguyễn Thị Thu Phương</span>
          <span className="border"></span>
          <p>
            Tôi nghĩ mãi về điểm cực hạn mà bài thơ Thu của Chu Hoạch gợi nên. Ở
            đấy, có lẽ mọi thứ hiện ra rõ nhất mà tinh nhất, bởi tất cả đã đi
            đến tận cùng của giới hạn, nơi bản chất được bộc lộ đủ đầy.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
