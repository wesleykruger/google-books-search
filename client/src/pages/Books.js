import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import DeleteBtn from "../components/DeleteBtn";
import SaveBtn from "../components/SaveBtn";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, FormBtn } from "../components/Form";

class Books extends Component {
  // Setting our component's initial state
  state = {
    books: [],
    search: [],
    title: "",
    author: "",
  };

  // When the component mounts, load all books and save them to this.state.books
  componentDidMount() {
    this.loadBooks();
  }

  // Loads all books  and sets them to this.state.books
  loadBooks = () => {
    API.getBooks()
      .then(res =>
        this.setState({ books: res.data, title: "", author: "", description: "", thumbnail: "", infoLink: "" })
      )
      .catch(err => console.log(err));
  };

  saveBooks = (title, author, description, thumbnail, infoLink) => {
    API.saveBook({title: title, author:author, description:description, image: thumbnail, link: infoLink})
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  }

  // Deletes a book from the database with a given id, then reloads books from the db
  deleteBook = id => {
    API.deleteBook(id)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };

  // Handles updating component state when the user types into the input field
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  // When the form is submitted, use the API.saveBook method to save the book data
  // Then reload books from the database
  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.title || this.state.author) {
      API.googleSearch(
        this.state.title,
        this.state.author,
      )
        .then(res => {
          this.setState({search: res.data.items})
    })
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>Add a Book to Your Reading List!</h1>
            </Jumbotron>
            <form>
              <Input
                value={this.state.title}
                onChange={this.handleInputChange}
                name="title"
                placeholder="Title"
              />
              <Input
                value={this.state.author}
                onChange={this.handleInputChange}
                name="author"
                placeholder="Author"
              />

              <FormBtn
                disabled={!(this.state.author || this.state.title)}
                onClick={this.handleFormSubmit}
              >
                Book Search
              </FormBtn>
            </form>
          </Col>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>My List</h1>
            </Jumbotron>
            {this.state.books.length ? (
              <List>
                {this.state.books.map(book => {
                  return (
                    <ListItem key={book._id}>
                      <Row>
                      <img src={book.image} />
                      </Row>
                      <Row>
                      <a href={"/books/" + book._id}>
                      <strong>
                          {book.title} by {book.author}
                        </strong>
                      </a>
                      </Row>
                      <Row>
                        <Col size="md-9"></Col>
                        <Col size="md-3">
                          <DeleteBtn onClick={() => this.deleteBook(book._id)} />
                        </Col>
                      </Row>
                    </ListItem>
                  );
                })}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
        <Row>
          <Col size="md-6">
          <h3>Results area</h3>
          </Col>
        </Row>
        <Row>
          <Col size="md-6">
          {this.state.search ?
          <List>
          {this.state.search.map(result => (
            <ListItem key={result.id}>
            <Row>
              <img src={result.volumeInfo.imageLinks.thumbnail} />
            </Row>
            <Row>
              <a href={result.volumeInfo.infoLink} alt="searchResult" target="_blank" rel="noopener noreferrer">
            {result.volumeInfo.title}
            <span><br /></span>
            by {result.volumeInfo.authors[0]}
            </a>
            </Row>
            <Row>
              <Col size="md-12">
                {result.volumeInfo.description ?
                  result.volumeInfo.description.substr(0,250):
                  "No Description available"}
              </Col>
            </Row>
            <Row>
              <Col size="md-9"></Col>
              <Col size="md-3">
                <SaveBtn onClick={() => this.saveBooks(result.volumeInfo.title, result.volumeInfo.authors, result.volumeInfo.description, result.volumeInfo.imageLinks.thumbnail, result.volumeInfo.infoLink)} />
              </Col>
            </Row>
            </ListItem>
            ))}
              </List>
              : <h3>No results found</h3>}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Books;