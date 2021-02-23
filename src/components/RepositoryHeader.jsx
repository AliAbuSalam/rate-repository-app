import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';

import SearchBar from './SearchBar';
import SorterComponent from './SorterComponent';
import Theme from '../theme';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: Theme.colors.touchableBackground
  },
  searchBar: {
    margin: 10
  }
});

const RepositoryHeader = ({ lazyRepositories }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const sortingObject = {
    latestRepositories: {
      label: 'Latest Repositories',
      value: {
        orderBy: 'CREATED_AT',
        orderDirection: 'DESC',
        searchKeyword: searchQuery
      }
    },
    highestRepositories: {
      label: 'Highest Rated Repositories',
      value: {
        orderBy: 'RATING_AVERAGE',
        orderDirection: 'DESC',
        searchKeyword: searchQuery
      }
    },
    lowestRepositories: {
      label: 'Lowest Rated Repositories',
      value: {
        orderBy: 'RATING_AVERAGE',
        orderDirection: 'ASC',
        searchKeyword: searchQuery
      }
    }
  };

  const [sortingOptions, setSortingOptions] = useState(sortingObject.latestRepositories);
  
  const searchState = {
    searchQuery,
    setSearchQuery
  };

  const sortState = {
    sortingOptions,
    setSortingOptions
  };

  return(
    <View style={styles.container}>
      <SearchBar searchState={searchState} sortingOptions={sortingOptions} changeRepositories={lazyRepositories} style={styles.searchBar}/>
      <SorterComponent sortState={sortState} sortingObject={sortingObject} changeRepositories={lazyRepositories}/>
    </View>
  );
};

export default RepositoryHeader;