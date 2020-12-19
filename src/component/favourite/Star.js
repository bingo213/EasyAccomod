import React from 'react';

function Star({ starId, marked }) {
  return (
    <span
      star-id={starId}
      role="button"
      style={{ color: '#ff9933', cursor: 'pointer', fontSize: '1.3rem'}}
    >{marked ? "\u2605" : "\u2606"}</span>
  );
}

export default Star;
