import React, { useEffect, useState } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { useQuery } from '@apollo/react-hooks';

import { GET_REPOSITORIES } from '../graphql/queries';
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
  const { data, loading } = useQuery(GET_REPOSITORIES);
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    if(data && !loading){
      setRepositories(data.repositories.edges.map(edge => edge.node));
    }
  }, [data, loading, setRepositories]);

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