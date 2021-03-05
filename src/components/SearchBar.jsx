import React, { useEffect, useRef } from 'react';
import { Searchbar } from 'react-native-paper';
import { useDebounce } from 'use-debounce';


const SearchBar = ({ searchState, sortingOptions, style }) => {
  const [searchValue] = useDebounce(searchState.searchQuery, 500);
  const changeQuery = (query) => searchState.setSearchQuery(query);
  const initialRender = useRef(true);

  useEffect(() => {
    if(initialRender.current){
      initialRender.current = false;
      return;
    }
    const newSortingOptions = {
      value: sortingOptions.value
    };
    newSortingOptions.value.searchKeyword = searchValue;
    searchState.filterRepositories();
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