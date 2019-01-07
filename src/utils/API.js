import axios from "axios";

export default {
  // Gets all saved books
  getBooks: function() {
    return axios.get("/api/books");
  },
  // Gets the book with the given id
  getBook: function(id) {
    return axios.get("/api/books/" + id);
  },
  // Deletes the book with the given id
  deleteBook: function(id) {
    return axios.delete("/api/books/" + id);
  },
  // Saves a book to the database
  saveBook: function(bookData) {
    return axios.post("/api/books", bookData);
  },


  // This is used to pull back results from Google's book api. It does not interact with our MongoDB back end
  googleSearch: function(bookTitle, author) {
    // return axios.get (`https://www.googleapis.com/books/v1/volumes?q=${book}&key=${process.env.REACT_APP-API_KEY}`)
    return axios.get (`https://www.googleapis.com/books/v1/volumes?q=${bookTitle}+author:${author}&key=${process.env.REACT_APP_SECRET_API_KEY}`)

  }
  // Get - Will load your single HTML page in client/build/index.html
  // get: function() {
  //   return axios.get("/api")
  // }

};
