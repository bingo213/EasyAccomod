import React, { useEffect, useState } from 'react';
import 'assets/css/postPage.css';
import Post from './Post';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import authHeader from '../../helper/auth-header';
import NavBar from 'component/NavBar';
import Footer from 'component/Footer';

function PostPage() {
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

  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem('user') === null) {
      history.push('/login');
    } else if (JSON.parse(localStorage.getItem('user')).role === 'rental') {
      history.push('/404');
    }
  }, []);

  const user = JSON.parse(localStorage.getItem('user'));
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
              console.log(res.data.posts);
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
              console.log(res.data.posts);
              console.log(postList);
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
              console.log(res.data.posts);
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

  return (
    <>
      <div className="postPageNav">
        {' '}
        <NavBar />
      </div>
      <div className="PostPage">
        <div className="navigation">
          <div className="navContent">
            <div
              className="navigationButton"
              onClick={() => setPostList(activePost)}
            >
              <i className="far fa-clipboard-check"></i>
              <div className="tag">Bài đăng đã duyệt</div>
            </div>
            <div
              className="navigationButton"
              onClick={() => setPostList(watingPost)}
            >
              <i className="far fa-user-edit"></i>
              <div className="tag">Bài đăng chờ duyệt</div>
            </div>
            <div
              className="navigationButton"
              onClick={() => setPostList(rejectPost)}
            >
              <i className="far fa-file-times"></i>
              <div className="tag">Bài đăng bị từ chối</div>
            </div>
            <div
              className="navigationButton"
              onClick={() => setPostList(expirePost)}
            >
              <i className="fas fa-file-exclamation"></i>
              <div className="tag">Bài đăng hết hạn</div>
            </div>
          </div>
        </div>

        <div className="postPageContent">
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
        </div>
      </div>
    </>
  );
}

export default PostPage;
