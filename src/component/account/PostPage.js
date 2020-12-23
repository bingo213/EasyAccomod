import React, { useEffect, useState } from 'react';
import 'assets/css/postPage.css';
import Post from './Post';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import authHeader from '../../helper/auth-header';
import NavBar from 'component/NavBar';

function PostPage() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [isLogin, setIsLogin] = useState(() => {
    if (localStorage.getItem('user')) return true;
    else return false;
  });

  const history = useHistory();

  if (!isLogin) {
    history.push('/login');
  }

  const [postList, setPostList] = useState([]);

  const logOut = async () => {
    await axios
      .get('http://localhost:3001/users/logout')
      .then(response => {
        if (response.data.success) {
          localStorage.removeItem('user');
          window.location.reload();
        }
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    if (localStorage.getItem('user') === null) {
      history.push('/login');
    } else if (JSON.parse(localStorage.getItem('user')).role === 'rental') {
      history.push('/404');
    }
  }, []);

  let expirePost = [];
  let watingPost = [];
  let rejectPost = [];
  let activePost = [];
  useEffect(() => {
    if (user) {
      const getExpirePost = async () => {
        await axios
          .get(`http://localhost:3001/owner/${user.userId}/expirePost`, {
            headers: authHeader(),
          })
          .then(res => {
            if (res.data.success) {
              expirePost = res.data.posts;
            }
          });
      };
      const getWaitingPost = async () => {
        console.log(postList);
        await axios
          .get(`http://localhost:3001/owner/${user.userId}/waitingPost`, {
            headers: authHeader(),
          })
          .then(res => {
            if (res.data.success) {
              watingPost = res.data.posts;
            }
          });
      };
      const getRejectPost = async () => {
        await axios
          .get(`http://localhost:3001/owner/${user.userId}/rejectPost`, {
            headers: authHeader(),
          })
          .then(res => {
            if (res.data.success) {
              rejectPost = res.data.posts;
            }
          });
      };
      const getActivePost = async () => {
        await axios
          .get(`http://localhost:3001/owner/${user.userId}/activePost`, {
            headers: authHeader(),
          })
          .then(res => {
            if (res.data.success) {
              activePost = res.data.posts;
              // console.log(res.data.posts)
            }
          });
      };

      getActivePost();
      getExpirePost();
      getRejectPost();
      getWaitingPost();
    }
  }, [postList]);

  const [displayOption, setDisplayOption] = useState(false);

  const handleDisplayOption = () => {
    setDisplayOption(!displayOption);
  };

  const [active, setActive] = useState(0);

  const handleChangeRentStatus = async id => {
    await axios
      .put(
        `http://localhost:3001/post/${id}/changeRentStatus`,
        {},
        {
          headers: authHeader(),
        }
      )
      .then(res => {
        if (res.data.success) {
          alert('Cập nhật trạng thái thành công!');
          window.location.reload();
        }
      });
  };
  return (
    <>
      <NavBar />
      <div className="postPageNav"></div>
      <div className="PostPage">
        <div className="navigation">
          <div className="navContent">
            <div
              className={
                active === 1 ? 'navigationButton activeNav' : 'navigationButton'
              }
              onClick={() => {
                setPostList(activePost);
                setActive(1);
              }}
            >
              <i className="far fa-clipboard-check"></i>
              <div className="tag">Bài đăng đã duyệt</div>
            </div>
            <div
              className={
                active === 2 ? 'navigationButton activeNav' : 'navigationButton'
              }
              onClick={() => {
                setPostList(watingPost);
                setActive(2);
              }}
            >
              <i className="far fa-user-edit"></i>
              <div className="tag">Bài đăng chờ duyệt</div>
            </div>
            <div
              className={
                active === 3 ? 'navigationButton activeNav' : 'navigationButton'
              }
              onClick={() => {
                setPostList(rejectPost);
                setActive(3);
              }}
            >
              <i className="far fa-file-times"></i>
              <div className="tag">Bài đăng bị từ chối</div>
            </div>
            <div
              className={
                active === 4 ? 'navigationButton activeNav' : 'navigationButton'
              }
              onClick={() => {
                setPostList(expirePost);
                setActive(4);
              }}
            >
              <i className="fas fa-file-exclamation"></i>
              <div className="tag">Bài đăng hết hạn</div>
            </div>
          </div>
        </div>

        <div className="postPageContent">
          {postList.length !== 0 ? (
            postList.map(post => (
              <div
                className="postTag"
                style={{
                  backgroundColor: post.hasRent && '#FADBD8',
                }}
              >
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
                    {active === 1 && (
                      <div
                        className="op"
                        onClick={() => handleChangeRentStatus(post._id)}
                      >
                        Cập nhật đã thuê
                      </div>
                    )}
                    {active === 2 && (
                      <div>
                        {' '}
                        <Link to={`/modify_post/${post._id}`}><div className="op">Chỉnh sửa</div></Link>
                        <div className="op">Xóa</div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))
          ) : (
            <h2>Không có bài đăng nào để hiển thị</h2>
          )}
        </div>
      </div>
    </>
  );
}

export default PostPage;
