import React, { useEffect, useState } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { useQuery } from '@apollo/react-hooks';

import { CHECK_AUTHORIZED_USER } from '../graphql/queries';
import Text from './Text';
import ReviewItem from './ReviewItem';
import Theme from '../theme';

const styles = StyleSheet.create({
  itemSeparator: Theme.separator
});

const ItemSeparator = () => <View style={styles.itemSeparator}/>;

const MyReviews = () => {
  const { data, loading, error, refetch } = useQuery(CHECK_AUTHORIZED_USER, { variables: {
    getReview: true,
    myReview: true
  }});
  const [reviews, setReviews] = useState();

  useEffect(() => {
    if(data && !loading){
      console.log('data: ', data);
      setReviews(data.authorizedUser.reviews.edges.map(edge => edge.node));
    }
  }, [data, loading]);

  if(error){
    return(
      <Text>Error</Text>
    );
  } else if(reviews){
    return(
      <FlatList 
        data={reviews}
        renderItem={({ item }) => <ReviewItem item={item} refetch={refetch}/>}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={ItemSeparator}
      />
    );
  } else {
    return(
      <Text>Loading...</Text>
    );
  }
};

export default MyReviews;