import React, { useState } from 'react';
import Modal from 'react-modal';

import 'assets/css/detailRentalUnit.css';
import image1 from 'assets/img/1.jpg';
import image2 from 'assets/img/2.jpg';
import image3 from 'assets/img/3.jpg';
import image4 from 'assets/img/4.jpg';
import image5 from 'assets/img/5.jpg';

import NavBar from 'component/NavBar';
import DisplayImage from './DisplayImage';
import ImageSliderCarousel from './ImageSliderCarousel';
import Like from 'component/favourite/Like';
import Footer from 'component/Footer';
import FormReport from './FormReport';
import CommentAlreadyExist from './CommentAlreadyExist';
import Star from 'component/favourite/Star';
import StarRating from 'component/favourite/StarRating';

Modal.setAppElement('#root');
function DetailRentalUnit() {
  // const product = this.props.products.find((p) => {
  //   return p.id === id;
  // });
  const slides = [image1, image2, image3, image4, image5];
  const [imageModalIsOpden, setImageModelIsOpen] = useState(false);
  const [reportIsOpen, setReportIsOpen] = useState(false);

  const modalStyle = {
    overlay: {
      backgroundColor: '#262525ad',
      zIndex: 10,
      width: '100vw',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    content: {
      width: '90vw',
      maxWidth: '60rem',
      maxHeight: '100vh',
      margin: 'auto',
      borderRadius: '4px',
    },
  };

  const handleClickImage = () => {
    setImageModelIsOpen(true);
  };
  return (
    <div className="DetailRentalUnit">
      <NavBar />
      <Modal
        isOpen={imageModalIsOpden}
        onRequestClose={() => setImageModelIsOpen(false)}
        style={modalStyle}
        className="modal"
      >
        <i
          className="fal fa-times"
          onClick={() => setImageModelIsOpen(false)}
        ></i>
        <div className="slideContent">
          <ImageSliderCarousel slides={slides} />
        </div>
      </Modal>
      <Modal
        isOpen={reportIsOpen}
        onRequestClose={() => setReportIsOpen(false)}
        style={modalStyle}
        className="modal"
      >
        <i className="fal fa-times" onClick={() => setReportIsOpen(false)}></i>
        <div className="reportModal">
          <FormReport />
        </div>
      </Modal>
      <div className="main">
        <DisplayImage images={slides} handleClickImage={handleClickImage} />
        <div className="title">
          Modern Villa with Pool
          <div className="heartIcon">
            <Like />
          </div>
        </div>
        <div className="date-report">
          <div className="date">
            <span>Ngày đăng</span>
            <br />
            14/12/2020
          </div>
          <div className="report" onClick={() => setReportIsOpen(true)}>
            Báo cáo
            <i className="far fa-exclamation-triangle"></i>
          </div>
        </div>
        <div className="description">
          <div className="generalInfo pad">
            <div className="pad">
              <i className="fal fa-home-alt"></i>Chung cư nguyên căn - Không
              chung chủ
            </div>
            <div className="pad">
              <i className="fal fa-warehouse-alt"></i>
              <span>Số lượng phòng:</span> 1
            </div>
            <div className="pad">
              <i className="fal fa-draw-square"></i>
              <span>Diện tích:</span> 50 m²
            </div>
            <div className="pad">
              <i className="fal fa-usd-circle"></i>
              <span>Giá:</span> 2.5 triệu/tháng
            </div>
          </div>
          <div className="roomAddress">
            <h3>Địa chỉ</h3>
            <div className="pad">
              <span>Tỉnh/Thành phố:</span> Hà Nội
            </div>
            <div className="pad">
              <span>Quận/Huyện:</span> Cầu Giấy
            </div>
            <div className="pad">
              <span>Xã/Phường:</span> Dịch Vọng
            </div>
            <div className="pad">
              <span>Đường:</span> Xuân Thủy
            </div>
            <div className="pad">
              <span>Số nhà:</span> 213
            </div>
          </div>
          <div className="roomFeature">
            <h3>Cơ sở vật chất</h3>
            <div className="divTop">
              <div className="col">
                <div className="pad">
                  <i className="fal fa-shower"></i>
                  <span>Phòng tắm:</span> Khép kín
                </div>
                <div className="pad">
                  <i className="fal fa-columns"></i>
                  <span>Ban công:</span> có
                </div>
                <div className="pad">
                  <i className="far fa-dewpoint"></i>
                  <span>Bình nóng lạnh:</span> có
                </div>

                <div className="pad">
                  <i className="far fa-wind"></i>
                  <span>Điều hòa:</span> có
                </div>
              </div>
              <div className="col">
                <div className="pad">
                  <i className="fal fa-hat-chef"></i>
                  <span>Bếp:</span> bếp riêng
                </div>

                <div className="pad">
                  <i className="fal fa-charging-station"></i>
                  <span>Điện:</span> 4000/kWh
                </div>
                <div className="pad">
                  <i className="fal fa-hand-holding-water"></i>
                  <span>Nước:</span> 7000/m3
                </div>
              </div>
            </div>
            <div className="pad">
              <span>Tiện ích khác:</span> Có tủ lạnh, máy giặt
            </div>
          </div>
        </div>
        <div className="comment">
          <h2>Bình luận</h2>
          <CommentAlreadyExist />
          <CommentAlreadyExist />
        </div>
      </div>
      <Star starId={5} marked={true}/>
      <StarRating />
      <Footer />
    </div>
  );
}

export default DetailRentalUnit;
