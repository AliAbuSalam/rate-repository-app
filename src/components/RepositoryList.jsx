import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';

import useRepositories from '../hooks/useRepositories';
import Item from './RepositoryItem';
import theme from '../theme';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: theme.colors.background,
  },
});

const ItemSeparator = () => <View style={styles.separator}/>;

const RepositoryList = () => {
  const { repositories } = useRepositories();

  return(
    <FlatList 
      data={repositories}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={Item}
      keyExtractor={item => item.id}
    />
  );
};

export default RepositoryList;