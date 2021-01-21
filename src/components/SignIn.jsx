import React from 'react';
import { Formik } from 'formik';
import { View, Button, StyleSheet, TouchableOpacity, Text } from 'react-native';

import FormikTextInput from './FormikTextInput';

const styles = StyleSheet.create({
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    margin: 10,
  },
  textInputContainer: {
    borderColor: 'gray',
    height: 50,
    marginTop: 5,
    marginBottom: 5,
    paddingLeft: 15,
    paddingRight: 15,
    borderLeftWidth: 0.5,
    borderBottomWidth: 0.5,
    borderRightWidth: 0.5,
    borderTopWidth: 0.5,
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
            style={styles.textInputContainer}
        />
        <FormikTextInput
            name='password'
            placeholder='password'
            secureTextEntry
            style={styles.textInputContainer}
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