import React from 'react';
import icnShipping from 'assets/images/ic_shipping.png';
import { withRouter } from 'react-router-dom'

class Item extends React.Component {
  constructor(props) {
    super(props);

    this.state = props.itemData;
    this.redirectToDetail = this.redirectToDetail.bind(this)
    this.renderPrice = this.renderPrice.bind(this)
  }

  renderFreeShipping() {
    return this.state.free_shipping ? <img alt="free shipping" src={icnShipping}/> : '';
  }

  renderPrice() {
    const price = this.state.price;
    let priceString = `${price.currency} ${price.amount}`;
    if (price.decimals)
      priceString += `.${price.decimals}`;
    return priceString;
  }

  redirectToDetail(id) {
    this.props.history.push(`/items/${id}`);
  }

  render() {
    return (
      <div className="item" onClick={() => this.redirectToDetail(this.state.id)}>
      	<div className="image-container">
      		<img alt="item detail" src={this.state.picture} className="item-image"/>
      	</div>
      	<div className="item-data">
          <div className="first-col">
        	  <span className="price">{this.renderPrice()}</span> <span className="free-shipping">{this.renderFreeShipping()}</span>
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