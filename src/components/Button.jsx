import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

import Theme from '../theme';

const styles = StyleSheet.create({
  opacityContainer: {
    alignItems: 'center',
    backgroundColor: Theme.colors.buttonBackground,
    marginTop: 5,
    padding: 10,
  },
  text: {
    fontSize: Theme.fontSizes.button,
    color: Theme.colors.appBarText
  }
});

const Button = ({ text, touchableStyle = {}, textStyle = {}, ...props }) => {
  return(
    <TouchableOpacity style={[styles.opacityContainer, touchableStyle]} {...props}>
      <Text style={[styles.text, textStyle]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;