import './../styles/App.css';
import React, { Component } from 'react';
import NewsList from './NewsList';

class App extends Component {
  render() {
    return (
      <div>
        <div className="content-container">
          <h1>News</h1>
          <NewsList />
        </div>
      </div>
    );
  }
}

export default App;
