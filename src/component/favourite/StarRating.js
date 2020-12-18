import React, { useState } from 'react';
import Star from './Star';

function StarRating({ props }) {
  const [selection, setSelection] = useState(0);

  const [rating, setRating] = useState(0);

  const hoverOver = event => {
    let starId = 0;
    if (event && event.target && event.target.getAttribute('star-id')) {
      starId = event.target.getAttribute('star-id');
    }
    setSelection(starId);
  };

  return (
    <div
      onMouseOver={hoverOver}
      onMouseOut={() => hoverOver(null)}
      onClick={event => setRating(event.target.getAttribute('star-id'))}
    >
      {Array.from({ length: 5 }, (v, i) => (
        <Star
          key={i}
          starId={i + 1}
          marked={selection ? selection > i : rating > i}
        />
      ))}
    </div>
  );
}

export default StarRating;

