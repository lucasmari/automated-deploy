import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import About from './About';
import Contact from './Contact';
import GamesList from './GamesList';
import Home from './Home';
import NavBar from './NavBar';
import Search from './Search';
import Theme from './Theme';

const App = () => {
  return (
    <Theme>
      <div>
        <NavBar />
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/news/1" />} />
          <Route exact path="/news/:page" component={Home} />
          <Route exact path="/games" component={GamesList} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/about" component={About} />
          <Route exact path="/search" component={Search} />
        </Switch>
      </div>
    </Theme>
  );
};

export default App;
