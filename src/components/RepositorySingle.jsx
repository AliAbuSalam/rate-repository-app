import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-native';
import { useQuery } from '@apollo/react-hooks';

import { GET_SINGLE_REPOSITORY } from '../graphql/queries';
import Text from './Text';
import { RepositoryItemContainer } from './RepositoryItem';

const RepositorySingle = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_SINGLE_REPOSITORY, { variables: { id }});
  const [repository, setRepository] = useState();
  const [reviews, setReviews] = useState();

  useEffect(() => {
    if(!loading && data){
      console.log('Single repository\'s data: ', data);
      const notAllowedKeys = [
        'reviews'
      ];
      const singleRepository = Object.keys(data.repository)
        .filter((key) => !notAllowedKeys.includes(key))
        .reduce((obj, allowedKey) => {
          obj[allowedKey] = data.repository[allowedKey];
          return obj;
        }, {});
      
      const reviewsArray = data.repository.reviews.edges.map(edge => edge.node);
      console.log('reviewsArray: ', reviewsArray);
      setRepository(singleRepository);
      setReviews(reviewsArray);
    }
  }, [loading, data]);
  
  if(repository){
    return(
      <RepositoryItemContainer item={repository} singleView={true} />    
    );
  } else if(!repository && error){
    return(
      <Text>error</Text>
    );
  } else {
    return(
      <Text>loading</Text>
    );
  }
  
};

export default RepositorySingle;