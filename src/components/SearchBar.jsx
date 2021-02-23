import React, { useEffect } from 'react';
import { Searchbar } from 'react-native-paper';
import { useDebounce } from 'use-debounce';


const SearchBar = ({ searchState, sortingOptions, changeRepositories, style }) => {
  const [searchValue] = useDebounce(searchState.searchQuery, 500);
  const changeQuery = (query) => searchState.setSearchQuery(query);

  useEffect(() => {
    const newSortingOptions = {
      value: sortingOptions.value
    };
    newSortingOptions.value.searchKeyword = searchValue;
    changeRepositories({ variables: newSortingOptions.value});
  }, [searchValue]);

  return(
    <Searchbar 
      placeholder='Search'
      onChangeText={changeQuery}
      value={searchState.searchQuery}
      style={style}
    />
  );
};

export default SearchBar;