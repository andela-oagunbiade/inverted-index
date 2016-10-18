class invertedIndex{
	constructor(){
		this.filesIndexed = {};
		this.searchResults = {};
	}
    
    tokenize(arr) {
	    var tokenized = arr.replace(/[.,\/#!$%\^&@\*;:'{}=\-_`~()]/g, "").trim().toLowerCase().split(" ").sort();
	    console.log(tokenized);
	    return tokenized;    
	}
	
	uniqueWords(arr) {
		var tokens = this.tokenize(arr);
		return tokens.filter(function (item, pos) {
      		return tokens.indexOf(item) === pos;
		});
	}
}