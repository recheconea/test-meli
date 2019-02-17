import React from 'react';
import Item from 'components/itemsList/Item';
import Breadcrumb from 'components/breadcrumb/Breadcrumb';
import Pagination from 'components/pagination/Pagination';
import Axios from 'axios';
import queryString from 'query-string';

class ItemList extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      results: null,
      previousSearchTerm: '',
      previousPage: 0,
      breadcrumb: null,
      pagination: null
    };
  }

  async fetchData() {
    const searchValue = queryString.parse(this.props.location.search);
    if (this.state.previousSearchTerm != searchValue.search || this.state.previousPage != searchValue.page) {
      this.setState({previousSearchTerm: searchValue.search, results: null, previousPage: searchValue.page});
      const page = searchValue.page ? `&page=${searchValue.page}` : ''
      let {data} = await Axios.get(`http://localhost:5000/api/items?q=${searchValue.search}${page}`);
      this.setState({results: data.items, breadcrumb: data.categories, pagination: data.pagination});
    }
  }

  async componentDidMount() {
    this.fetchData()
  }

  async componentDidUpdate(prevProps) {
    this.fetchData()
  }

  renderList() {
    return this.state.results.map((result) => {
      return <Item itemData={result} key={result.id}/>
    })
  }

  render() {
    if (!this.state.results) {
      return <div>Loading</div>;
    }

    return (
      <div className="main-container-inner">
        <Breadcrumb categories={this.state.breadcrumb}/>
        {this.renderList()}
        <Pagination paging={this.state.pagination}/>
      </div>
    );
  }
}

export default ItemList;