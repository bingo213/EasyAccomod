import React from 'react';

function PreviewImage({ images }) {
  if (images)
    return (
      <div>
        {images.map((image, index) => (
          <img
            style={{ width: '10rem', heigh: '8rem' }}
            key={index}
            src={`http://localhost:3001/${image.name}`}
          />
        ))}
      </div>
    );
  else return <div></div>;
}

export default PreviewImage;
// images.map((img, index) => (
//     <img key={index} src={`http://localhost:3001/${img.name}`} />
// ))
