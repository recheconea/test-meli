import React from 'react';
import Axios from 'axios';
import Breadcrumb from 'components/breadcrumb/Breadcrumb';

class ItemDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: {}
    };
    this.renderPrice = this.renderPrice.bind(this);
  }

	async componentDidMount() {
    const { id } = this.props.match.params
    if (id) {
      let {data} = await Axios.get(`http://localhost:5000/api/items/${id}`);
      this.setState({item: data.item, breadcrumb: data.categories});
    }
  }

  renderPrice() {
    const price = this.state.item.price;
    let priceString = `${price.currency} ${price.amount}`;
    if (price.decimals)
      priceString += `.${price.decimals}`;
    return priceString;
  }

  render() {
    if (!this.state.item.id) {
      return (
        <div className="item-detail-container"><div className="item-detail loading"><span>Cargando</span></div></div>);
    }

    return (
      <div className="item-detail-container">
        <Breadcrumb categories={this.state.breadcrumb}/>
        <div className="item-detail">
          <div className="first-main-row inner-container">
            <div className="image-container">
              <img alt="item detail" src={this.state.item.picture} className="item-image"/>
            </div>
            <div className="item-data-container">
              <div className="first-row">
                <span>{this.state.item.condition}</span> - <span> {this.state.item.sold_quantity} vendidos</span>
              </div>
              <div className="second-row">
                <h2>{this.state.item.title}</h2>
              </div>
              <div className="third-row">
                {this.renderPrice()}
              </div>
              <div className="fourth-row">
                <button> Comprar </button>
              </div>
            </div>
          </div>
          <div className="second-main-row inner-container">
            <div className="second-main-row-inner">
              <h3 className="description-title">Descripcion del producto</h3>
              <p className="description">{this.state.item.description}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ItemDetail;