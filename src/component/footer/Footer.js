import React from 'react';
import '../../assets/css/footer.css';

function Footer() {
  return (
    <div className="Footer">
      <div className="col-container">
        <div className="logo">LOGO</div>
        <div className="visit-contact">
          <div className="col">
            <h3>Văn phòng</h3>
            <p>
              144 Xuan Thuy Road,
              <br />
              Cau Giay District,
              <br />
              Ha Noi, Viet Nam
            </p>
          </div>
          <div className="col">
            <h3>Liên hệ</h3>
            <p>
              <span>Hotline: </span>12345678 <br />
              <span>G-mail: </span>easy_accomod@gmail.com
            </p>
          </div>
        </div>
      </div>
      <div className="follow">
        <h3>Follow</h3>
        <div className="icon">
          <a href=""><i className="fab fa-instagram"></i></a>
          <a href=""><i className="fab fa-facebook-square"></i></a>
          <a href=""><i className="fab fa-twitter"></i></a>
        </div>
      </div>
      <p className="copyright">&#169; 2020. All rights reserved.</p>
    </div>
  );
}

export default Footer;
