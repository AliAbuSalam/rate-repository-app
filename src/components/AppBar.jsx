import React, { useState, useContext, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import { Link, useHistory } from 'react-router-native';
import { useQuery } from '@apollo/react-hooks';

import theme from '../theme';
import { CHECK_AUTHORIZED_USER } from '../graphql/queries';
import AuthStorageContext from '../contexts/AuthStorageContext';
import { useApolloClient } from '@apollo/react-hooks';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBackground,
    paddingBottom: 20
  },
  text: {
    paddingLeft: 10,
    color: theme.colors.appBarText,
    fontSize: theme.fontSizes.subheading,
  },
});

const AppBar = () => {
  const { data } = useQuery(CHECK_AUTHORIZED_USER);
  const authStorage = useContext(AuthStorageContext);
  const apolloClient = useApolloClient();
  const history = useHistory();
  const [user, setUser] = useState(data);

  console.log(data);

  const signOut = async () => {
    const token = await authStorage.getAccessToken();
    console.log('token before sign out: ', token);
    await authStorage.removeAccessToken();
    const clearedToken = await authStorage.getAccessToken();
    await apolloClient.resetStore();
    console.log('token after sign out: ', clearedToken);
    setUser(undefined);
    history.push('/');
  };

  useEffect(() => {
    if(data && data.authorizedUser){
      setUser(data);
    }
  }, [data]);

  const LogoutButton = () => {
    return(
      <Link to='/'>
        <Text style={styles.text} onPress={signOut}>Sign out</Text>
      </Link>
    );
  };

  return(
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <Link to='/'>
          <Text style={styles.text}>Repositories</Text>
        </Link>
        {user
          ? user.authorizedUser
            ? <>
                <ReviewButton />
                <LogoutButton />
              </>
            : <LoginButton />
          
          : <LoginButton />
        }
      </ScrollView>
    </View>
  );
};

const LoginButton = () => {
  return(
    <Link to='/login'>
      <Text style={styles.text}>Sign in</Text>
    </Link>
  );
};

const ReviewButton = () => {
  return(
    <Link to='/review' >
      <Text style={styles.text}>Create a review</Text>
    </Link>
  );
};
  


export default AppBar;