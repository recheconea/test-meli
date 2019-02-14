import React, { Component } from 'react';
import logo from './logo.svg';
import './App.scss';
import SearchBar from './components/searchBar/SearchBar'

class App extends Component {
  render() {
    return (
      <div className="App">
        <SearchBar/>
      </div>
    );
  }
}

export default App;
