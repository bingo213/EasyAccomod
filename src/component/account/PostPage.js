import React, { useEffect, useState } from 'react';
import 'assets/css/postPage.css';
import Post from './Post';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import authHeader from '../../helper/auth-header';
import NavBar from 'component/NavBar';
import Modal from 'react-modal';
import caculatePrice from 'helper/caculatePrice';
import { useForm } from 'react-hook-form';

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

  if(user.role === 'admin'){
    history.push('/404')
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

  if (localStorage.getItem('user') === null) {
    history.push('/login');
  } else if (JSON.parse(localStorage.getItem('user')).role === 'rental') {
    history.push('/404');
  }

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

  const [time, setTime] = useState(0);
  const [typeOfTime, setTypeOfTime] = useState('');
  const [price, setPrice] = useState(0);
  const handleChangeTime = e => {
    setTime(e.target.value);
  };

  const handleChangeTypeOfTime = e => {
    setTypeOfTime(e.target.value);
  };

  useEffect(() => {
    setPrice(caculatePrice({ time: time, typeOfTime: typeOfTime }));
  }, [time, typeOfTime]);

  const [idExtend, setIdExtend] = useState(0);

  const modalStyle = {
    overlay: {
      backgroundColor: '#262525ad',
      zIndex: 10,
      width: '100vw',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    content: {
      width: '90vw',
      maxWidth: '60rem',
      maxHeight: '100vh',
      margin: 'auto',
      borderRadius: '4px',
    },
  };

  const handleDisplayOption = () => {
    setDisplayOption(!displayOption);
  };

  const [active, setActive] = useState(1);

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

  const handleDeletePost = id => {
    const deletePost = async () => {
      await axios
        .delete(`http://localhost:3001/post/${id}`, { headers: authHeader() })
        .then(res => {
          if (res.data.success) {
            alert('Xóa thành công bài viết!');
          }
        })
        .catch(err => console.log(err));
    };

    const cf = window.confirm('Bạn có chắc chắn muốn xóa bài viết này?');
    if (cf == true) {
      deletePost();
      window.location.reload();
    }
  };

  const { register, handleSubmit, errors } = useForm();

  const onSubmit = data => {
    const extendDate = async () => {
      axios
        .post(`http://localhost:3001/post/${idExtend}/extends`, data, {
          headers: authHeader(),
        })
        .then(res => {
          if (res.data.success) {
            alert('Yêu cầu gia hạn sẽ được gửi đến cho admin phê duyệt');
            setModelIsOpen(false);
          }
        });
    };

    extendDate();
  };

  const [modalIsOpden, setModelIsOpen] = useState(false);

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
                key={post.id}
                className="postTag"
                style={{
                  backgroundColor: post.hasRent && '#FADBD8',
                }}
              >
                <Post
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
                    {(active === 2 || active === 3) && (
                      <div>
                        {' '}
                        <Link to={`/modify_post/${post._id}`}>
                          <div className="op">Chỉnh sửa</div>
                        </Link>
                        <div
                          className="op"
                          onClick={() => handleDeletePost(post._id)}
                        >
                          Xóa
                        </div>
                      </div>
                    )}
                    {active === 4 && (
                      <div>
                        <div
                          className="op"
                          onClick={() => {
                            setModelIsOpen(true);
                            setIdExtend(post._id);
                          }}
                        >
                          Gia hạn bài đăng
                        </div>
                        <div
                          className="op"
                          onClick={() => handleDeletePost(post._id)}
                        >
                          Xóa
                        </div>
                      </div>
                    )}
                  </div>
                )}
                <Modal
                  isOpen={modalIsOpden}
                  onRequestClose={() => setModelIsOpen(false)}
                  style={modalStyle}
                  className="modal"
                >
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    style={{
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      justifyContent: 'center',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                    {' '}
                    <label style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                      Thời gian gia hạn
                    </label>
                    {errors.duration && (
                      <p style={{ color: 'red' }}>{errors.duration.message}</p>
                    )}
                    <input
                      style={{
                        width: '50%',
                        height: '3rem',
                        fontSize: '1.2rem',
                      }}
                      name="duration"
                      type="number"
                      placeholder="1 - 100000000000"
                      ref={register({
                        required: 'Bạn cần nhập vào giá tiền',
                        min: {
                          value: 1,
                          message: 'Thời gian hiển thị không hợp lệ',
                        },
                        max: {
                          value: 100000000000,
                          message: 'Thời gian hiển thị không hợp lệ',
                        },
                      })}
                      onChange={handleChangeTime}
                    />
                    <label>
                      <p
                        style={{
                          paddingTop: '2rem',
                          fontSize: '1.2rem',
                          fontWeight: 'bold',
                        }}
                      >
                        Đơn vị
                      </p>
                      {errors.typeOfTime && (
                        <p style={{ color: 'red' }}>
                          {errors.typeOfTime.message}
                        </p>
                      )}
                      <select
                        style={{
                          height: '3rem',
                          fontSize: '1.2rem',
                        }}
                        name="typeOfTime"
                        ref={register({ required: 'Chọn đơn vị' })}
                        onChange={handleChangeTypeOfTime}
                      >
                        <option value="" hidden>
                          Đơn vị
                        </option>
                        <option value="month">Tháng</option>
                        <option value="quarter">Quý</option>
                        <option value="year">Năm</option>
                      </select>
                    </label>
                    <div
                      style={{
                        padding: '2rem 0rem',
                        fontSize: '1.2rem',
                        fontWeight: 'bold',
                      }}
                    >
                      Số tiền phải thanh toán: {price}
                    </div>
                    <button
                      type="submit"
                      style={{
                        border: 'none',
                        padding: '0.5rem 1rem',
                        color: 'white',
                        cursor: 'pointer',
                        backgroundColor: '#b881fc',
                      }}
                    >
                      Gian hạn
                    </button>
                  </form>
                  <i
                    className="fal fa-times"
                    onClick={() => setModelIsOpen(false)}
                  ></i>
                </Modal>
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
