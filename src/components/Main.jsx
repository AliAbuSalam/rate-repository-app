import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Route, Switch, Redirect } from 'react-router-native';
import RNPickerSelect from '@react-native-picker/picker';

import RepositoryList from './RepositoryList';
import RepositorySingle from './RepositorySingle';
import ApplicationBar from './AppBar';
import SignIn from './SignIn';
import AuthStorageContext from '../contexts/AuthStorageContext';
import ReviewForm from './ReviewForm';
import SignUp from './SignUp';

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
        <Route path='/signup' exact>
          <AppBar />
          <SignUp />
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
          <RNPickerSelect 
            onValueChange={(value) => console.log('change value to: ', value)}
            items={[
              { label: 'Latest repository', value: 'latest'},
              { label: 'Highest rated repository', value: 'highest'},
              { label: 'Lowest rated repository', value: 'lowest'}
            ]}
          />
          <RepositoryList />
        </Route>
        
        <Redirect to='/' />
      </Switch>
    </View>
  );
}; 

export default Main;