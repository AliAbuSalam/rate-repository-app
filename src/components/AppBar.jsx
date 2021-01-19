import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Text } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBackground,
    paddingBottom: 20
  },
  text: {
    color: theme.colors.appBarText,
    fontSize: theme.fontSizes.subheading,
  }
});

const AppBar = () => {
  return(
    <View style={styles.container}>
      <TouchableWithoutFeedback>
        <Text style={styles.text}>Repositories</Text>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default AppBar;