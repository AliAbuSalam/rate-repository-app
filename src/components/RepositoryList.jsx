import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { useHistory } from 'react-router-native';

import useRepositories from '../hooks/useRepositories';
import Item from './RepositoryItem';
import RepositoryHeader from './RepositoryHeader';
import theme from '../theme';

const styles = StyleSheet.create({
  separator: theme.separator
});

const ItemSeparator = () => <View style={styles.separator}/>;

const RepositoryList = () => {
  const { repositories, lazyRepositories } = useRepositories();

  return(<RepositoryListContainer repositories={repositories} lazyRepositories={lazyRepositories} />);
};

export const RepositoryListContainer = ({ repositories, lazyRepositories }) => {
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
      ListHeaderComponent={<RepositoryHeader lazyRepositories={lazyRepositories}/>}
      testID='repositoryList'
    />
  );
};

export default RepositoryList;