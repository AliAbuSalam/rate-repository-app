import { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';

import { GET_REPOSITORIES_WITH_ARGUMENTS } from '../graphql/queries';

const useRepositories = (variables) => {
  const [fetchRepositories, { data, loading, fetchMore }] = useLazyQuery(GET_REPOSITORIES_WITH_ARGUMENTS, { 
    variables,
    fetchPolicy: 'cache-and-network'
  });
  const [repositories, setRepositories] = useState();
  const variablesArray = [
    {
      label: 'Latest Repositories',
      value: {
        orderBy: 'CREATED_AT',
        orderDirection: 'DESC',
      }
    },
    {
      label: 'Highest Rated Repositories',
      value: {
        orderBy: 'RATING_AVERAGE',
        orderDirection: 'DESC',
      }
    }, 
    {
      label: 'Lowest Rated Repositories',
      value: {
        orderBy: 'RATING_AVERAGE',
        orderDirection: 'ASC',
      }
    }
  ];
  const [variableInUse, setVariableInUse] = useState(variablesArray[0]);
  const [searchbar, setSearchbar] = useState('');
  const [isRepoFromFetchMore, setIsRepoFromFetchMore] = useState('false');

  const handleFetchMore = async () => {
    const canFetchMore = !loading && data && data.repositories.pageInfo.hasNextPage;
    if(!canFetchMore){
      return;
    }
    console.log('handleFetchMore called');
    setIsRepoFromFetchMore('in preparation');
    await fetchMore({
      query: GET_REPOSITORIES_WITH_ARGUMENTS,
      variables: {
        after: data.repositories.pageInfo.endCursor,
        searchKeyword: searchbar,
        ...variables,
        ...variableInUse.value,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const nextResult = {
          repositories: {
            ...fetchMoreResult.repositories
          },
          edges: [
            ...previousResult.repositories.edges,
            ...fetchMoreResult.repositories.edges
          ],
        };
        return nextResult;
      }
    });
    setIsRepoFromFetchMore('true');
  };

  const lazyRepositories = (label) => {
    const chosenVariable = label? variablesArray.find(variable => variable.label === label) : variableInUse;
    const variablesToSend = {
      searchKeyword: searchbar,
      ...chosenVariable.value
    };
    setVariableInUse(chosenVariable);
    fetchRepositories({ variables: variablesToSend});
  };

  useEffect(() => {
    if(data && !loading && isRepoFromFetchMore === 'false'){
      setRepositories(data.repositories.edges.map(edge => edge.node));
    }
  }, [data, loading]);

  useEffect(() => {
    if(data && !loading && isRepoFromFetchMore === 'true'){
      setRepositories([...repositories, ...data.repositories.edges.map(edge => edge.node)]);
      setIsRepoFromFetchMore('false');
    }
  }, [isRepoFromFetchMore]);

  return {
    repositories,
    lazyRepositories,
    searchBarObject: {
      searchbar, setSearchbar
    },
    fetchMore: handleFetchMore
  };
};

export default useRepositories;