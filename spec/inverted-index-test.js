'use strict';

//A test suite to read book data
describe('Inverted Index Suite', function () {
  let newIndex, books, emptybook, mySearch, sampleString;

  beforeEach(function () {
    //Create an instance of the Index class
    newIndex = new InvertedIndex();

    //Test files to be used in the Index
    books = [{
      'title': 'Heroku',
      'text': 'You will be asked to enter your Heroku credentials the first time you run a command; after the first time, your email address and an API token will be saved'
    }, {
      'title': 'Coveralls',
      'text': 'See the latest code-coverage statistics on all of your repositories including the total percentages covered and the lines covered.'
    }];

    emptybook = [{}];

    sampleString = 'As &you can see here, we have defined *the function, useCounter(), as the target of the self-executing function %block.';

    mySearch = ['your', 'all', 'andela'];

    newIndex.createIndex(books);
  });

  describe('Class Inverted Index', function () {
    it('Inverted Index should be a class', function () {
      expect(newIndex instanceof InvertedIndex).toBe(true);
      expect(newIndex instanceof Object).toBe(true);
      expect(typeof (newIndex)).toBe('object');
    });

  });

  describe('Tokenize String Method', function () {
    it('Method tokenize should be available in class InvertedIndex',
      function () {
        expect(newIndex.tokenize(sampleString)).toBeDefined();
      });
    it('Method tokenize should return an array containing\
     alphabets only', function () {
      expect(newIndex.tokenize(sampleString)).not.toContain('&');
    });
    it('Method tokenize should return an array containing the correct\
     number of words', function () {
      expect(newIndex.tokenize(sampleString).length).toBe(20);
    });
  });

  describe('Unique Words Method', function () {
    it('Method uniqueWords should be available in class InvertedIndex', function () {
      expect(newIndex.uniqueWords(sampleString)).toBeDefined();
    });
    it('Returns an array of words without duplicates', function () {
      expect(newIndex.uniqueWords(sampleString).length).toBe(16);
    });
  });

  describe('Read Book Data', function () {
    it('createIndex should be available in class InvertedIndex', function () {
      expect(newIndex.createIndex(books)).toBeDefined();
    });
    it('JSON file should not be empty', function () {
      expect(newIndex.createIndex(emptybook)).toBe('JSON file is Empty');
    });
  });

  describe('Populate Index', function () {
    it('Index should be created', function () {
      expect(newIndex.index.heroku).toBeDefined();
    });
    it('Accurately map words to their document location', function () {
      expect(Object.keys(newIndex.index).length).toBe(38);
      expect(JSON.stringify(newIndex.index.your)).toBe(JSON.stringify([0, 1]));
    });
  });

  describe('Get Index Method', function () {
    it('Returns accurate index Object of the indexed JSON file', function () {
      expect(Object.keys(newIndex.getIndex()).length).toBe(38);
    });
  });

  describe('Search Index', function () {
    it('Method searchIndex should be accessible', function () {
      expect(newIndex.searchIndex(' ')).toBeDefined();
    });
    it('It should return correct index for each word', function () {
      expect(JSON.stringify(newIndex.searchIndex('heroku')))
        .toBe(JSON.stringify({
          'heroku': [0]
        }));
      expect(JSON.stringify(newIndex.searchIndex('your')))
        .toBe(JSON.stringify({
          'your': [0, 1]
        }));
      expect(JSON.stringify(newIndex.searchIndex('amity')))
        .toBe(JSON.stringify({
          'amity': 'We are Sorry but amity is not found in our database'
        }));
    });
  });

});