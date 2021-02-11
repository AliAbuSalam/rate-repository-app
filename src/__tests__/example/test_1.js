import React from 'react';
import { View } from 'react-native';
import { render } from '@testing-library/react-native';

import TextComponent from '../../components/TextComponentExample';

const Greeting = ({ name }) => {
  return(
    <View>
      <TextComponent name={name}/>
    </View>
  );
};



describe('Greeting', () => {
  it('renders a greeting message based on the name prop', () => {
    const { debug, getByTestId } = render(<Greeting name='Askell'/>);

    debug();

    expect(getByTestId('greetingText')).toHaveTextContent('Hello Askell!');
  });
});