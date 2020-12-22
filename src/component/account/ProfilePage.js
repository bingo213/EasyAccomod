import NavBar from 'component/NavBar';
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

function ProfilePage() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [isLogin, setIsLogin] = useState(() => {
    if (localStorage.getItem('user')) return true;
    else return false;
  });

  const history = useHistory();

  if (!isLogin) {
    history.push('/login');
  }

  const [username, setUsername] = useState('name');
  useEffect(() => {
    if (isLogin) {
      setUsername(user.username);
    }
  }, []);

  const [role, setRole] = useState('');
  useEffect(() => {
    if (isLogin) {
      setRole(user.role);
    }
  }, []);

  return (
    <div className="ProfilePage">
      <div className="postPageNav">
        <NavBar isLogin={isLogin} role={role} username={username} />
      </div>
      <div className="PostPage">
        <div className="navigation">
          <div className="navContent">
            <div
              className="navigationButton"
              //   onClick={() => setPostList(activePost)}
            >
              <i className="far fa-id-card"></i>
              <div className="tag">Thông tin tài khoản</div>
            </div>
            <div
              className="navigationButton"
              //   onClick={() => setPostList(watingPost)}
            >
              <i className="fas fa-heart-circle"></i>
              <div className="tag">Danh sách yêu thích</div>
            </div>
            {/* <div
              className="navigationButton"
            //   onClick={() => setPostList(rejectPost)}
            >
              <i className="far fa-file-times"></i>
              <div className="tag">Bài đăng bị từ chối</div>
            </div>
            <div
              className="navigationButton"
            //   onClick={() => setPostList(expirePost)}
            >
              <i className="fas fa-file-exclamation"></i>
              <div className="tag">Bài đăng hết hạn</div>
            </div> */}
          </div>
        </div>

        {/* <div className="postPageContent">
          {postList.length !== 0 ? (
            postList.map(post => (
              <div className="postTag">
                <Post
                  key={post.id}
                  id={post._id}
                  image={post.images[0].name}
                  title={post.title}
                  price={post.price}
                  address={`Số nhà ${post.address.houseNumber}, đường ${post.address.street}, phường ${post.address.village}, quận ${post.address.district}, ${post.address.province}`}
                  createDate={post.createdAt}
                />
                <i
                  className="far fa-ellipsis-v"
                  onClick={handleDisplayOption}
                ></i>
                {displayOption && (
                  <div className="option">
                    <div className="op">Chỉnh sửa</div>
                    <div className="op">Xóa</div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <h2>Không có bài đăng nào để hiển thị</h2>
          )}
        </div> */}
      </div>
    </div>
  );
}

export default ProfilePage;
