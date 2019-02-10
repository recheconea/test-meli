const expect = require('chai').expect;
const nock = require('nock');
const fs = require('fs');
const ItemService = require('../src/components/item/services');

nock('https://api.mercadolibre.com')
  .get('/sites/MLA/search?q=auto')
  .reply(200, JSON.parse(fs.readFileSync('./test/mocks/query_results.json', 'utf8')));
nock('https://api.mercadolibre.com')
  .get('/sites/MLA/search?q=moto')
  .reply(200, JSON.parse(fs.readFileSync('./test/mocks/query_results__four_category_levels.json', 'utf8')));
nock('https://api.mercadolibre.com')
  .get('/sites/MLA/search?q=casa')
  .reply(200, JSON.parse(fs.readFileSync('./test/mocks/query_results__no_categories.json', 'utf8')));
nock('https://api.mercadolibre.com')
  .get('/sites/MLA/search?q=perro')
  .reply(200, JSON.parse(fs.readFileSync('./test/mocks/query_results__no_results.json', 'utf8')));
nock('https://api.mercadolibre.com')
  .get('/items/12345')
  .reply(200, JSON.parse(fs.readFileSync('./test/mocks/item_result.json', 'utf8')));
nock('https://api.mercadolibre.com')
  .get('/items/12345/description')
  .reply(200, JSON.parse(fs.readFileSync('./test/mocks/item_description_result.json', 'utf8')));

describe('ItemService', function() {
  describe('getItems', function() {
    it('should query for the word auto and return 11 results', async function() {
      const itemService = new ItemService();
      const result = await itemService.getItems('auto');
      expect(result.items.length).to.eq(11);
    });

    it('should query for the word moto and have four categories', async function() {
      const itemService = new ItemService();
      const result = await itemService.getItems('moto');
      expect(result.categories.length).to.eq(4);
    });

    it('should query for the word casa and return no categories', async function() {
      const itemService = new ItemService();
      const result = await itemService.getItems('casa');
      expect(result.categories.length).to.eq(0);
    });

    it('should query for the word perro and return no results', async function() {
      const itemService = new ItemService();
      const result = await itemService.getItems('perro');
      expect(result.items.length).to.eq(0);
    });
  });

  describe('getItem', () => {
    it('creates a product description with fields from both endpoints', async () => {
      const itemService = new ItemService();
      const result = await itemService.getItem('12345');
      expect(result.item.id).to.eq('12345');
      expect(result.item.title).to.eq('Test product');
      expect(result.item.description).to.eq('test description');
    })
  });
});
