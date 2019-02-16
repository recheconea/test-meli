var axios = require('axios');
var CategoryService = require('../categories/services');

const conditionMap = { new: 'Nuevo', used: 'Usado' };
const currencyMap = { ARS: '$', USD: 'U$S' };

class ItemService {

  constructor() {
    this.categoryService = new CategoryService();
  }

  async getItems(query) {
    const { data } = await axios.get('https://api.mercadolibre.com/sites/MLA/search', { params: { q: query, limit: 4 } });
    const items = data.results.map(item => {
      return {
        id: item.id,
        title: item.title,
        price: this.formatPrice(item),
        picture: item.thumbnail,
        condition: item.condition,
        free_shipping: item.shipping.free_shipping,
        city: item.address.state_name
      }
    });
    
    const mostFrequentCategoryId = this.getMostFrequentCategory(data.results)
    const categories = await this.categoryService.getBreadcrumbCategories(mostFrequentCategoryId);

    return  {
      items: items,
      categories: [],
      author: this.getAuthor(),
      categories: categories
    };
  }

  async getItem(id) {
    const responses = await Promise.all([axios.get(`https://api.mercadolibre.com/items/${id}`), axios.get(`https://api.mercadolibre.com/items/${id}/description`)])
    const itemData = responses[0].data;
    const itemDescription = responses[1].data;

    const picture = itemData.pictures.length > 1 ? itemData.pictures[0].url : itemData.thumbnail;
    const categories = await this.categoryService.getBreadcrumbCategories(itemData.category_id);

    return {
      author: this.getAuthor(),
      item: {
        id: id,
        title: itemData.title,
        price: this.formatPrice(itemData),
        picture: picture,
        condition: conditionMap[itemData.condition],
        free_shipping: itemData.shipping.free_shipping,
        sold_quantity: itemData.sold_quantity,
        description: itemDescription.plain_text
      },
      categories: categories
    }
  }

  formatPrice(itemData) {
    const amount = parseInt(itemData.price);
    const decimals = (itemData.price - amount).toFixed(2) * 100;
    return {
      currency: currencyMap[itemData.currency_id],
      amount: amount,
      decimals: decimals,
    }
  }

  getAuthor() {
    return {
      name: 'Rodrigo',
      lastname: 'Echeconea'
    };
  }

  getMostFrequentCategory(items) {
    let categories = {};
    items.forEach((item) => categories[item.category_id] = categories[item.category_id] ? categories[item.category_id] + 1 : 1);
    return Object.keys(categories).reduce((max, key) => max > categories[key] ? max : key, 0);
  }
}

module.exports = ItemService;