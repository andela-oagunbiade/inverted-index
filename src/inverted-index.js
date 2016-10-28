class InvertedIndex {

  constructor() {
    //Array to hold concatenated text and title
    this.indexWords = [];
    //Object to hold the indexes
    this.index = {};

    this.searchResults = [];
  }

  /**
   * This Method returns an array of tokens/words 
   * @param{String} str - String to be tokonized
   */
  tokenize(str) {
    let cleanContent = str.trim().replace(/-/g, ' ').replace(/[.,\/#!$%\^&@\*;:'{}=\_`~()]/g, '').toLowerCase().split(' ').sort();
    return cleanContent;
  }

  /**
   * This method returns an array of tokenized unique words
   * @param{String} str - The string to be filtered
   */
  uniqueWords(str) {
    let tokens = this.tokenize(str);
    return tokens.filter(function (item, pos) {
      return tokens.indexOf(item) === pos;
    });
  }

  /**
   * This method creates an index and updates the index object
   * Also populates the indexWords array with contents of supplied data
   * @param{Array} jsonData - The contents of the JSON file that is to be indexed
   */
  createIndex(jsonData) {
    for (let i of jsonData) {
      if (i.text) {
        this.indexWords.push(i.title.toLowerCase() + ' ' + i.text.toLowerCase());
      } else {
        return 'JSON file is Empty';
      }
    }

    const uniqueContent = this.uniqueWords(this.indexWords.join(' '));

    const self = this;

    uniqueContent.forEach(function (word) {
      self.index[word] = [];

      self.indexWords.forEach(function (document, pos) {
        if (document.indexOf(word) > -1) {
          self.index[word].push(pos);
        }
      });
    });
    return self.index;
  }

  getIndex() {
    return this.index;
  }

  /**
   * This Method allows a user to search through indexed files
   * Returns the document containing the search word if found
   * @param{String} queryString - Search query
   */
  searchIndex(search) {
    if (this.index[search]) {
      this.searchResults = [];
      for (let x in this.index[search]) {
        let documentIndex = this.index[search][x];
        this.searchResults.push(documentIndex);
      }
      return this.searchResults;
    } else {
      return 'We are Sorry but ' + search + ' is not found in our database';
    }
  }
}