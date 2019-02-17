const expect = require('chai').expect;
const nock = require('nock');
const fs = require('fs');
const ItemService = require('../src/components/item/services');

nock('https://api.mercadolibre.com')
  .get('/sites/MLA/search?q=auto&limit=4&offset=0')
  .reply(200, JSON.parse(fs.readFileSync('./test/mocks/query_results.json', 'utf8')));
nock('https://api.mercadolibre.com')
  .get('/sites/MLA/search?q=perro&limit=4&offset=0')
  .reply(200, JSON.parse(fs.readFileSync('./test/mocks/query_results__no_results.json', 'utf8')));
nock('https://api.mercadolibre.com')
  .get('/sites/MLA/search?q=moto&limit=4&offset=0')
  .reply(200, JSON.parse(fs.readFileSync('./test/mocks/query_results__three_results.json', 'utf8')));
nock('https://api.mercadolibre.com')
  .get('/items/12345')
  .reply(200, JSON.parse(fs.readFileSync('./test/mocks/item_result.json', 'utf8')));
nock('https://api.mercadolibre.com')
  .get('/items/12345/description')
  .reply(200, JSON.parse(fs.readFileSync('./test/mocks/item_description_result.json', 'utf8')));
nock('https://api.mercadolibre.com')
  .get('/categories/MLA404041')
  .reply(200, JSON.parse(fs.readFileSync('./test/mocks/category_search.json', 'utf8')));
nock('https://api.mercadolibre.com')
  .persist()
  .get('/categories/MLA24278')
  .reply(200, JSON.parse(fs.readFileSync('./test/mocks/category_search.json', 'utf8')));

describe('ItemService', function() {
  describe('getItems', function() {
    it('should query for the word auto and return 4 results', async function() {
      const itemService = new ItemService();
      const result = await itemService.getItems({q: 'auto'});
      expect(result.items.length).to.eq(4);
    });

    it('should query for the word moto and return only 3 results', async function() {
      const itemService = new ItemService();
      const result = await itemService.getItems({q: 'moto'});
      expect(result.items.length).to.eq(3);
    });

    it('should query for the word perro and return no results', async function() {
      const itemService = new ItemService();
      const result = await itemService.getItems({q: 'perro'});
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

  describe('getAuthor', () => {
    it('returns the author name and lastname',() => {
      const itemService = new ItemService();
      const author = itemService.getAuthor();
      expect(author.name).to.eq('Rodrigo');
      expect(author.lastname).to.eq('Echeconea');
    });
  });

  describe('formatPrice', () => {
    it('returns the price divided in amount and decimals', () => {
      const itemService = new ItemService();
      const price = itemService.formatPrice({price: 9.99, currency_id: 'ARS'});
      expect(price.amount).to.eq(9);
      expect(price.decimals).to.eq(99);
      expect(price.currency).to.eq('$');
    })
  });

  describe('getMostFrequentCategory', () => {
    it('returns the most frequent category id', () => {
      const itemService = new ItemService();
      const items = [{category_id: 1}, {category_id: 2}, {category_id: 3}, {category_id: 1}, {category_id: 1}];
      const mostFrequentCategory = itemService.getMostFrequentCategory(items);
      expect(mostFrequentCategory).to.eq('1');
    });

    it('returns 0 if there are no categories', () => {
      const itemService = new ItemService();
      const mostFrequentCategory = itemService.getMostFrequentCategory([]);
      expect(mostFrequentCategory).to.eq(0);
    })
  });

  describe('calculatePagination', () => {
    it('returns the proper information for page 1 with more than ten pages', () => {
      const itemService = new ItemService();
      const paging = itemService.calculatePagination({offset: 0, total: 80});
      expect(paging.currentPage).to.eq(1);
      expect(paging.minPage).to.eq(1);
      expect(paging.maxPage).to.eq(10);
    });

    it('returns the proper information for page 1 with less than 10 pages', () => {
      const itemService = new ItemService();
      const paging = itemService.calculatePagination({offset: 0, total: 15});
      expect(paging.currentPage).to.eq(1);
      expect(paging.minPage).to.eq(1);
      expect(paging.maxPage).to.eq(5);
    });

    it('returns the proper information for page 2', () => {
      const itemService = new ItemService();
      const paging = itemService.calculatePagination({offset: 5, total: 15});
      expect(paging.currentPage).to.eq(2);
      expect(paging.minPage).to.eq(1);
      expect(paging.maxPage).to.eq(5);
    });
  });
});
