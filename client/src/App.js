import React, { Component } from 'react';
import 'assets/styles/App.scss';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

import SearchBar from './components/searchBar/SearchBar';
import ItemsList from './pages/itemList/ItemsList';
import ItemDetail from './pages/itemDetail/ItemDetail';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <SearchBar/>
          <div className="main-container">
            <Switch >
                <Route exact path="/items" component={ItemsList} />
                <Route exact path="/items/:id" component={ItemDetail} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
