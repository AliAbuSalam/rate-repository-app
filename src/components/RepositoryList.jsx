import React, { useEffect } from 'react';
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
  const { repositories, lazyRepositories, fetchMore, searchBarObject } = useRepositories({
    first: 8
  });

  useEffect(() => {
    lazyRepositories();
  }, []);

  return(<RepositoryListContainer repositories={repositories} lazyRepositories={lazyRepositories} fetchMore={fetchMore} searchBarObject={searchBarObject}/>);
};

export const RepositoryListContainer = ({ 
  repositories, 
  lazyRepositories, 
  fetchMore, 
  searchBarObject 
}) => {
  const history = useHistory();
  const RepositoryList = repositories;

  const handlePress = (id) => {
    history.push(`/repository/${id}`);
  };

  const handleOnEndReached =  () => fetchMore();

  return(
    <FlatList 
      data={RepositoryList}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <Item item={item} handlePress={handlePress}/>}
      keyExtractor={item => item.id}
      ListHeaderComponent={<RepositoryHeader lazyRepositories={lazyRepositories} searchBarObject={searchBarObject}/>}
      testID='repositoryList'
      onEndReached={handleOnEndReached}
      onEndReachedThreshold={0.5}
    />
  );
};

export default RepositoryList;