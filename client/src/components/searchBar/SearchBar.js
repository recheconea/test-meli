import React from 'react';
import logoMeli from 'assets/images/Logo_ML.png';
import { withRouter } from 'react-router-dom'

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      searchTerm: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.search = this.search.bind(this);
    this.submit = this.submit.bind(this);
  }
  

  handleChange(event) {
    this.setState({searchTerm: event.target.value});
  }

  submit(event){
    event.preventDefault();
    this.search();
   }

  search() {
    if (this.state.searchTerm.trim())
      this.props.history.push(`/items?search=${this.state.searchTerm}`);
  }

  render() {
    return (
      <header className="search-bar">
        <div className="header-container">
          <div  className="header-inner-container">
            <div className="img-container">
              <a href="/">
                <img alt="logo-meli" src={logoMeli} className="logo"/>
              </a>
            </div>
            <form className="search-form" onSubmit={this.submit}>
              <div className="form-control">
                <input type="text" value={this.state.searchTerm} onChange={this.handleChange} className="search-input" placeholder="Nunca dejes de buscar"/>
                <button type="submit" className="search-icon" onClick={() => this.search()}><i className="search-icon"></i></button>
               </div>
            </form>
          </div>
        </div>
      </header>
    );
  }
}

export default withRouter(SearchBar);