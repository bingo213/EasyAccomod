import React, { useState } from 'react';
import 'assets/css/like.css';

function Like({ heart }) {
  console.log(heart);
  const [heartState, setHeartState] = useState(heart);
  return (
    <div className="Like">
      <i
        className={heartState ? 'fas fa-heart' : 'far fa-heart'}
        onClick={() => setHeartState(!heartState)}
      ></i>
    </div>
  );
}

export default Like;
