import React from 'react';
import logoMeli from 'assets/images/image-sample.jpg';
import icnShipping from 'assets/images/ic_shipping.png';

class Item extends React.Component {
  constructor(props) {
    super(props);

    this.state = props.itemData;
  }

  renderFreeShipping() {
    return this.state.freeShipping ? <img src={icnShipping}/> : '';
  }

  render() {
    return (
      <div className="item">
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

export default Item;