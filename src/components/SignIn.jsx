import React from 'react';
import { Formik } from 'formik';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import * as yup from 'yup';

import FormikTextInput from './FormikTextInput';

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

const handleSignIn = values => {
  console.log('username: ', values.username);
  console.log('password: ', values.password);
};

const SignIn = () => {
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
        >
          <Text style={styles.text}>Sign in</Text>
        </TouchableOpacity>
      </View>
        
    </View>
  );
};

export default SignIn;