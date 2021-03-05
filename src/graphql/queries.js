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
  query GetRepositories($after: String, $first: Int) {
    repositories(after: $after, first: $first) {
      edges {
        node {
          ...RepositoryObject
        }
      }
      pageInfo {
        startCursor
        endCursor
        hasNextPage
      }
    }
  }
  ${repositoryObject}
`;

export const GET_REPOSITORIES_WITH_ARGUMENTS = gql`
  query GetRepositories($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $searchKeyword: String!, $after: String, $first: Int){
    repositories(
      orderBy: $orderBy, 
      orderDirection: $orderDirection, 
      searchKeyword: $searchKeyword
      first: $first
      after: $after
    ){
      edges {
        node{
          ...RepositoryObject
        }
      }
      pageInfo {
        startCursor
        endCursor
        hasNextPage
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

export const SIGN_UP = gql`
  mutation SignUp($username: String!, $password: String!){
    createUser(user: {
      username: $username
      password: $password
    }){
      username
      createdAt
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

