import React, { useEffect, useState } from 'react';
import { Menu } from 'react-native-paper';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

import Theme from '../theme';

const styles = StyleSheet.create({
  anchor: {
    alignItems: 'flex-start',
    padding: 10,
    marginBottom: 5,
    backgroundColor: Theme.colors.touchableBackground
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

const SorterComponent = ({ lazyRepositories }) => {
  const sortingObject = {
    latestRepositories: {
      label: 'Latest Repositories',
      value: {
        orderBy: 'CREATED_AT',
        orderDirection: 'DESC'
      }
    },
    highestRepositories: {
      label: 'Highest Rated Repositories',
      value: {
        orderBy: 'RATING_AVERAGE',
        orderDirection: 'DESC'
      }
    },
    lowestRepositories: {
      label: 'Lowest Rated Repositories',
      value: {
        orderBy: 'RATING_AVERAGE',
        orderDirection: 'ASC'
      }
    }
  };

  const [visible, setVisible] = useState(false);
  const [sortingOption, setSortingOption] = useState(sortingObject.latestRepositories);

  const Anchor = () => (
    <TouchableOpacity onPress={() => setVisible(true)} style={styles.anchor}>
      <Text style={styles.anchorText}>
          {`${sortingOption.label}...`}
        </Text>
    </TouchableOpacity>
  );

  const MenuItem = ({ object }) => (
    <Menu.Item onPress={() => {
      setSortingOption(object);
      lazyRepositories({ variables: object.value});
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