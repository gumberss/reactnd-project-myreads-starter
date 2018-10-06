import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'

import SearchPage from './components/SearchPage'
import Bookshelf from './components/Books/Bookshelf'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then(books => {

        this.setState(prevState => ({
          books: books
        }));

      });
  }

  onChangeShelf = (targetShelf, book) => {
    BooksAPI.update(book, targetShelf)
      .then(shelves => {
        this.setState(prevState => {

          book.shelf = targetShelf;

          var indexOfBook = prevState.books.indexOf(book);
          prevState.books.splice(indexOfBook, 1);

          return {
            books: [...prevState.books, book]
          };

        });
      });
  }

  render() {

    var { books } = this.state;

    var currentlyReading = books.filter(book => book.shelf === 'currentlyReading');
    var wantToRead = books.filter(book => book.shelf === 'wantToRead');
    var read = books.filter(book => book.shelf === 'read');

    return (
      <div className="app">
        {this.state.showSearchPage ? (<SearchPage />) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <Bookshelf title="Currently Reading" books={currentlyReading} onChangeShelf={this.onChangeShelf} />
              <Bookshelf title="Want to Read" books={wantToRead} onChangeShelf={this.onChangeShelf} />
              <Bookshelf title="Read" books={read} onChangeShelf={this.onChangeShelf} />
            </div>
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
