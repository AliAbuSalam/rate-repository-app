import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { useHistory } from 'react-router-native';

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

  return(<RepositoryListContainer repositories={repositories}/>);
};

export const RepositoryListContainer = ({ repositories }) => {
  const history = useHistory();
  const RepositoryList = repositories;

  const handlePress = (id) => {
    history.push(`/repository/${id}`);
  };

  return(
    <FlatList 
      data={RepositoryList}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <Item item={item} handlePress={handlePress}/>}
      keyExtractor={item => item.id}
      testID='repositoryList'
    />
  );
};

export default RepositoryList;