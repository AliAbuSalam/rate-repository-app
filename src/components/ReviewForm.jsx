import React, { useEffect } from 'react';
import { Formik } from 'formik';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import * as yup from 'yup';
import { useMutation } from '@apollo/react-hooks';
import { useHistory } from 'react-router-native';

import FormikTextInput from './FormikTextInput';
import Text from './Text';
import Theme from '../theme';
import { ADD_REVIEW } from '../graphql/queries';

const styles = StyleSheet.create({
  reviewTextInputContainer: {
    display: 'flex',
    flexDirection: 'column',
    margin: 10
  },
  opacityContainer: {
    alignItems: 'center',
    backgroundColor: Theme.colors.buttonBackground,
    marginTop: 5,
    padding: 10,
  },
  text: {
    fontSize: Theme.fontSizes.button,
    color: Theme.colors.appBarText
  }
});

const initialValues = {
  ownerName: '',
  repositoryName: '',
  rating: '',
  review: ''
};

const validationSchema = yup.object().shape({
  ownerName: yup.string().required(),
  repositoryName: yup.string().required(),
  rating: yup.number().min(0).max(100).required(),
  review: yup.string()
});



const ReviewForm = () => {
  const [addReview, { data, error }] = useMutation(ADD_REVIEW);
  const history = useHistory();

  useEffect(() => {
    if(data && !error){
      const repositoryId = data.createReview.repositoryId;
      history.push(`/repository/${repositoryId}`);
    }
  }, [data, error]);

  const handleSubmit = async ({ repositoryName, ownerName, rating, review}) => {
    try {
      await addReview({ variables: {
        repositoryName,
        ownerName,
        rating: Number.parseInt(rating),
        review
      }});
      history.push('/');
    } catch(error) {
      console.log('error: ', error);
    }
  };

  return(
    <View>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit }) => {
          return <ReviewTextInput handleSubmit={handleSubmit}/>;
        }}
      </Formik>
    </View>
  );
};

const ReviewTextInput = ({ handleSubmit }) => {
  return(
    <View style={styles.reviewTextInputContainer}>
      <FormikTextInput 
        name='ownerName'
        placeholder='Repository owner name'
      />
      <FormikTextInput 
        name='repositoryName'
        placeholder='Repository name'
      />
      <FormikTextInput 
        name='rating'
        placeholder='Rating between 0 and 100'
      />
      <FormikTextInput 
        name='review'
        placeholder='Review'
      />
      <TouchableOpacity onPress={handleSubmit} style={styles.opacityContainer}>
        <Text style={styles.text} >Create a review</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ReviewForm;