import React from 'react';
import NewsList from './NewsList';
import CreateNews from './CreateNews';
import './../styles/Home.css';
import { AUTH_TOKEN } from '../constants';

const Home = () => {
  const authToken = localStorage.getItem(AUTH_TOKEN);

  return (
    <div className="content-container">
      <div className="content-subcontainer">
        <h1>News</h1>
        {authToken && <CreateNews />}
      </div>
      <NewsList />
    </div>
  );
};

export default Home;
