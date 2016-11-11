class InvertedIndex {

  constructor() {
    //Array to hold concatenated text and title
    this.indexWords = [];
    //Object to hold the indexes
    this.index = {};
    this.searchResults = {};
  }

  /** 
   * @param{String} words - String to be tokonized
   * @return{Array} cleanContent
   */
  tokenize(words) {
    let cleanContent = words.trim().replace(/-/g, ' ')
      .replace(/[.,\/#!$%\^&@\*;:'{}=\_`~()]/g, '')
      .toLowerCase().split(' ').sort();
    return cleanContent;
  }

  /**
   * @param{String} words - The string to be filtered
   * @return{Array} tokens - Without duplicated words
   */
  uniqueWords(words) {
    let tokens = this.tokenize(words);
    return tokens.filter((item, index) => {
      return tokens.indexOf(item) === index;
    });

  }

  /**
   * @param{Array} jsonData - The contents of the JSON file to be indexed
   * @return{Object} index - That maps words to locations(documents)
   */
  createIndex(file) {
    let indexWords = [];
    let index = {};
    for (let document of file) {
      if (document.text) {
        indexWords.push(document.title.toLowerCase() + ' ' +
          document.text.toLowerCase());
      } else {
        return 'JSON file is Empty';
      }

    }
    const uniqueContent = this.uniqueWords(indexWords.join(' '));
    uniqueContent.forEach((word) => {
      index[word] = [];
      indexWords.forEach((document, indexPosition) => {
        if (document.indexOf(word) > -1) {
          index[word].push(indexPosition);
        }
      });
    });
    console.log(index);
    this.index = index;
    return index;
  }

  getIndex() {
    return this.index;
  }

  /**
   * @param{String} searchString - Search query
   * @return{Array} searchResults
   */
  searchIndex(searchString, searchIndex) {
    let searchResults = {};
    let searchTerms = this.uniqueWords(searchString);
    const self = this;
    for (let word of searchTerms) {
      if (searchIndex[word]) {
        searchResults[word] = searchIndex[word];
      } else {
        searchResults[word] = `We are Sorry but ${word} is not found in our database`;
      }

    }

    return searchResults;
  }

}