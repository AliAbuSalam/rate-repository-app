import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
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
  }
});

const RepositoryItem = ({ item }) => {
  return(
    <View style={styles.parentContainer}>
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
        >
          {title}
        </Text>
        <Text
          color='textSecondary'
        >
          {description}
        </Text>
        <View style={styles.languageContainer}>
          <Text
            background='blue'
            style={styles.language}
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
      <StatIndividualComponent statName='Stars' statCount={stars}/>
      <StatIndividualComponent statName='Forks' statCount={forks}/>
      <StatIndividualComponent statName='Reviews' statCount={reviews}/>
      <StatIndividualComponent statName='Rating' statCount={rating}/>
    </View>
  );
};

const StatIndividualComponent = ({ statName, statCount}) => {
  return(
    <View style={styles.statIndividualContainer}>
      <Text fontWeight='bold'>{numberConverter(statCount)}</Text>
      <Text color='textSecondary'>{statName}</Text>
    </View>
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