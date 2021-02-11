import { render } from '@testing-library/react-native';
import React from 'react';

import { RepositoryListContainer } from '../../../components/RepositoryList';

describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', () => {
      const repositories = [
        {
          id: 'jaredpalmer.formik',
          fullName: 'jaredpalmer/formik',
          description: 'Build forms in React, without the tears',
          language: 'TypeScript',
          forksCount: 1619,
          stargazersCount: 21856,
          ratingAverage: 88,
          reviewCount: 3,
          ownerAvatarUrl:
            'https://avatars2.githubusercontent.com/u/4060187?v=4',
        },
        {
          id: 'async-library.react-async',
          fullName: 'async-library/react-async',
          description: 'Flexible promise-based React data loader',
          language: 'JavaScript',
          forksCount: 69,
          stargazersCount: 1760,
          ratingAverage: 72,
          reviewCount: 3,
          ownerAvatarUrl:
            'https://avatars1.githubusercontent.com/u/54310907?v=4',
        },
      ];

      const { getAllByTestId } = render(<RepositoryListContainer repositories={repositories}/>);

      const fullName = getAllByTestId('fullNameText');
      const description = getAllByTestId('descriptionText');
      const language = getAllByTestId('languageText');
      const forksCount = getAllByTestId('ForksCount');
      const starsCount = getAllByTestId('StarsCount');
      const reviewsCount = getAllByTestId('ReviewsCount');
      const ratingCount = getAllByTestId('RatingCount');

      expect(fullName[0]).toHaveTextContent(repositories[0].fullName);
      expect(fullName[1]).toHaveTextContent(repositories[1].fullName);

      expect(description[0]).toHaveTextContent(repositories[0].description);
      expect(description[1]).toHaveTextContent(repositories[1].description);

      expect(language[0]).toHaveTextContent(repositories[0].language);
      expect(language[1]).toHaveTextContent(repositories[1].language);

      expect(starsCount[0]).toHaveTextContent('21.9k');
      expect(starsCount[1]).toHaveTextContent('1.8k');

      expect(forksCount[0]).toHaveTextContent('1.6k');
      expect(forksCount[1]).toHaveTextContent('69');

      expect(reviewsCount[0]).toHaveTextContent('3');
      expect(reviewsCount[1]).toHaveTextContent('3');

      expect(ratingCount[0]).toHaveTextContent('88');
      expect(ratingCount[1]).toHaveTextContent('72');

    });
  });
});