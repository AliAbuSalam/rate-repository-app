import React from 'react';
import { StyleSheet, View } from 'react-native';
import { format } from 'date-fns';

import Theme from '../theme';
import Text from './Text';

const styles = StyleSheet.create({
  reviewContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  ratingContainer: {
    borderStyle: 'solid',
    borderColor: Theme.colors.primary,
    borderWidth: 2,
    width: 40,
    height: 40,
    borderRadius: 40/2,
    paddingLeft: 10,
    paddingTop: 8,
    margin: 10
  },
  ratingContainerAlternative: {
    paddingLeft: 5
  },
  reviewDetailsContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 10
  },
  reviewText: {
    marginRight: 70,
    marginTop: 5,
    marginBottom: 5
  },
});


const ReviewItem = ({ item }) => {
  console.log('item: ', item);

  return(
    <View style={styles.reviewContainer}>
      <RatingDetails rating={item.rating}/>
      <ReviewDetails name={item.user.username} reviewText={item.text} createdAt={item.createdAt}/>
    </View>
  );
};

const RatingDetails = ({ rating }) => {
  return(
    <View style={[styles.ratingContainer, rating>=99 && styles.ratingContainerAlternative]}>
      <Text
        color='primary'
      >
        {rating}
      </Text>
      </View>
  );
};

const ReviewDetails = ({ name, reviewText, createdAt }) => {

  const parsedDate = format(new Date(createdAt), 'dd.MM.yyyy');
  return(
    <View style={styles.reviewDetailsContainer}>
      <Text fontWeight='bold'>
        {name}
      </Text>
      <Text color='textSecondary'>
        {parsedDate}
      </Text>
      <Text style={styles.reviewText}>
        {reviewText}
      </Text>
    </View>
  );
};



export default ReviewItem;