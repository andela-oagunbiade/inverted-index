[![Build Status](https://travis-ci.org/andela-oagunbiade/inverted-index.svg?branch=develop)](https://travis-ci.org/andela-oagunbiade/inverted-index.svg?branch=develop)
[![Coverage Status](https://coveralls.io/repos/github/andela-oagunbiade/inverted-index/badge.svg?branch=develop)](https://coveralls.io/github/andela-oagunbiade/inverted-index?branch=develop)
[![Code Climate](https://codeclimate.com/github/andela-oagunbiade/inverted-index/badges/gpa.svg)](https://codeclimate.com/github/andela-oagunbiade/inverted-index)

# Inverted-Index
An application that takes in a JSON array of text objects and creates an index from the array allowing users to search for words contained in the array.

## Key Features
- Upload of JSON file in below format.
```
[
    {"title": "Heroku",
    "text":"You will be asked to enter your Heroku credentials the first time you run a command; after the first time, your email address and an API token will be saved"
    },
    {"title": "Coveralls",
    "text": "See the latest code-coverage statistics on all of your repositories including the total percentages covered and the lines covered."
    }         
]
```
- Creates Index of all documents with title and text keys in uploaded file.
- Searching of indexed files.

## How to use
- Web use
Available via heroku hosted platform on : [https://inverted-index-ore.herokuapp.com](https://inverted-index-ore.herokuapp.com/).
It can also be used locally by following the steps below

- Local Machine 
```
git clone https://github.com/andela-oagunbiade/inverted-index.git
```
#### Change directory into inverted-index and follow the steps below.
1. Install all the dependencies (you must have installed [Nodejs](nodejs.org)):
```
npm install
```

2. Run Tests for the application with:
```
npm test
```
3. Start the Application with:
```
npm Start
```
and access on your browser via http://localhost:3000/ or 

To also access Developer features such as Browser-sync; run the Task-runner with:
```
gulp 
```



#### The application is written with the following Services & Javascript Technologies:
- Gulp (Task Runner)
- Karma (Generate Test Coverage Folder)
- Jasmine (Test Runner)
- Travis CI (For Continous Integration and badge)
- Coveralls (To compute Test Coverage % and badge)
- Hound (To prevent style violations)
- Codeclimate (For styling badge)
- AngularJs (For Manipulating model responsive views)
- Material lite Design (For View Styling)


#### Application Limitations
- This version of the app does not yet feature multiple file uploads
- It only takes in single search queries
