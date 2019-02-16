import React, { Component } from 'react';
import logo from './logo.svg';
import './App.scss';
import { Route, Link, Switch, BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import SearchBar from './components/searchBar/SearchBar';
import ItemsList from './pages/ItemsList';
import ItemDetail from './pages/ItemDetail';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <SearchBar/>
          <div className="main-container">
            <Switch >
                <Route exact path="/items" component={ItemsList} />
                <Route exact path="/items/:id" component={ItemDetail} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
