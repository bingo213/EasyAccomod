import React, { useEffect, useState } from 'react';
import 'assets/css/accountPage.css';
import Post from './Post';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import authHeader from '../../helper/auth-header'

function AccountPage() {
  const [postList, setPostList] = useState([]);

  const logOut = async () =>{
    await axios.get('http://localhost:3001/users/logout')
    .then(response => {
      if(response.data.success){
        localStorage.removeItem('user');
        window.location.reload();
      }
    })
    .catch(err=>console.log(err))
  }
  
  const history = useHistory()

  useEffect(() => {
    if(localStorage.getItem('user') === null){
      history.push("/login") 
    }
    else if(JSON.parse(localStorage.getItem('user')).role === 'rental'){
      history.push("/404")
    }
  }, [])

  const user = JSON.parse(localStorage.getItem('user'));
    let expirePost = [];
    let watingPost = [];
    let rejectPost = [];
    let activePost = [];
  useEffect(() =>{
    if(user){
      const getExpirePost = async () =>{
        await axios.get(`http://localhost:3001/owner/${user.userId}/expirePost`,{headers: authHeader()})
        .then((res) => {
          if(res.statusCode === 200){
            expirePost = (res.data.posts) ;
            console.log(res.data.posts)
          }
        })
      }
      const getWaitingPost = async () =>{
        console.log(postList);
        await axios.get(`http://localhost:3001/owner/${user.userId}/waitingPost`,{headers: authHeader()})
        .then((res) => {
          if(res.statusCode === 200){
            watingPost = (res.data.posts) ;
            console.log(res.data.posts)
            console.log(postList);
          }
        })
      }
      const getRejectPost = async () =>{
        await axios.get(`http://localhost:3001/owner/${user.userId}/rejectPost`,{headers: authHeader()})
        .then((res) => {
          if(res.statusCode === 200){
            rejectPost = (res.data.posts) ;
            console.log(res.data.posts)
          }
        })
      }
      const getActivePost = async () =>{
        await axios.get(`http://localhost:3001/owner/${user.userId}/activePost`,{headers: authHeader()})
        .then((res) => {
          if(res.data.success){
           activePost = (res.data.posts) ;
            // console.log(res.data.posts)
          } 
        })
      }
    
      getActivePost();
      getExpirePost();
      getRejectPost();
      getWaitingPost();
    }
    
  }, [postList])

  return (
      <div className="AccountPage">
        <div className="AccountNav">
          <div className="icon" tabIndex="0">
            <i className="far fa-bars"></i>
            <i className="fal fa-times"></i>
          </div>
          <ul className="navContent" tabIndex="0">
            <Link to='/'><li>Home</li></Link>
            <li onClick={() => setPostList(activePost)}>Bài đăng đã duyệt</li>
            <li onClick={() => setPostList(watingPost)}>Bài đăng chờ duyệt</li>
            <li onClick={() => setPostList(rejectPost)}>Bài đăng bị từ chối</li>
            <li onClick={() => setPostList(expirePost)}>Bài đăng hết hạn</li>
            <li onClick={logOut}>Đăng xuất</li>
          </ul>
        </div>
        <div className="content">
          {
            postList.length!==0 ? postList.map(post => <Post key={post.id} 
                                  id={post.id}
                                  image={post.images[0].name}
                                  title={post.title} 
                                  price={post.price}
                                  address={`Số nhà ${post.address.houseNumber}, đường ${post.address.street}, phường ${post.address.village}, quận ${post.address.district}, ${post.address.province}`}
                                  createDate={post.createdAt}
                                  />) : <h2>Không có bài đăng nào để hiển thị</h2>
          }
        </div>
      </div>
  );
}

export default AccountPage;
