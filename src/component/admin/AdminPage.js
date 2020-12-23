import React, { useEffect, useState } from 'react';
import NavBar from 'component/NavBar';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import ApprovalOwner from './ApprovalOwner';
import authHeader from 'helper/auth-header';
import WaitingPost from './WaitingPost';
import WaitingComment from './WaitingComment';
import ListReport from './ListReport';

function AdminPage() {

  const history = useHistory();
  const [type, setType] = useState(1);

  const [loading, setLoading] = useState(true);
  const [listWaitingOwner, setListWaitingOwner] = useState([]);

  const [loadPost, setLoadPost] = useState(true);
  const [listWaitingPost, setWaitingPost] = useState([]);

  const [loadComment, setLoadComment] = useState(true);
  const [listWaitingComment, setWaitingComment] = useState([]);

  const [loadReport, setLoadReport] = useState(true);
  const [listReport, setListReport] = useState([]);

  const user = JSON.parse(localStorage.getItem('user'));
  const [isLogin, setIsLogin] = useState(() => {
    if (localStorage.getItem('user')) return true;
    else return false;
  });

  if(!isLogin || (isLogin && user.role !== 'admin')){
    history.push("/404")
  }

  useEffect(() => {
    setLoading(true);
    const getWaitingOwner = async () => {
      await axios
        .get('http://localhost:3001/admin/getWaitingOwner', {
          headers: authHeader(),
        })
        .then(res => {
          if (res.data.success) {
            setListWaitingOwner(res.data.owners);
          }
          setLoading(false);
        });
    };

    getWaitingOwner();
  }, []);

  useEffect(() => {
    setLoadPost(true);
    const getWaitingPost = async () => {
      await axios
        .get('http://localhost:3001/admin/getWaitingPost', {
          headers: authHeader(),
        })
        .then(res => {
          if (res.data.success) {
            setWaitingPost(res.data.posts);
          }
          setLoadPost(false);
        });
    };

    getWaitingPost();
  }, []);

  useEffect(() => {
    setLoadComment(true);
    const getWaitingComment = async () => {
      await axios
        .get('http://localhost:3001/admin/getWaitingComment', {
          headers: authHeader(),
        })
        .then(res => {
          if (res.data.success) {
            setWaitingComment(res.data.comments);
          }
          setLoadComment(false);
        });
    };

    getWaitingComment();
  }, []);

  useEffect(() => {
    setLoadReport(true);
    const getReport = async () => {
      await axios
        .get('http://localhost:3001/report', {
          headers: authHeader(),
        })
        .then(res => {
          if (res.data.success) {
            setListReport(res.data.reports);
          }
          setLoadReport(false);
        });
    };

    getReport();
  }, []);

  // console.log(listWatiingOwner);

  return (
    <div className="ProfilePage">
      <NavBar />
      <div className="postPageNav"></div>
      <div className="PostPage">
        <div className="navigation">
          <div className="navContent">
            <div
              className={
                type === 1 ? 'navigationButton activeNav' : 'navigationButton'
              }
              onClick={() => {
                setType(1);
              }}
            >
              <i className="far fa-user-check"></i>
              <div className="tag">Chủ trọ cần duyệt</div>
            </div>
            <div
              className={
                type === 2 ? 'navigationButton activeNav' : 'navigationButton'
              }
              onClick={() => setType(2)}
            >
              <i className="far fa-clipboard-list-check"></i>
              <div className="tag">Bài đăng cần duyệt</div>
            </div>
            <div
              className={
                type === 3 ? 'navigationButton activeNav' : 'navigationButton'
              }
              onClick={() => setType(3)}
            >
              <i className="far fa-comment-alt-check"></i>
              <div className="tag">Bình luận cần duyệt</div>
            </div>{' '}
            <div
              className={
                type === 4 ? 'navigationButton activeNav' : 'navigationButton'
              }
              onClick={() => setType(4)}
            >
              <i className="far fa-flag-checkered"></i>
              <div className="tag">Các phản hồi</div>
            </div>
          </div>
        </div>

        <div className="postPageContent">
          {listWaitingOwner.length > 0 && type === 1 && (
            <ApprovalOwner listItem={listWaitingOwner} loading={loading} />
          )}
          {listWaitingPost.length > 0 && type === 2 && (
            <WaitingPost listItem={listWaitingPost} loading={loadPost} />
          )}
          {listWaitingComment.length > 0 && type === 3 && (
            <WaitingComment
              listItem={listWaitingComment}
              loading={loadComment}
            />
          )}
          {listReport.length > 0 && type === 4 && (
            <ListReport
              listItem={listReport}
              loading={loadReport}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
