import React from 'react';

class Breadcrumb extends React.Component {
  constructor(props) {
    super(props);
    
    this.renderBreadcrumbList = this.renderBreadcrumbList.bind(this);
    this.renderLastBreadcrumbList = this.renderLastBreadcrumbList.bind(this);
  }

  renderBreadcrumbList() {
    return this.props.categories.slice(0, -1).map((category) => <span key={category.id} className="breadcrumb-item">{category.name} > </span>)
  }

  renderLastBreadcrumbList() {
    const lastCategory = this.props.categories[this.props.categories.length - 1];
    return <span className="breadcrumb-item last" key={lastCategory.id}>{lastCategory.name}</span>
  }

  render() {
    return (
      <div className="breadcrumb">
        {this.renderBreadcrumbList()} {this.renderLastBreadcrumbList()}
      </div>
    );
  }
}

export default Breadcrumb;