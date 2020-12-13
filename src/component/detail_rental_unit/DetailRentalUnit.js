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

Modal.setAppElement('#root');
function DetailRentalUnit() {
  const slides = [image1, image2, image3, image4, image5];
  const [modalIsOpden, setModelIsOpen] = useState(false);

  const handleClickImage = () =>{
    setModelIsOpen(true);
  }
  return (
    <div className="DetailRentalUnit">
      <NavBar />
      <Modal
        isOpen={modalIsOpden}
        onRequestClose={() => setModelIsOpen(false)}
        style={{
          overlay: {
            backgroundColor: '#262525ad',
            zIndex: 10,
            width: '100vw',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          },
          content: {
            width: '90vw',
            maxWidth: '75rem',
            maxHeight: '100vh',
            margin: 'auto',
          },
        }}
        className="modal"
      >
      <i className="fas fa-times-square" onClick={()=>setModelIsOpen(false)}></i>
        <div className="slideContent">
          <ImageSliderCarousel slides={slides} />
        </div>
      </Modal>
      <DisplayImage images={slides} handleClickImage={handleClickImage}/>
    </div>
  );
}

export default DetailRentalUnit;
