'use strict';

const books = require('./books');

// A test suite to read book data
describe('Inverted Index Suite', () => {
  //Create an instance of the Index class
  const newIndex = new InvertedIndex();
  const emptyBook = [];
  const sampleSentence = 'As &you can see here, you have defined *the function';
  const mySearch = ['your', 'all', 'andela'];
  newIndex.createIndex(books);

  describe('Class Inverted Index', () => {
    it('should be a class', () => {
      expect(newIndex instanceof InvertedIndex).toBe(true);
      expect(newIndex instanceof Object).toBe(true);
      expect(typeof (newIndex)).toBe('object');
    });
  });

  describe('Tokenize String Method', () => {
    it('should be available in class InvertedIndex', () => {
        expect(newIndex.tokenize).toBeDefined();
      });
    it('should return an array containing alphabets only', () => {
      expect(newIndex.tokenize(sampleSentence)).not.toContain('&');
    });
    it('should return an array containing the correct number of words', () => {
      expect(newIndex.tokenize(sampleSentence).length).toBe(10);
    });
  });

  describe('Unique Words Method', () => {
    it('should be available in class InvertedIndex', () => {
      expect(newIndex.uniqueWords).toBeDefined();
    });
    it('should return an array of words without duplicates', () => {
      expect(newIndex.uniqueWords(sampleSentence).length).toBe(9);
    });
  });

  describe('Read Book Data', () => {
    it('should have createIndex available in class InvertedIndex', () => {
      expect(newIndex.createIndex).toBeDefined();
    });
    it('should ensure the JSON file is not empty', () => {
      expect(newIndex.createIndex(emptyBook)).toBe('JSON file is Empty');
      expect(newIndex.createIndex(books)).not.toBe('JSON file is Empty');
    });
  });

  describe('Populate Index', () => {
    it('should have an Index created', () => {
      expect(newIndex.index.heroku).toBeDefined();
    });
    it('should accurately map words to their document location', () => {
      expect(Object.keys(newIndex.index).length).toBe(38);
      expect(newIndex.index.heroku).toEqual([0]);
      expect(newIndex.index.your).toEqual([0, 1]);
    });
  });

  describe('Get Index Method', () => {
    it('should return an accurate index Object of the indexed file', () => {
      expect(Object.keys(newIndex.getIndex()).length).toBe(38);
    });
  });

  describe('Search Index', () => {
    it('should have searchIndex method accessible in the class', () => {
      expect(newIndex.searchIndex).toBeDefined();
    });
    it('should return correct index for each word', () => {
      expect(newIndex.searchIndex('heroku', newIndex.getIndex())).toEqual({
        'heroku': [0]
      });
      expect(newIndex.searchIndex('your', newIndex.getIndex())).toEqual({
        'your': [0, 1]
      });
      expect(newIndex.searchIndex('amity', newIndex.getIndex())).toEqual({
        'amity': 'We are Sorry but amity is not found in our database'
      });
    });
  });

});
