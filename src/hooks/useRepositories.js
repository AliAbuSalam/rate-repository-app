import { useState, useEffect } from 'react';

const useRepositories = () => {
  const [repositories, setRepositories] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchRepositories = async () => {
    try{
      setLoading(true);
      const response = await fetch('http://192.168.100.52:5000/api/repositories');
      const json = await response.json();

      console.log(json);

      setLoading(false);
      setRepositories(json);
    } catch(error) {
      setError(true);
      setLoading(false);
      console.log('fetching data failed: ', error);
    }
    
  };

  useEffect(() => {
    fetchRepositories();
  }, []);

  return { repositories, loading, refetch: fetchRepositories, error };
};

export default useRepositories;