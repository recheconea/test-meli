import React from 'react';
import { Redirect } from 'react-router';
import { withRouter } from 'react-router-dom'
import queryString from 'query-string';

class Pagination extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      paging: props.paging,
      minPage: 0,
      maxPage: Infinity,
      resultsPerPage: 4
    };
    
    this.goToPage = this.goToPage.bind(this)
  }

  goToPage(page) {
    let query = queryString.parse(this.props.location.search);
    query.page = page;
    let newQuery = Object.keys(query).map((key) => `${key}=${query[key]}`).join('&');
    this.props.history.push(`/items?${newQuery}`);
  }

  renderPaginationElement(className, target, label) {
    return <span key={target} onClick={() => this.goToPage(target)} className={className}>{label}</span>
  }

  renderPreviousButton() {
    if (this.state.paging.currentPage > 1)
      return this.renderPaginationElement('page', this.state.paging.currentPage - 1, 'Anterior');
  }

  renderNextButton() {
    if (this.state.paging.currentPage < this.state.paging.maxPage)
      return this.renderPaginationElement('page', this.state.paging.currentPage + 1, 'Siguiente');
  }

  renderPageList() {
    const pages = Array(this.state.paging.maxPage - this.state.paging.minPage + 1).fill().map((item, index) => this.state.paging.minPage + index)
    return pages.map((page) => {
      return <span key={page} onClick={() => this.goToPage(page)} className={page === this.state.paging.currentPage ? 'page active' : 'page'}>{page}</span>
    });
  }

  render() {
    if (this.state.redirect) {
      return (<Redirect to={{ pathname: "/items", search: "?" + this.state.qs }} />);
    }
    return (
      <div className="pagination">
        {this.renderPreviousButton()} {this.renderPageList()} {this.renderNextButton()}
      </div>
    );
  }
}

export default withRouter(Pagination);