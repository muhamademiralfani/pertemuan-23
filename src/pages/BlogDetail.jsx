/* eslint-disable no-unused-vars */
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import parse from 'html-react-parser';
import useFetch from '../hooks/useFetch';

const BlogDetail = () => {
  const { id } = useParams();
  const { isLoading, serverError, postData } = useFetch(`posts/${id}`);
  const Navigate = useNavigate();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (serverError) {
    return <p>Error: {serverError.message}</p>;
  }

  if (!postData) {
    return <p>No Data Available</p>;
  }

  return (
    <div className='container my-5'>
      <button className='btn btn-outline-secondary mb-4' onClick={() => Navigate(-1)}>
        <i className='bi bi-arrow-left'></i> Back
      </button>
      <div className='card shadow-sm p-4'>
        <img src={postData.img} alt='Blog' className='card-img-top' />
        <h1 className='card-title text-center'>{postData.title}</h1>
        <p className='card-text text-muted text-center'>{postData.desc}</p>
        <hr />
        <div className='card-body'>{parse(postData.content)}</div>
      </div>
    </div>
  );
};

export default BlogDetail;
