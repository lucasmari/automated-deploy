import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import NavBar from './NavBar';
import Home from './Home';
import GamesList from './GamesList';
import Contact from './Contact';
import About from './About';
import Search from './Search';
import Theme from './Theme';

class App extends Component {
  render() {
    return (
      <Theme>
        <div>
          <NavBar />
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/new/1" />} />
            <Route exact path="/games" component={GamesList} />
            <Route exact path="/contact" component={Contact} />
            <Route exact path="/about" component={About} />
            <Route exact path="/search" component={Search} />
            <Route exact path="/new/:page" component={Home} />
          </Switch>
        </div>
      </Theme>
    );
  }
}

export default App;
