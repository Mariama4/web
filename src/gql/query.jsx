import { gql } from '@apollo/client';

// Наш graphql запрос, хранящийся в виде переменной
const GET_NOTES = gql`
  query NoteFeed($cursor: String) {
    noteFeed(cursor: $cursor) {
      cursor
      hasNextPage
      notes {
        id
        createdAt
        content
        favoriteCount
        author {
          username
          id
          avatar
        }
      }
    }
  }
`;

const GET_NOTE = gql`
  query note($id: ID!) {
    note(id: $id) {
      id
      createdAt
      content
      favoriteCount
      author {
        username
        id
        avatar
      }
    }
  }
`;

// запрос new note
const NEW_NOTE = gql`
  mutation newNote($content: String!) {
    newNote(content: $content) {
      id
      content
      createdAt
      favoriteCount
      favoritedBy {
        id
        username
      }
      author {
        id
        username
      }
    }
  }
`;

const SIGNIN_USER = gql`
  mutation signIp($email: String, $password: String!) {
    signIn(email: $email, password: $password)
  }
`;

// записываем данные кэша при начальной загрузке
const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

const SIGNUP_USER = gql`
  mutation signUp($email: String!, $username: String!, $password: String!) {
    signUp(email: $email, username: $username, password: $password)
  }
`;

export {
  GET_NOTE,
  GET_NOTES,
  NEW_NOTE,
  SIGNIN_USER,
  SIGNUP_USER,
  IS_LOGGED_IN,
};
