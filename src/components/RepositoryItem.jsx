import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import  * as WebBrowser from 'expo-web-browser';

import theme from '../theme';
import Text from './Text';

const styles = StyleSheet.create({
  logoAndDescriptionContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  logo: {
    width: 50,
    height: 50,
    resizeMode: 'center'
  },
  logoContainer: {
    padding: 10
  },
  titleAndDescriptionContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    color: theme.colors.textPrimary,
    fontWeight: theme.fontWeights.bold,
  },
  statIndividualContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  statContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  parentContainer: {
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: 10,
  },
  languageContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  language: {
    padding: 5
  },
  description: {
    marginRight: 65
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: 5,
    alignItems: 'center',
    margin: 5,
  },
  buttonText: {
    color: theme.colors.textWhite,
    fontSize: theme.fontSizes.subheading
  }
});

const RepositoryItem = ({ item, handlePress }) => {
  return(
    <TouchableOpacity
      delayPressIn='50'
      onPress={() => handlePress(item.id)}
    >
      <RepositoryItemContainer item={item}/>
    </TouchableOpacity>
  );
};

export const RepositoryItemContainer = ({ item, singleView = false }) => {

  const openLink = () => {
    WebBrowser.openBrowserAsync(item.url);
  };

  return(
    <View
      style={styles.parentContainer} 
      testID='repositoryItem'
    >
      <DescriptionComponent
        imageSource={item.ownerAvatarUrl}
        title={item.fullName}
        description={item.description}
        language={item.language}
      />
      <StatsComponent
        stars={item.stargazersCount}
        forks={item.forksCount}
        reviews={item.reviewCount}
        rating={item.ratingAverage}
      />
      {singleView ? 
        <ButtonComponent onPress={openLink}/>
         : <></>}
    </View>
  );
};

const DescriptionComponent = ({ imageSource, title, description, language }) => {
  return(
    <View style={styles.logoAndDescriptionContainer}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={{
            uri: imageSource
          }}
        />
      </View>
      <View style={styles.titleAndDescriptionContainer}>
        <Text
          fontWeight='bold'
          testID='fullNameText'
        >
          {title}
        </Text>
        <Text
          color='textSecondary'
          testID='descriptionText'
          style={styles.description}
        >
          {description}
        </Text>
        <View style={styles.languageContainer}>
          <Text
            background='blue'
            style={styles.language}
            testID='languageText'
          >
            {language}
          </Text>
        </View>
        
      </View>
    </View>
  );
};

const StatsComponent = ({ stars, forks, reviews, rating }) => {
  return(
    <View style={styles.statContainer}>
      <StatIndividualComponent statName='Stars' statCount={stars} />
      <StatIndividualComponent statName='Forks' statCount={forks} />
      <StatIndividualComponent statName='Reviews' statCount={reviews} />
      <StatIndividualComponent statName='Rating' statCount={rating} />
    </View>
  );
};

const StatIndividualComponent = ({ statName, statCount}) => {
  return(
    <View style={styles.statIndividualContainer}>
      <Text fontWeight='bold' testID={`${statName}Count`}>{numberConverter(statCount)}</Text>
      <Text color='textSecondary'>{statName}</Text>
    </View>
  );
};

const ButtonComponent = ({ onPress }) => {
  return(
    <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={onPress}>
      <Text style={styles.buttonText}>Open in Github</Text>
    </TouchableOpacity>
  );
};

const numberConverter = (numberToConvert) => {
  let divider;
  let suffix;
  if(numberToConvert >= 1000000){
    divider = 1000000;
    suffix = 'm';
  } else if(numberToConvert >= 1000){
    divider = 1000;
    suffix = 'k';
  } else {
    divider = 1;
    suffix = '';
  }
  let convertedNumber = ((numberToConvert*1.0)/divider);
  const convertedNumberInString = convertedNumber.toFixed(1);

  if(convertedNumberInString.charAt(convertedNumberInString.length-1) !== '0'){
    return convertedNumberInString + suffix;
  } else {
    return convertedNumber.toFixed(0) + suffix;
  }
};

export default RepositoryItem;