import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Layout from '../components/layout';

import Home from './home';
import Favorites from './favorites';
import MyNotes from './mynotes';

const Pages = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="mynotes" element={<MyNotes />} />
          <Route path="favorites" element={<Favorites />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default Pages;
