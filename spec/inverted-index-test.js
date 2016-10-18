"use strict";

    //A test suite to read book data
describe("Inverted Index Suite", function(){
    let newIndex, book1, book2;
        
    beforeEach(function(){
        //Create an instance of the Index class
        newIndex = new Index();
        
        //Test files to be used in the Index
        book1 = [
            {
                "title": "Grouping Related Specs",
                "text": "The describe function is for grouping related specs. The string parameter is for naming the collection of specs."
            },
            {
                "title": "Setup and Teardown",
                "text": "To help a test suite DRY up any duplicated setup and teardown code, Jasmine provides the global beforeEach and afterEach functions."
            },
        ];
        book2 = [
            {
                "title": "Hound Documentation",
                "text": "Want to modify style rules to better suit your preferences? Below you will find documentation on configuring style rules for each linter that we support."
            },
            {
                "title": "Hound Configuration",
                "text": "All supported linters, except the ones in beta, are enabled by default. Hound will look for a custom configuration file named .hound.yml in the root directory of your project."
            },
        ];
    });

    describe("Suite to Read Data", function(){
        it("JSON file should not be empty", function(){
            const free=newIndex.createIndex(book1);
            expect(free).toBeDefined();
            expect(free[0].title).toBeDefined();
        });
    });
        
});