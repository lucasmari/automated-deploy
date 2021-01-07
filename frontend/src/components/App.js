import './../styles/App.css';
import React, { Component } from 'react';
import NewsList from './NewsList';
import CreateNews from './CreateNews';

class App extends Component {
  render() {
    return (
      <div>
        <div className="content-container">
          <div className="content-subcontainer">
            <h1>News</h1>
            <CreateNews />
          </div>
          <NewsList />
        </div>
      </div>
    );
  }
}

export default App;
