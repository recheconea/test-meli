var axios = require('axios');
var CategoryService = require('../categories/services');

const conditionMap = { new: 'Nuevo', used: 'Usado' };
const currencyMap = { ARS: '$', USD: 'U$S' };
const resultsPerPage = 4;

class ItemService {

  constructor() {
    this.categoryService = new CategoryService();
  }

  async getItems(query) {
    const params = {
      q: query.q,
      limit: resultsPerPage,
      offset: query.page ? query.page * resultsPerPage : 0
    }
    const { data } = await axios.get('https://api.mercadolibre.com/sites/MLA/search', { params: params });
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
    
    const mostFrequentCategoryId = this.getMostFrequentCategory(data.results);
    const categories = [];
    if (mostFrequentCategoryId > 0) {
      categories = await this.categoryService.getBreadcrumbCategories(mostFrequentCategoryId);
    }

    return  {
      items: items,
      author: this.getAuthor(),
      categories: categories,
      pagination: this.calculatePagination(data.paging)
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
    return Object.keys(categories).reduce((max, key) => categories[max] > categories[key] ? max : key, 0);
  }

  calculatePagination(paging) {
    const totalPages = Math.ceil(paging.total / resultsPerPage) + 1;
    const currentPage = paging.offset == 0 ? 1 : Math.ceil(paging.offset / resultsPerPage);
    let minPage = 0;
    let maxPage = 0;
    if (currentPage == 1) {
      minPage = 1;
      maxPage = Math.min(totalPages, 10);
    } else if (totalPages == currentPage) {
      minPage = Math.max(currentPage - 10, 1);
      maxPage = currentPage;
    } else {
      minPage = Math.max(currentPage - 5, 1);
      maxPage = Math.min(currentPage + 5, totalPages);
    }

    return {
      minPage: minPage,
      maxPage: maxPage,
      currentPage: currentPage
    }
  }
}

module.exports = ItemService;