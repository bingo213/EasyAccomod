import React, { useState } from 'react';
import 'assets/css/like.css';

function Like({ isLike }) {
  const [heartState, setHeartState] = useState(isLike);
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
