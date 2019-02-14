import React from 'react';
import logoMeli from 'assets/images/image-sample.jpg';
import icnShipping from 'assets/images/ic_shipping.png';

class Item extends React.Component {
  render() {
    return (
      <div className="item">
      	<div className="image-container">
      		<img src={logoMeli} className="item-image"/>
      	</div>
      	<div className="item-data">
          <div className="first-col">
        	  <span className="price">1980</span> <span className="free-shipping"><img src={icnShipping}/></span>
        	  <p className="short-description"> This is a text description </p>
          </div>
	      	<div className="second-col">
	      	  <span>Buenos aires</span>
	      	</div>
      	</div>
      </div>
    );
  }
}

export default Item;