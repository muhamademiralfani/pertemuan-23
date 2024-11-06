import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetch = (url) => {
  const [postData, setpostData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [serverError, setServerError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`http://localhost:3000/${url}`);
        setpostData(response.data);
        setIsLoading(false);
      } catch (error) {
        setServerError(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { postData, isLoading, serverError };
};

export default useFetch;
