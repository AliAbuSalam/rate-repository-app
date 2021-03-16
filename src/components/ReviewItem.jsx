import React from 'react';
import { useMutation } from '@apollo/client';
import { StyleSheet, View, TouchableOpacity, Alert } from 'react-native';
import { useHistory } from 'react-router-native';
import { format } from 'date-fns';

import Theme from '../theme';
import Text from './Text';
import { DELETE_REVIEW } from '../graphql/queries';

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
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  itemContainer: {
    display: 'flex',
    flexDirection: 'column'
  },
  button: {
    padding: 10,
    paddingRight: 25,
    paddingLeft: 25,
    paddingTop: 13,
    marginRight: 15,
    marginLeft: 15,
    marginBottom: 10,
    marginTop: 10,
    width: 180,
    height: 50,
    borderRadius: 5,
    alignItems: 'center'
  },
  buttonView: {
    backgroundColor: Theme.colors.primary
  },
  buttonDelete: {
    backgroundColor: Theme.colors.buttonRed
  },
  buttonText: {
    color: Theme.colors.textWhite,
    fontSize: Theme.fontSizes.button
  }
});


const ReviewItem = ({ item, refetch }) => {
  return(
    <View style={styles.itemContainer}>
      <View style={styles.reviewContainer}>
        <RatingDetails rating={item.rating}/>
        <ReviewDetails name={item.repository? item.repository.name: item.user.username} reviewText={item.text} createdAt={item.createdAt}/>
      </View>
      {item.repository? <ButtonComponents repoId={item.repository.id} refetch={refetch} id={item.id}/>: <></>}
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

const ButtonComponents = ({ repoId, refetch, id }) => {
  const [deleteReview, ] = useMutation(DELETE_REVIEW, {
    variables: {
      id
    }
  });
  const history = useHistory();

  const handleViewPress = () => {
    history.push(`/repository/${repoId}`);
  };

  const handleDeletePress = () => {
    Alert.alert(
      'Delete review',
      'Are you sure you want to delete this review?',
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel'
        },
        {
          text: 'Delete',
          onPress: () => {
            deleteReview().then(
              refetch()
            );
          },
        }
      ],
      { cancelable: false }
    );
  };

  return(
    <View style={styles.buttonContainer}>
      <TouchableOpacity 
        style={[styles.button, styles.buttonView]}
        onPress={handleViewPress}
      >
        <Text style={styles.buttonText}>
          View Repository
        </Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={[styles.button, styles.buttonDelete]}
        onPress={handleDeletePress}
      >
        <Text style={styles.buttonText}>
          Delete Review
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ReviewItem;