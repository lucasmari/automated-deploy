import React from 'react';
import NewsList from './NewsList';
import CreateNews from './CreateNews';
import './../styles/Home.css';

const Home = () => {
  return (
    <div className="content-container">
      <div className="content-subcontainer">
        <h1>News</h1>
        <CreateNews />
      </div>
      <NewsList />
    </div>
  );
};

export default Home;
