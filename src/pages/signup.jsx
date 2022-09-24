import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useApolloClient } from '@apollo/client';
import UserForm from '../components/UserForm';
import { SIGNUP_USER } from '../gql/query';
import { IS_LOGGED_IN } from '../gql/query';

// добавляем props, передаваемый в компонент для дальнейшего использования
const SignUp = (props) => {
  const navigate = useNavigate();

  // apollo client
  const client = useApolloClient();

  useEffect(() => {
    // обновляем заголовок документа
    document.title = 'Sign Up - Notedly';
  });

  //Добавляем хук мутации
  const [signUp, { loading, error }] = useMutation(SIGNUP_USER, {
    onCompleted: (data) => {
      // Сохраняем JWT в LocalStorage
      localStorage.setItem('token', data.signUp);
      // обновляем локальный кэш
      client.writeQuery({
        query: IS_LOGGED_IN,
        data: {
          isLoggedIn: true,
        },
      });
      // Перенаправляем пользователя на домашнюю страницу
      navigate('/');
    },
  });

  return (
    <React.Fragment>
      <UserForm action={signUp} formType="signup" />
      {/* Если данные загружаются, то сообщаем сообщение о загрузке */}
      {loading && <p>Loading...</p>}
      {/* Если при загрузке произошел сбой, отображаем сообщение об ошибке */}{' '}
      {error && <p>Error creating an account!</p>}
    </React.Fragment>
  );
};

export default SignUp;
