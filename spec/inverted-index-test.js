'use strict';

//A test suite to read book data
describe('Inverted Index Suite', () => {

  //Create an instance of the Index class
  const newIndex = new InvertedIndex();
  //Test files to be used in the Index
  const books = [{
    'title': 'Heroku',
    'text': 'You will be asked to enter your Heroku credentials the first time you run a command; after the first time, your email address and an API token will be saved'
  }, {
    'title': 'Coveralls',
    'text': 'See the latest code-coverage statistics on all of your repositories including the total percentages covered and the lines covered.'
  }];

  const emptybook = [{}];
  const sampleString = 'As &you can see here, we have defined *the function, useCounter(), as the target of the self-executing function %block.';
  const mySearch = ['your', 'all', 'andela'];
  newIndex.createIndex(books);

  describe('Class Inverted Index', () => {
    it('Inverted Index should be a class', () => {
      expect(newIndex instanceof InvertedIndex).toBe(true);
      expect(newIndex instanceof Object).toBe(true);
      expect(typeof (newIndex)).toBe('object');
    });

  });

  describe('Tokenize String Method', () => {
    it('Method tokenize should be available in class InvertedIndex',
      () => {
        expect(newIndex.tokenize).toBeDefined();
      });
    it('Method tokenize should return an array containing\
     alphabets only', () => {
      expect(newIndex.tokenize(sampleString)).not.toContain('&');
    });
    it('Method tokenize should return an array containing the correct\
     number of words', () => {
      expect(newIndex.tokenize(sampleString).length).toBe(20);
    });
  });

  describe('Unique Words Method', () => {
    it('Method uniqueWords should be available in class InvertedIndex', () => {
      expect(newIndex.uniqueWords).toBeDefined();
    });
    it('Returns an array of words without duplicates', () => {
      expect(newIndex.uniqueWords(sampleString).length).toBe(16);
    });
  });

  describe('Read Book Data', () => {
    it('createIndex should be available in class InvertedIndex', () => {
      expect(newIndex.createIndex).toBeDefined();
    });
    it('JSON file should not be empty', () => {
      expect(newIndex.createIndex(emptybook)).toBe('JSON file is Empty');
    });
  });

  describe('Populate Index', () => {
    it('Index should be created', () => {
      expect(newIndex.index.heroku).toBeDefined();
    });
    it('Accurately map words to their document location', () => {
      expect(Object.keys(newIndex.index).length).toBe(38);
      expect(newIndex.index.your).toEqual([0, 1]);
    });
  });

  describe('Get Index Method', () => {
    it('Returns accurate index Object of the indexed JSON file', () => {
      expect(Object.keys(newIndex.getIndex()).length).toBe(38);
    });
  });

  describe('Search Index', () => {
    it('Method searchIndex should be accessible', () => {
      expect(newIndex.searchIndex).toBeDefined();
    });
    it('It should return correct index for each word', () => {
      expect(newIndex.searchIndex('heroku')).toEqual({
        'heroku': [0]
      });
      expect(newIndex.searchIndex('your')).toEqual({
        'your': [0, 1]
      });
      expect(newIndex.searchIndex('amity')).toEqual({
        'amity': 'We are Sorry but amity is not found in our database'
      });
    });
  });

});