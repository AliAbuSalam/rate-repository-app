import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Route, Switch, Redirect } from 'react-router-native';

import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import SignIn from './SignIn';
import AuthStorageContext from '../contexts/AuthStorageContext';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
  const [userLoggedIn, setUserLoggedIn] = useState(null);
  const authStorage = useContext(AuthStorageContext);

  useEffect(() => {
    async function checkUserLoggedIn(){
      const token = await authStorage.getAccessToken();
      if(token){
        setUserLoggedIn(token);
      }
      console.log('useEffect in main token: ', token);
    }
    checkUserLoggedIn();
  }, [userLoggedIn]);

  return(
    <View style={styles.container}>
      <AppBar userLoggedIn={userLoggedIn} setUserLoggedIn={setUserLoggedIn}/>
      <Switch>
        <Route path='/login' exact>
          <SignIn setUserLoggedIn={setUserLoggedIn} />
        </Route>
        <Route path='/' exact>
          <RepositoryList />
        </Route>
        
        <Redirect to='/' />
      </Switch>
    </View>
  );
};

export default Main;