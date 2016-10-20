class InvertedIndex{
	
	constructor() {
		/**
		 * Initialize an empty array to hold the
		 * concantenated words formed from title and text
		 * contents.
		 */ 
		this.indexWords = [];
		/**
		 * Initialize an empty object to hold the mapping
		 * of the words to their file location 
		 */
		this.index ={};
	}
	
	/**
	 * This Method returns an array of tokens/words from the provided input
	 * after removing special characters and white spaces
	 * @params{String} str - String to be tokonized
	 */
	tokenize(str) {
	    var cleanString = str.trim().replace(/-/g, " ").replace(/[.,\/#!$%\^&@\*;:'{}=\_`~()]/g, "").toLowerCase().split(" ").sort();
	    return cleanString;
	}
	
	/**
	 * This method returns an array of tokenized unique words
	 * of the provided input 
	 * @params{String} str - The string to be filtered
	 */
	uniqueWords(str) {
		var tokens = this.tokenize(str);
		return tokens.filter(function (item, pos) {
      		return tokens.indexOf(item) === pos;
		});
	}

	/**
	 * This method creates an index and updates the index object
	 * Also populates the indexWords array with contents of supplied data
	 * @params{Array} jsonData - The contents of the JSON file that is to be indexed
	 */
	createIndex(jsonData) {
		for (let i of jsonData) {
			//Iterate through the jsonData and store contents in an array
			this.indexWords.push(i.title.toLowerCase() + " " + i.text.toLowerCase());
		}
		
		/**
		 * Join the contents of the array to create a string
		 * And call the uniqueWords method on the string
		 */
		const uniqueContent = this.uniqueWords(this.indexWords.join(" "));
		
		/**
		 * To maintain the context of the "this" keyword,
		 * set it equal to a variable to be used in its place 
		 */
		var self = this;

		/**
		 * Create the index of the array by looping the uniqueContent
		 * array and mapping the location of each word to its document
		 * and adding the results into the Index object
		 */
		uniqueContent.forEach(function(word) {
			self.index[word] = [];
			
			self.indexWords.forEach(function(document, pos) {
				if (document.indexOf(word) > -1) {
					self.index[word].push(pos); 
				}
			});
		});
		return self.index;
	}
}