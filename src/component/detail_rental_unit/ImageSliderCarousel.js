import React, { useState } from 'react';

import 'assets/css/imageSlider.css';

function ImageSliderCarousel({ slides }) {
  const [current, setCurrent] = useState(0);
  const length = slides.length;

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };
  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }

  return (
    <div className="ImageSliderCarousel">
      <div className="leftArrow" onClick={prevSlide}>
        <i className="fas fa-chevron-left"></i>
      </div>
      <div className="rightArrow" onClick={nextSlide}>
        <i className="fas fa-chevron-right"></i>
      </div>
      {slides.map((image, index) => {
        return (
          <div
            className={index === current ? 'slide active' : 'slide'}
            key={index}
          >
            {index === current && <img src={image} alt="" className="image" />}
          </div>
        );
      })}
    </div>
  );
}

export default ImageSliderCarousel;
