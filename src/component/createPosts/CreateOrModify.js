import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ModifyPost from './ModifyPost';

function CreateOrModify() {
  const { id } = useParams();
  console.log(id);
  const [post, setPost] = useState({});

  useEffect(() => {
    const getPost = async () => {
      await axios
        .get(`http://localhost:3001/post/${id}`)
        .then(res => {
            console.log(res);
          setPost(res.data.post);
        })
        .catch(err => console.log(err));
    };

    getPost();
  }, []);
  return (
    <div>
      <ModifyPost post={post}/>
    </div>
  );
}

export default CreateOrModify;
