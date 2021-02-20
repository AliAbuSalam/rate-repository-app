import React from 'react';
import { Formik } from 'formik';
import { View, StyleSheet } from 'react-native';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup';

import FormikTextInput from './FormikTextInput';
import useSignIn from '../hooks/useSignIn';
import Theme from '../theme';
import Button from './Button';

const styles = StyleSheet.create({
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    margin: 10,
  },
  opacityContainer: {
    alignItems: 'center',
    backgroundColor: Theme.colors.buttonBackground,
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
            placeholder='Username'
        />
        <FormikTextInput
            name='password'
            placeholder='Password'
            secureTextEntry
        />
      <View>
        <Button 
          text='Sign in'
          onPress={onSubmit}
        />
      </View>
        
    </View>
  );
};

export default SignIn;