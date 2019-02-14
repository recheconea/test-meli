import React, { Component } from 'react';
import logo from './logo.svg';
import './App.scss';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import SearchBar from './components/searchBar/SearchBar';
import ItemsList from './pages/ItemsList';

class App extends Component {
  render() {
    return (
      <div className="App">
        <SearchBar/>
        <Router>
          <div className="main-container">
              <Route path="/" component={ItemsList} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
