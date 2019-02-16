var axios = require('axios');

class ItemService {

  constructor() {}

  async getItems(query) {
    const { data } = await axios.get('https://api.mercadolibre.com/sites/MLA/search', { params: { q: query, limit: 4 } });
    console.log(data.results[0])
    const items = data.results.map(item => {
      return {
        id: item.id,
        title: item.title,
        price: {
          currency: item.currency_id,
          amount: item.price,
          decimals: 0
        },
        picture: item.thumbnail,
        condition: item.condition,
        free_shipping: item.shipping.free_shipping,
        city: item.address.state_name
      }
    });

    let categories = [];
    if (data.filters.length) {
      const category_filter = data.filters.find(filter => filter.id == 'category')
      if (category_filter) {
        categories = category_filter.values[0].path_from_root.map(category => category.name)
      }
    }

    return  {
      items: items,
      categories: [],
      author: {
        name: 'Rodrigo',
        lastname: 'Echeconea'
      },
      categories: categories
    };
  }

  async getItem(id) {
    const { data: itemData }  = await axios.get(`https://api.mercadolibre.com/items/${id}`);
    const { data: itemDescription } = await axios.get(`https://api.mercadolibre.com/items/${id}/description`);

    return {
      author: {
        name: 'Rodrigo',
        lastname: 'Echeconea'
      },
      item: {
        id: id,
        title: itemData.title,
        price: {
          currency: itemData.currency_id,
          amount: itemData.price,
          decimals: 0,
        },
        picture: itemData.thumbnail,
        condition: itemData.condition,
        free_shipping: itemData.shipping.free_shipping,
        sold_quantity: itemData.sold_quantity,
        description: itemDescription.plain_text
      }
    }
  }
}

module.exports = ItemService;