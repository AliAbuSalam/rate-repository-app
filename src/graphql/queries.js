import { gql } from 'apollo-boost';

const repositoryObject = gql`
  fragment RepositoryObject on Repository {
    id
    fullName
    description
    language
    ownerAvatarUrl
    stargazersCount
    forksCount
    reviewCount
    ratingAverage
  }
`;

export const GET_REPOSITORIES = gql`
  query GetRepositories {
    repositories {
      edges {
        node {
          ...RepositoryObject
        }
      }
    }
  }
  ${repositoryObject}
`;