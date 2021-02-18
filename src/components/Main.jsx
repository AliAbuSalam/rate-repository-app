import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Route, Switch, Redirect } from 'react-router-native';

import RepositoryList from './RepositoryList';
import RepositorySingle from './RepositorySingle';
import ApplicationBar from './AppBar';
import SignIn from './SignIn';
import AuthStorageContext from '../contexts/AuthStorageContext';
import ReviewForm from './ReviewForm';

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
    }
    checkUserLoggedIn();
  }, [userLoggedIn]);

  const AppBar = () => <ApplicationBar userLoggedIn={userLoggedIn} setUserLoggedIn={setUserLoggedIn}/>;

  return(
    <View style={styles.container}>
      <Switch>
        <Route path='/login' exact>
          <AppBar />
          <SignIn setUserLoggedIn={setUserLoggedIn} />
        </Route>
        <Route path='/repository/:id' exact>
          <AppBar />
          <RepositorySingle />
        </Route>
        <Route path='/review' exact>
          <AppBar />
          <ReviewForm />
        </Route>
        <Route path='/' exact>
          <AppBar />
          <RepositoryList />
        </Route>
        
        <Redirect to='/' />
      </Switch>
    </View>
  );
}; 

export default Main;