class InvertedIndex {

  constructor() {
    //Array to hold concatenated text and title
    this.indexWords = [];
    //Object to hold the indexes
    this.index = {};

    this.searchResults = {};
  }

  /** 
   * @param{String} str - String to be tokonized
   * @return{Array} cleanContent
   */
  tokenize(str) {
    let cleanContent = str.trim().replace(/-/g, ' ')
      .replace(/[.,\/#!$%\^&@\*;:'{}=\_`~()]/g, '')
      .toLowerCase().split(' ').sort();
    return cleanContent;
  }

  /**
   * @param{String} str - The string to be filtered
   * @return{Array} tokens - Without duplicated words
   */
  uniqueWords(str) {
    let tokens = this.tokenize(str);
    return tokens.filter(function (item, pos) {
      return tokens.indexOf(item) === pos;
    });
  }

  /**
   * @param{Array} jsonData - The contents of the JSON file to be indexed
   * @return{Object} index - That maps words to locations(documents)
   */
  createIndex(jsonData) {
    for (let i of jsonData) {
      if (i.text) {
        this.indexWords.push(i.title.toLowerCase() + ' ' +
          i.text.toLowerCase());
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
   * @param{String} searchString - Search query
   * @return{Array} searchResults
   */
  searchIndex(searchString) {
    this.searchResults = {};
    let searchTerms = this.uniqueWords(searchString);
    const self = this;
    for (let word of searchTerms) {
      if (self.index[word]) {
        self.searchResults[word] = self.index[word];
      } else {
        self.searchResults[word] = `We are Sorry but ${word} is not found in our database`;
      }
      
    }

    return (self.searchResults);
  }

}