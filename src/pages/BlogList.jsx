/* eslint-disable no-unused-vars */
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import React, { useEffect, useState } from 'react';

const BlogList = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const initialPage = queryParams.get('page') || 1;

  const [posts, setPosts] = useState([]);
  const [pagination, setPagination] = useState({});
  const [currentPage, setCurrentPage] = useState(initialPage);

  const { isLoading, serverError, postData } = useFetch(`posts?_page=${initialPage}&_per_page=5`);

  useEffect(() => {
    if (postData) {
      setPosts(postData.data);
      setPagination({
        prev: postData.prev,
        next: postData.next,
      });
    }
  }, [postData]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
    navigate(`?page=${currentPage + 1}`);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
    navigate(`?page=${currentPage - 1}`);
  };

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (serverError) {
    return <h2>Error: {serverError.message}</h2>;
  }

  return (
    <div className='container my-5'>
      <h1 className='text-center mb-4'>Blog Posts</h1>
      <section className='row'>
        {posts.map((post) => (
          <div className='col-md-6 col-lg-4 mb-4' key={post.id}>
            <Link to={`/post/${post.id}`} className='text-decoration-none'>
              <div className='card h-100 shadow-sm'>
                <img src={post.img} className='card-img-top img-cstm' alt={post.title} />
                <div className='card-body'>
                  <h5 className='card-title'>{post.title}</h5>
                  <p className='card-text text-muted'>{post.desc}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </section>
      <div className='d-flex justify-content-center mt-4'>
        <button className='btn btn-outline-primary me-2' disabled={!pagination.prev} onClick={handlePrevPage}>
          <i className='bi bi-arrow-left'></i> Previous
        </button>
        <button className='btn btn-outline-primary' disabled={!pagination.next} onClick={handleNextPage}>
          Next <i className='bi bi-arrow-right'></i>
        </button>
      </div>
    </div>
  );
};

export default BlogList;
