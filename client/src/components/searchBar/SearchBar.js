import React from 'react';
import logoMeli from 'assets/images/Logo_ML.png';

class SearchBar extends React.Component {
  render() {
    return (
      <header className="search-bar">
        <div className="header-container">
          <div  className="header-inner-container">
            <div className="img-container">
              <img src={logoMeli} className="logo"/>
            </div>
            <form className="search-form">
              <input type="search" className="search-input" placeholder="Nunca dejes de buscar"/>
              <button className="search-icon"><i className="search-icon"></i></button>
            </form>
          </div>
        </div>
      </header>
    );
  }
}

export default SearchBar;