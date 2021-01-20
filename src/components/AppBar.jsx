import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import { Link } from 'react-router-native';

import theme from '../theme';

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
  return(
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <Link to='/'>
          <Text style={styles.text}>Repositories</Text>
        </Link>
        <Link to='/login'>
          <Text style={styles.text}>Sign in</Text>
        </Link>
      </ScrollView>
    </View>
  );
};

export default AppBar;