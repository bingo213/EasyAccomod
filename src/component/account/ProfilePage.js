import NavBar from 'component/NavBar';
import Profile from 'component/account/Profile';
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import ListLike from 'component/favourite/ListLike';
import authHeader from 'helper/auth-header';

function ProfilePage({defaultType}) {
  const user = JSON.parse(localStorage.getItem('user'));
  const [isLogin, setIsLogin] = useState(() => {
    if (localStorage.getItem('user')) return true;
    else return false;
  });

  const history = useHistory();

  if (!isLogin) {
    history.push('/login');
  }

  const userId = isLogin ? user.userId : 0;

  // const [type, setType] = useState(defaultType);

  const [favoriteList, setFavoriteList] = useState([]);
  const [loadList, setLoadList] = useState(true);

  useEffect(() => {
    setLoadList(true);
    const getFavoriteList = async () => {
      await axios
        .get(`http://localhost:3001/users/${userId}/favorites`, {headers: authHeader()})
        .then(res => {
          if (res.data.success) {
            console.log(res.data);
            setFavoriteList(res.data.posts);
          }
        });
    };
    setLoadList(false);

    if(isLogin) getFavoriteList();
  });

  return (
    <div className="ProfilePage">
      <NavBar />
      <div className="postPageNav"></div>
      <div className="PostPage">
        <div className="navigation">
          <div className="navContent">
            <div
              className="navigationButton"
              onClick={() => history.push('/profile')}
            >
              <i className="far fa-id-card"></i>
              <div className="tag">Thông tin tài khoản</div>
            </div>
            <div
              className="navigationButton"
              onClick={() => history.push('/favorite_list')}
            >
              <i className="fas fa-heart-circle"></i>
              <div className="tag">Danh sách yêu thích</div>
            </div>
          </div>
        </div>

        <div className="postPageContent">
          {defaultType === 'account' && <Profile userId={userId} />}
          {defaultType === 'listLike' && <ListLike list={favoriteList} />}
          {/* <Profile userId={userId} /> */}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
