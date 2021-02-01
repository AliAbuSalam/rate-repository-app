import React, { useContext } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import { Link } from 'react-router-native';
import { useQuery } from '@apollo/react-hooks';

import theme from '../theme';
import { CHECK_AUTHORIZED_USER } from '../graphql/queries';
import AuthStorageContext from '../contexts/AuthStorageContext';

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

const AppBar = ({ userLoggedIn, setUserLoggedIn }) => {
  const { data } = useQuery(CHECK_AUTHORIZED_USER);
  const authStorage = useContext(AuthStorageContext);

  console.log(data);

  const signOut = async () => {
    const token = await authStorage.getAccessToken();
    console.log('token before sign out: ', token);
    await authStorage.removeAccessToken();
    const clearedToken = await authStorage.getAccessToken();
    console.log('token after sign out: ', clearedToken);
    setUserLoggedIn(clearedToken);
  };
  return(
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <Link to='/'>
          <Text style={styles.text}>Repositories</Text>
        </Link>
        {!userLoggedIn
          ? <Link to='/login'>
              <Text style={styles.text}>Sign in</Text>
            </Link>
          : <Text style={styles.text} onPress={signOut}>Sign out</Text>
        }
      </ScrollView>
    </View>
  );
};



export default AppBar;