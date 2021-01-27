import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';

import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = () => {
  const { data, loading, error } = useQuery(GET_REPOSITORIES);
  const [repositories, setRepositories] = useState();

  useEffect(() => {
    if(data && !loading){
      setRepositories(data.repositories.edges.map(edge => edge.node));
    }
  }, [data, loading, setRepositories]);


  return { repositories, loading, error };
};

export default useRepositories;