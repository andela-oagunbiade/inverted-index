/**
 * Inverted index class
 */
class InvertedIndex {
  /**
   * Inverted index constructor
   */
  constructor() {
    // Object to hold the index
    this.index = {};
  }

  /**
   * @param{String} words - String to be tokonized
   * @return{Array} cleanContent
   */
  tokenize(words) {
    const cleanContent = words.trim().replace(/-/g, ' ')
      .replace(/[.,\/#!$%\^&@\*;:'{}=\_`~()]/g, '')
      .toLowerCase()
      .split(' ')
      .sort();
    return cleanContent;
  }

  /**
   * @param{String} words - The string to be filtered
   * @return{Array} tokens - Without duplicated words
   */
  uniqueWords(words) {
    const tokens = this.tokenize(words);
    return tokens.filter((item, index) => tokens.indexOf(item) === index);
  }

  /**
   * @param{Array} fileToIndex - Array of contents of the JSON file to index
   * @return{Object} index - That maps words to locations(documents)
   */
  createIndex(fileToIndex) {
    const wordsToIndex = [];
    const index = {};
    const fileLength = fileToIndex.length;
    if (fileLength === 0) {
      return 'JSON file is Empty';
    }
    fileToIndex.forEach((document) => {
      if (document.text) {
        wordsToIndex
          .push(`${document.title.toLowerCase()} ${document.text
            .toLowerCase()}`);
      }
    });
    const uniqueContent = this.uniqueWords(wordsToIndex.join(' '));
    uniqueContent.forEach((word) => {
      index[word] = [];
      wordsToIndex.forEach((document, indexPosition) => {
        if (document.indexOf(word) > -1) {
          index[word].push(indexPosition);
        }
      });
    });
    this.index = index;
    return index;
  }

  /**
   * @return{Object} index - That maps words to locations(documents)
   */
  getIndex() {
    return this.index;
  }

  /**
   * @param{String} searchWords - Search query
   * @param{String} indexToSearch - Index to query
   * @return{Object} searchResults - Maps searched words to document locations
   */
  searchIndex(searchWords, indexToSearch) {
    const searchResults = {};
    const searchTerms = this.uniqueWords(searchWords);
    searchTerms.forEach((word) => {
      if (indexToSearch[word]) {
        searchResults[word] = indexToSearch[word];
      } else {
        searchResults[word] = `We are Sorry but ${word} is not found in our database`;
      }
    });
    return searchResults;
  }

}
