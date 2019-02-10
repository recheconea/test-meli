var axios = require('axios');

class ItemService {

  constructor() {}

  async getItems(query) {
    const { data } = await axios.get('https://api.mercadolibre.com/sites/MLA/search', { params: { q: query } });

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
        free_shipping: item.shipping.free_shipping
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
}

module.exports = ItemService;