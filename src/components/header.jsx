import React from 'react';
import styled from 'styled-components';
import logo from '../assets/logo.svg';
import { useQuery, gql } from '@apollo/client';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import ButtonAsLink from '../components/ButtonAsLink';

const HeaderBar = styled.header`
  width: 100%;
  padding: 0.5em 1em;
  display: flex;
  height: 64px;
  position: fixed;
  align-items: center;
  background-color: #fff;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.25);
  z-index: 1;
`;

const LogoText = styled.h1`
  margin: 0;
  padding: 0;
  display: inline;
`;

const UserState = styled.div`
  margin-left: auto;
`;

//локальный запрос
const IS_LOGGED_IN = gql`
  {
    isLoggedIn @client
  }
`;

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  }

  return ComponentWithRouterProp;
}

const Header = (props) => {
  // хук запроса для проверки состояния авторизации пользователя
  const { data, client } = useQuery(IS_LOGGED_IN);
  const navigate = useNavigate();

  return (
    <HeaderBar>
      <img src={logo} alt="Notedly Logo" height="40" />
      <LogoText>Notedly</LogoText>
      {/* если авторизован, то отображаем ссылку Logout, в противном случае отображаем варианты signup и signin */}
      <UserState>
        {data.isLoggedIn ? (
          <ButtonAsLink
            onClick={() => {
              // удаляем токен
              localStorage.removeItem('token');
              // Очищаем кэш приложения
              client.resetStore();
              // обновляем локальное состояние
              client.writeQuery({
                query: IS_LOGGED_IN,
                data: {
                  isLoggedIn: false,
                },
              });
              navigate('/');
            }}
          >
            Logout
          </ButtonAsLink>
        ) : (
          <p>
            <Link to={'/signin'}>Sign In</Link> or{' '}
            <Link to={'/signup'}>Sign Up</Link>
          </p>
        )}
      </UserState>
    </HeaderBar>
  );
};

export default withRouter(Header);
