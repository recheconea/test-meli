var axios = require('axios');

class CategoryService {  
	async getCategory(category_id) {
    const { data } = await axios.get(`https://api.mercadolibre.com/categories/${category_id}`);
    return data;
  }

  async getBreadcrumbCategories(category_id) {
    const breadcrumbCategories = await this.getCategory(category_id);
    return breadcrumbCategories.path_from_root;
  }
}

module.exports = CategoryService;