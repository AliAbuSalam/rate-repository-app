import { useState, useEffect } from 'react';
import { useQuery, useLazyQuery } from '@apollo/react-hooks';

import { GET_REPOSITORIES, GET_REPOSITORIES_WITH_ARGUMENTS } from '../graphql/queries';

const useRepositories = () => {
  const { data, loading } = useQuery(GET_REPOSITORIES);
  const [repositoriesSorted, { loading: loadingSorted, data: dataSorted }] = useLazyQuery(GET_REPOSITORIES_WITH_ARGUMENTS);
  const [repositories, setRepositories] = useState();

  useEffect(() => {
    if(dataSorted && !loadingSorted){
      setRepositories(dataSorted.repositories.edges.map(edge => edge.node));
    }
  }, [dataSorted, loadingSorted, setRepositories]);

  useEffect(() => {
    if(data && !loading){
      setRepositories(data.repositories.edges.map(edge => edge.node));
    }
  }, [data, loading, setRepositories]);

  return { repositories, lazyRepositories: repositoriesSorted };
};

export default useRepositories;