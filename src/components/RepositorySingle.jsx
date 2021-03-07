import React from 'react';
import { useParams } from 'react-router-native';
import { FlatList, View, StyleSheet } from 'react-native';

import Text from './Text';
import Theme from '../theme';
import { RepositoryItemContainer } from './RepositoryItem';
import ReviewItem from './ReviewItem';
import useRepository from '../hooks/useRepositorySingle';

const styles = StyleSheet.create({
  separator: Theme.separator
});

const RepositorySingle = () => {
  const { id } = useParams();
  const { repository, reviews, error, fetchMore } = useRepository({
    id,
    first: 5
  });

  const handleOnEndReached = () => {
    fetchMore();
  };

  if(repository){
    return(
      <FlatList
        data={reviews}
        renderItem={ReviewItem}
        keyExtractor={item => item.id}
        ListHeaderComponent={() => <RepositoryItemContainer item={repository} singleView={true}/>}
        ItemSeparatorComponent={ItemSeparator}
        onEndReached={handleOnEndReached}
        onEndReachedThreshold={0.5}
      />
    );
  } else if(!repository && error){
    return(
      <Text>error</Text>
    );
  } else {
    return(
      <Text>loading</Text>
    );
  }
  
};

const ItemSeparator = () => <View style={styles.separator}/>;

export default RepositorySingle;