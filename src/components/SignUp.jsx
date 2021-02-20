import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import { useMutation } from '@apollo/react-hooks';
import { useHistory } from 'react-router-native';
import * as yup from 'yup';

import FormikTextInput from './FormikTextInput';
import Button from './Button';
import { SIGN_UP } from '../graphql/queries';
import useSignIn from '../hooks/useSignIn';

const styles = StyleSheet.create({
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    margin: 10
  }
});

const initialValues = {
  username: '',
  password: '',
  passwordConfirmation: ''
};

const validationSchema = yup.object().shape({
  username: yup.string().required().max(30),
  password: yup.string().required().min(5).max(30),
  passwordConfirmation: yup.string().oneOf([yup.ref('password')], 'Password confirmation must be the same as password').required('Password confirmation must be the same as password')
});

const SignUp = () => {
  const [signUpQuery] = useMutation(SIGN_UP);
  const [signInQuery] = useSignIn();
  const history = useHistory();

  const handleSignUp = async (values) => {
    try {
      console.log('values: ', values);
      await signUpQuery({ variables: {
        username: values.username,
        password: values.password
      }});
      const signInQueryResult = await signInQuery({
        username: values.username,
        password: values.password
      });
      console.log('signinQueryResult: ', signInQueryResult);
      history.push('/');
    } catch(error) {
      console.log('error: ', error);
    }
    
  };
  return(
    <Formik
      initialValues={initialValues}
      onSubmit={handleSignUp}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignUpInput handleSubmit={handleSubmit}/>}
    </Formik>
  );
};

const SignUpInput = ({ handleSubmit }) => {
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
      <FormikTextInput 
        name='passwordConfirmation'
        placeholder='Password confirmation'
        secureTextEntry
      />
      <Button text='Sign up' onPress={handleSubmit} />
    </View>
  );
};

export default SignUp;