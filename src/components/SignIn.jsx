import React from 'react';
import { Formik } from 'formik';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useHistory } from 'react-router-native';
import * as yup from 'yup';

import FormikTextInput from './FormikTextInput';
import useSignIn from '../hooks/useSignIn';

const styles = StyleSheet.create({
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    margin: 10,
  },
  opacityContainer: {
    alignItems: 'center',
    backgroundColor: '#0269FE',
    marginTop: 5,
  },
  text: {
    fontSize: 16,
    color: '#FFFFFF',
    margin: 10
  }
});

const initialValues = {
  username: '',
  password: '',
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required'),
  password: yup
    .string()
    .required('Password is required'),
});


const SignIn = () => {
  const [signIn] = useSignIn();
  const history = useHistory();

  const handleSignIn = async (values) => {
    const { username, password } = values;
    
    try {
      const result = await signIn({
        username,
        password
      });
      console.log('result: ', result);
      history.push('/');
    } catch (error) {
      console.log('error: ', error);
    }
  };

  return(
    <SignInContainer handleSignIn={handleSignIn}/>
  );
};

export const SignInContainer = ({ handleSignIn}) => {
  return(
    <View>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSignIn}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit}/>}
      </Formik>
    </View>
  );
};

const SignInForm = ({ onSubmit }) => {
  return(
    <View style={styles.formContainer}>
        <FormikTextInput
            name='username'
            placeholder='username'
        />
        <FormikTextInput
            name='password'
            placeholder='password'
            secureTextEntry
        />
      <View>
        <TouchableOpacity
          onPress={onSubmit}
          style={styles.opacityContainer}
          testID='signInButton'
        >
          <Text style={styles.text}>Sign in</Text>
        </TouchableOpacity>
      </View>
        
    </View>
  );
};

export default SignIn;