import React, { useEffect } from 'react';
import { useMutation, useApolloClient, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

import UserForm from '../components/UserForm';

const SIGNIP_USER = gql`
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

const SignIn = (props) => {
  const navigate = useNavigate();
  useEffect(() => {
    // обновляем заговолок документа
    document.title = 'Sign In - Notedly';
  });

  const client = useApolloClient();
  const [signIn, { loading, error }] = useMutation(SIGNIP_USER, {
    onCompleted: (data) => {
      // сохраняем токен
      localStorage.setItem('token', data.signIn);
      // обновляем локальный кэш
      client.writeQuery({
        query: IS_LOGGED_IN,
        data: {
          isLoggedIn: true,
        },
      });
      // перенаправляем пользователя на домашнюю страницу
      navigate('/');
    },
  });

  return (
    <React.Fragment>
      <UserForm action={signIn} formType="signin" />
      {/* Если данные загружаются, то сообщаем сообщение о загрузке */}
      {loading && <p>Loading...</p>}
      {/* Если при загрузке произошел сбой, отображаем сообщение об ошибке */}{' '}
      {error && <p>Error signing in!</p>}
    </React.Fragment>
  );
};

export default SignIn;
