import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';

import 'assets/css/detailRentalUnit.css';

import NavBar from 'component/NavBar';
import DisplayImage from './DisplayImage';
import ImageSliderCarousel from './ImageSliderCarousel';
import Like from 'component/favourite/Like';
import Footer from 'component/Footer';
import FormReport from './FormReport';
import CommentAlreadyExist from './CommentAlreadyExist';
import Star from 'component/favourite/Star';
import StarRating from 'component/favourite/StarRating';
import Comment from './Comment';
import { useParams } from 'react-router-dom';
import axios from 'axios';
// import concatAddress from 'helper/concatAddress';
import formatDate from 'helper/formatDate';
import returnType from 'helper/returnType';
import typeOfBath from 'helper/typeOfBath';
import typeOfKitch from 'helper/typeOfKitch';
import returnWithOwner from 'helper/withOwner';
import typeOfRoom from 'helper/typeRoom';

Modal.setAppElement('#root');
function DetailRentalUnit() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [isLogin, setIsLogin] = useState(() => {
    if (localStorage.getItem('user')) return true;
    else return false;
  });

  const { id } = useParams();
  const [rentalUnit, setRentalUnit] = useState({});
  const [author, setAuthor] = useState({});
  const [loading, setLoading] = useState(true);

  const [numberOfLike, setNumberOfLike] = useState(0);

  const [loadCmt, setLoadCmt] = useState(true);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const getRentalUnit = async () => {
      setLoading(true);
      await axios
        .get(`http://localhost:3001/post/${id}`)
        .then(res => {
          setRentalUnit(res.data.post);
          setAuthor(res.data.author);
          setNumberOfLike(res.data.number);
          setLoading(false);
        })
        .catch(err => console.log(err));
    };

    getRentalUnit();
  }, []);

  useEffect(() => {
    const getComment = async () => {
      setLoadCmt(true);
      await axios
        .get(`http://localhost:3001/post/${id}/comments`)
        .then(res => {
          setComments(res.data.comments);
          setLoadCmt(false);
        })
        .catch(err => console.log(err));
    };

    getComment();
  }, []);

  const slides = loading
    ? []
    : rentalUnit.images.map(item => `http://localhost:3001/${item.name}`);
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
  let term = loading

  const handleSubmit = ()=>{
    setReportIsOpen(false);
  }
  
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
          <FormReport postId={id} handleSubmitForm={handleSubmit} />
        </div>
      </Modal>
      <div className="main">
        <DisplayImage images={slides} handleClickImage={handleClickImage} />
        <div className="title">{loading ? '' : rentalUnit.title}</div>
        <div className="icon">
          <div className="view">
            <span className="numberOfView">
              {loading ? 0 : rentalUnit.views}
            </span>
            <i className="fas fa-eye"></i>
          </div>
          <div className="heartIcon">
            <Like postId={id} isLogin={isLogin} />
          </div>
        </div>
        <div className="date-report">
          <div className="date">
            <span>Ngày đăng</span>
            <br />
            {loading ? '' : formatDate(new Date(rentalUnit.activeDate))}
          </div>
          <div className="report" onClick={() => setReportIsOpen(true)}>
            Báo cáo
            <i className="far fa-exclamation-triangle"></i>
          </div>
        </div>
        <div className="description">
          <div className="generalInfo pad">
            <div className="pad">
              <i className="fal fa-home-alt"></i>
              {loading ? '' : typeOfRoom(rentalUnit.typeOfRoom)} {` - `}
              {loading ? '' : returnWithOwner(rentalUnit.withOwner)}
            </div>
            <div className="pad">
              <i className="fal fa-warehouse-alt"></i>
              <span>Số lượng phòng:</span>
              {loading ? '' : rentalUnit.numberOfRoom}
            </div>
            <div className="pad">
              <i className="fal fa-draw-square"></i>
              <span>Diện tích:</span> {loading ? '' : rentalUnit.area} m
              <sup>2</sup>
            </div>
            <div className="pad">
              <i className="fal fa-usd-circle"></i>
              <span>Giá:</span> {loading ? '' : rentalUnit.price / 1000000}{' '}
              triệu/tháng
            </div>
          </div>
          <div className="roomAddress">
            <h3>Địa chỉ</h3>
            <div className="pad">
              <span>Tỉnh/Thành phố:</span>{' '}
              {loading ? '' : rentalUnit.address.province}
            </div>
            <div className="pad">
              <span>Quận/Huyện:</span>{' '}
              {loading ? '' : rentalUnit.address.district}
            </div>
            <div className="pad">
              <span>Xã/Phường:</span>{' '}
              {loading ? '' : rentalUnit.address.village}
            </div>
            <div className="pad">
              <span>Đường:</span> {loading ? '' : rentalUnit.address.street}
            </div>
            <div className="pad">
              <span>Số nhà:</span>{' '}
              {loading ? '' : rentalUnit.address.houseNumber}
            </div>
          </div>
          <div className="roomFeature">
            <h3>Cơ sở vật chất</h3>
            <div className="divTop">
              <div className="col">
                <div className="pad">
                  <i className="fal fa-shower"></i>
                  <span>Phòng tắm:</span>{' '}
                  {loading ? '' : typeOfBath(rentalUnit.typeOfBathroom)}
                </div>
                <div className="pad">
                  <i className="fal fa-columns"></i>
                  <span>Ban công:</span>{' '}
                  {loading ? '' : returnType(rentalUnit.hasBalcony)}
                </div>
                <div className="pad">
                  <i className="far fa-dewpoint"></i>
                  <span>Bình nóng lạnh:</span>{' '}
                  {loading ? '' : returnType(rentalUnit.hasHeater)}
                </div>

                <div className="pad">
                  <i className="far fa-wind"></i>
                  <span>Điều hòa:</span>{' '}
                  {loading ? '' : returnType(rentalUnit.hasAirCon)}
                </div>
              </div>
              <div className="col">
                <div className="pad">
                  <i className="fal fa-hat-chef"></i>
                  <span>Bếp:</span>{' '}
                  {loading ? '' : typeOfKitch(rentalUnit.typeOfKitchen)}
                </div>

                <div className="pad">
                  <i className="fal fa-charging-station"></i>
                  <span>Điện:</span>
                  {loading ? '' : rentalUnit.priceOfElect}/kWh
                </div>
                <div className="pad">
                  <i className="fal fa-hand-holding-water"></i>
                  <span>Nước:</span> {loading ? '' : rentalUnit.priceOfWater}/m3
                </div>
              </div>
            </div>
            <div className="pad">
              <span>Tiện ích khác:</span> {loading ? '' : rentalUnit.services}
            </div>
          </div>
        </div>
        <div className="contact">
          <h2>Liên hệ chủ trọ</h2>
          <div className="contactElement">
            <span>Chủ trọ:</span>
            {author ? author.fullname : ''}
          </div>
          <div className="contactElement">
            <span>Email:</span>
            {author ? author.email : ''}
          </div>
          <div className="contactElement">
            <span>Số điện thoại:</span>
            {author ? author.phoneNumber : ''}
          </div>
        </div>
        <div className="comment">
          <h2>Bình luận</h2>
          {!loadCmt &&
            comments.length > 0 &&
            comments.map((comment, index) => (
              <CommentAlreadyExist
                key={index}
                cmt={comment}
                loading={loadCmt}
                // avatar={avatar}
              />
            ))}
          <Comment postId={id} />
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default DetailRentalUnit;
