import React from 'react';
import styled from 'styled-components';
import logo from '../assets/logo.svg';

const HeaderBar = styled.header`
  // доделать
`;

const Header = () => {
  return (
    <header>
      <img src={logo} alt="Notedly Logo" height="40" />
      <h1>Notedly</h1>
    </header>
  );
};

export default Header;
