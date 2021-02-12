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
    url
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

export const GET_SINGLE_REPOSITORY = gql`
  query GetRepository($id: ID!){
    repository(id: $id){
      ...RepositoryObject
    }
  }
  ${repositoryObject}
`;

export const SIGN_IN = gql`
  mutation Authorization($username: String!, $password: String!){
    authorize(credentials: {
      username: $username
      password: $password
    }){
      accessToken
      expiresAt
    }
  }
`;

export const CHECK_AUTHORIZED_USER = gql`
  query CheckLogin{
    authorizedUser {
      username
    } 
  }
`;