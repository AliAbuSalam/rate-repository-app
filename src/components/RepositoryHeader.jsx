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

const RepositoryHeader = ({ lazyRepositories, searchBarObject }) => {

  const sortingObject = {
    latestRepositories: {
      label: 'Latest Repositories'
    },
    highestRepositories: {
      label: 'Highest Rated Repositories'
    },
    lowestRepositories: {
      label: 'Lowest Rated Repositories'
    }
  };

  const [sortingOptions, setSortingOptions] = useState(sortingObject.latestRepositories);

  const sortState = {
    sortingOptions,
    setSortingOptions
  };

  return(
    <View style={styles.container}>
      <SearchBar 
        searchState={searchBarObject} 
        sortingOptions={sortingOptions} 
        style={styles.searchBar}
      />
      <SorterComponent sortState={sortState} sortingObject={sortingObject} changeRepositories={lazyRepositories}/>
    </View>
  );
};

export default RepositoryHeader;