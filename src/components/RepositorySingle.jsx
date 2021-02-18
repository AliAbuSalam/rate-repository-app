import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-native';
import { useQuery } from '@apollo/react-hooks';
import { FlatList, View, StyleSheet } from 'react-native';

import { GET_SINGLE_REPOSITORY } from '../graphql/queries';
import Text from './Text';
import Theme from '../theme';
import { RepositoryItemContainer } from './RepositoryItem';
import ReviewItem from './ReviewItem';

const styles = StyleSheet.create({
  separator: Theme.separator
});

const RepositorySingle = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_SINGLE_REPOSITORY, { 
    variables: { id },
    fetchPolicy: 'cache-and-network'
  });
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
      <FlatList 
        data={reviews}
        renderItem={ReviewItem}
        keyExtractor={item => item.id}
        ListHeaderComponent={() => <RepositoryItemContainer item={repository} singleView={true}/>}
        ItemSeparatorComponent={ItemSeparator}
      />
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

const ItemSeparator = () => <View style={styles.separator}/>;

export default RepositorySingle;