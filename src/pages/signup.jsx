import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../components/Button';
import { useMutation, useApolloClient, gql } from '@apollo/client';
import UserForm from '../components/UserForm';

const Wrapper = styled.div`
  border: 1px solid #f5f4f0;
  max-width: 500px;
  padding: 1em;
  margin: 0 auto;
`;

const Form = styled.form`
  label,
  input {
    display: block;
    line-height: 2em;
  }

  input {
    width: 100%;
    margin-bottom: 1em;
  }
`;

const SINGUP_USER = gql`
  mutation signUp($email: String!, $username: String!, $password: String!) {
    signUp(email: $email, username: $username, password: $password)
  }
`;

// добавляем props, передаваемый в компонент для дальнейшего использования
const SignUp = (props) => {
  const navigate = useNavigate();
  // Устанавливаем состояние формы по умолчанию
  const [values, setValues] = useState();

  // Обновляем состояние при вводе пользователем данных
  const onChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  // apollo client
  const client = useApolloClient();

  useEffect(() => {
    // обновляем заголовок документа
    document.title = 'Sign Up - Notedly';
  });

  //Добавляем хук мутации
  const [signUp, { loading, error }] = useMutation(SINGUP_USER, {
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
