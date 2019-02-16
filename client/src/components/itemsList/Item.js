import React from 'react';
import logoMeli from 'assets/images/image-sample.jpg';
import icnShipping from 'assets/images/ic_shipping.png';
import { withRouter } from 'react-router-dom'

class Item extends React.Component {
  constructor(props) {
    super(props);

    this.state = props.itemData;
    this.redirectToDetail = this.redirectToDetail.bind(this)
  }

  renderFreeShipping() {
    return this.state.freeShipping ? <img src={icnShipping}/> : '';
  }

  redirectToDetail(id) {
    this.props.history.push(`/items/${id}`);
  }

  render() {
    return (
      <div className="item" onClick={() => this.redirectToDetail(this.state.id)}>
      	<div className="image-container">
      		<img src={this.state.picture} className="item-image"/>
      	</div>
      	<div className="item-data">
          <div className="first-col">
        	  <span className="price">{this.state.price.amount}</span> <span className="free-shipping">{this.renderFreeShipping()}</span>
        	  <p className="short-description"> {this.state.title} </p>
          </div>
	      	<div className="second-col">
	      	  <span>{this.state.city}</span>
	      	</div>
      	</div>
      </div>
    );
  }
}

export default withRouter(Item);