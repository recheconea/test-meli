const expect = require('chai').expect;
const nock = require('nock');
const fs = require('fs');
const CategoryService = require('../src/components/categories/services');

nock('https://api.mercadolibre.com')
  .persist()
  .get('/categories/MLA24278')
  .reply(200, JSON.parse(fs.readFileSync('./test/mocks/category_search.json', 'utf8')));

describe('CategoryService', function() {
  describe('getBreadcrumbCategories', function() {
    it('should return an array with four categories', async () => {
      const categoryService = new CategoryService();
      const breadcrumb = await categoryService.getBreadcrumbCategories('MLA24278');
      expect(breadcrumb.length).to.eq(4);
    });
  });
});