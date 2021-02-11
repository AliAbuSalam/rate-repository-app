import React from 'react';
import { Text } from 'react-native';

const TextComponent = ({ name }) => {
  return(
    <Text testID='greetingText'>
      Hello {name}!
    </Text>
  );
};

export default TextComponent;