import React, { useEffect, useState } from 'react';
import { Menu } from 'react-native-paper';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

import Theme from '../theme';

const styles = StyleSheet.create({
  anchor: {
    alignItems: 'flex-start',
    padding: 10,
    marginBottom: 5,
    marginLeft: 10
  },
  anchorText: {
    fontSize: Theme.fontSizes.subheading,
    flexGrow: 1
  },
  anchorView: {
    display: 'flex',
    flexDirection: 'row'
  },
  icon: {
    height: 15,
    width: 15
  },
  view: {
    justifyContent: 'center'
  }
});

const SorterComponent = ({ changeRepositories, sortState, sortingObject }) => {
  const [visible, setVisible] = useState(false);

  const Anchor = () => (
    <TouchableOpacity onPress={() => setVisible(true)} style={styles.anchor}>
      <Text style={styles.anchorText}>
          {`${sortState.sortingOptions.label}...`}
        </Text>
    </TouchableOpacity>
  );

  const MenuItem = ({ object }) => (
    <Menu.Item onPress={() => {
      sortState.setSortingOptions(object);
      changeRepositories({ variables: object.value});
      setVisible(false);
    }} title={object.label}/>
  );

  useEffect(() => {
  }, [visible]);

  return(
      <View style={styles.view}>
        <Menu
          visible={visible}
          onDismiss={() => setVisible(false)}
          anchor={<Anchor />}
        >
          <MenuItem object={sortingObject.latestRepositories}/>
          <MenuItem object={sortingObject.highestRepositories}/>
          <MenuItem object={sortingObject.lowestRepositories}/>
        </Menu>
      </View>
      

  );
};

export default SorterComponent;