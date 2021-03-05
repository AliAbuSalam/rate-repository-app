import { useState, useEffect } from 'react';
import { useQuery, useLazyQuery } from '@apollo/react-hooks';

import { GET_REPOSITORIES, GET_REPOSITORIES_WITH_ARGUMENTS } from '../graphql/queries';

const useRepositories = (variables) => {
  const { data, loading, fetchMore, ...result } = useQuery(GET_REPOSITORIES, { variables });
  const [repositoriesSorted, { loading: loadingSorted, data: dataSorted, fetchMore: lazyFetchMore }] = useLazyQuery(GET_REPOSITORIES_WITH_ARGUMENTS);
  const [repositories, setRepositories] = useState();
  const [isDataFromFetchMore, setIsDataFromFetchMore] = useState(false);
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
  const [variableState, setVariableState] = useState(variablesArray[0]);
  const [searchBarValue, setSearchBarValue] = useState('');

  useEffect(() => {
    if(dataSorted && !loadingSorted){
      setRepositories(dataSorted.repositories.edges.map(edge => edge.node));
    }
  }, [dataSorted, loadingSorted, setRepositories]);

  useEffect(() => {
    if(data && !loading && !isDataFromFetchMore){
      setRepositories(data.repositories.edges.map(edge => edge.node));
    } else if(data && !loading && isDataFromFetchMore){
      const mergedData = [
        ...repositories,
        ...(data.repositories.edges.map(edge => edge.node))
      ];
      setRepositories(mergedData);
      setIsDataFromFetchMore(false);
    }
  }, [data, loading, setRepositories]);

  const lazyRepositories = async (variables) => {
    console.log('useRepositories.lazyRepositories called');
    console.log('variables: ', variables);
    const chosenVariable = variablesArray.find(variable => variable.label === variables);
    console.log('chosenVariable: ', chosenVariable);
    const variablesToSend = {
      searchKeyword: searchBarValue,
      ...chosenVariable.value
    };
    delete variablesToSend.label;
    console.log('variablesToSend: ', variablesToSend);
    setVariableState(chosenVariable);
    repositoriesSorted({ variables: variablesToSend });
    setIsDataFromFetchMore(false);
  };

  const handleFetchMore = () => {
    const canFetchMore = !loading && data && data.repositories.pageInfo.hasNextPage;
    if(!canFetchMore){
      return;
    }
    console.log('calling handleFetchMore');
    fetchMore({
      query: GET_REPOSITORIES,
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables
      },
      updateQuery: (previousResult, { fetchMoreResult }) => { // I don't know why, but i can't find where update query put the resulting variable
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
    setIsDataFromFetchMore(true);
  };

  const filterRepositories = () => {
    lazyRepositories(variableState.label);
  };

  return { 
    repositories, 
    fetchMore: handleFetchMore, 
    lazyRepositories,
    searchBarObject: {
      searchQuery: searchBarValue,
      setSearchBarValue,
      filterRepositories
    },
    ...result
  };
};

export default useRepositories;