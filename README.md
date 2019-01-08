# Google Books Search
This is a React application developed using MongoDB and Google's book API. It is a proof of concept for a to-read list that someone might keep in persistant storage online.

## Getting Started
This app is hosted on Heroku and can be accessed at: https://wkruger-google-book-search.herokuapp.com/. To run it locally, you will need NPM/Yarn and the project's associated packages. Run start from the root of the project, not from within the client folder.

## Running the project
This program allows the user to search for a book by title or author, and then add any of the results returned by Google's API to their reading list. This is stored in a Mongo database using mLab on Heroku. The site consists of two pages, Search and Saved, which are linked together using React-Router-DOM. Clicking the Add button on a result from the Search page will store the book's information in our Mongo database and will be visible on the Saved page.

## Todo
   * There is currently no visual indication to the user that a book has already been added to their saved list. The book array in the application state needs to be used to better notify the user of this information.
   * The site could definitely be prettied up a bit.

### Project made using:

   * React
   * React-DOM
   * React-Router-DOM
   * Axios
   * Mongoose
   
   

Created by Wes Kruger
