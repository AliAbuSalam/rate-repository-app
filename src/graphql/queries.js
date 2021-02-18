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

const reviewObject = gql`
  fragment ReviewObject on Review {
    id
    user {
      username
    }
    rating
    createdAt
    text
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
      reviews {
        edges {
          node {
            ...ReviewObject
          }
        }
      }
      ...RepositoryObject
    }
  }
  ${repositoryObject}
  ${reviewObject}
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

export const ADD_REVIEW = gql`
  mutation AddReview($repositoryName: String!, $ownerName: String!, $rating: Int!, $review: String){
    createReview(review: {
      repositoryName: $repositoryName
      ownerName: $ownerName
      rating: $rating
      text: $review
    }){
      repositoryId
      rating
      createdAt
      text
    }
  }
`;