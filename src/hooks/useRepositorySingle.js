import { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';

import { GET_SINGLE_REPOSITORY } from '../graphql/queries';

const useRepositorySingle = (variables) => {
  const [getRepository, { data, loading, error, fetchMore }] = useLazyQuery(GET_SINGLE_REPOSITORY, {
    variables: {
      id: variables.id,
      first: variables.first
    },
    fetchPolicy: 'cache-and-network'
  });
  const [repository, setRepository] = useState();
  const [reviews, setReviews] = useState();
  const [pageInfo, setPageInfo] = useState();
  const [isInitialRepoFetched, setIsInitialRepoFetched] = useState(false);

  useEffect(() => {
    getRepository();
  }, []);

  useEffect(() => {
    if(data && !loading && !isInitialRepoFetched){
      const notAllowed = ['reviews'];
      const filteredRepo = Object.keys(data.repository)
        .filter(key => !key.includes(notAllowed))
        .reduce((obj, allowedKey) => {
          obj[allowedKey] = data.repository[allowedKey];
          return obj;
      }, {});
      
      const reviewsArray = data.repository.reviews.edges.map(edge => edge.node);
      const pageInfo = data.repository.reviews.pageInfo;
      setRepository(filteredRepo);
      setReviews(reviewsArray);
      setPageInfo(pageInfo);
      setIsInitialRepoFetched(true);
    }
  }, [data, loading]);

  const handleFetchMore = async () => {
    console.log('1');
    const canFetchMore = pageInfo.hasNextPage;
    if(!canFetchMore){
      return;
    }

    console.log('2');
    await fetchMore({
      query: GET_SINGLE_REPOSITORY,
      variables: {
        id: variables.id,
        first: variables.first,
        after: pageInfo.endCursor
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const mergedData = [...reviews, ...fetchMoreResult.repository.reviews.edges.map(edge => edge.node)];
        const newPageInfo = fetchMoreResult.repository.reviews.pageInfo;
        console.log();
        setReviews(mergedData);
        setPageInfo(newPageInfo);
      }
    });
    console.log('3');
  };

  return({
    repository,
    error,
    reviews,
    fetchMore: handleFetchMore
  });
};

export default useRepositorySingle;