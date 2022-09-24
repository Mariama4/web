import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Outlet,
} from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';

import Layout from '../components/Layouts';

import Home from './home';
import Favorites from './favorites';
import MyNotes from './mynotes';
import NotePage from './note';
import SignUp from './signup';
import SingIn from './signin';
import NewNote from './new';

const IS_LOGGED_IN = gql`
  {
    isLoggedIn @client
  }
`;

// Добавляем компонент PrivateRoute под компонентом 'Pages'
const ProtectedRoute = ({ redirectPath = '/signin' }) => {
  const { loading, error, data } = useQuery(IS_LOGGED_IN);
  // Если данные загружаются, выводим сообщение о загрузке
  if (loading) return <p>Loading...</p>;
  // Если при получении данных произошел сбой, выводим сообщение об ошибке
  if (error) return <p>Error!</p>;
  // Если пользователь авторизован, направляем его к запрашиваемому компоненту
  // в противном случае перенаправляем на страницу авторизации
  if (data.isLoggedIn !== true) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

const Pages = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route element={<ProtectedRoute />}>
            <Route path="mynotes" element={<MyNotes />} />
            <Route path="favorites" element={<Favorites />} />
            <Route path="new" element={<NewNote />} />
          </Route>
          <Route path="note/:id" element={<NotePage />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="signin" element={<SingIn />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default Pages;
