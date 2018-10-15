import React from 'react'
import { Route } from 'react-router-dom'

import './App.css'

import * as BooksAPI from './BooksAPI'
import SearchPage from './components/SearchPage'
import ListPage from './components/ListPage'
import AddOrUpdateBookInArray from './services/AddOrUpdateBookInArray'

class BooksApp extends React.Component {
  state = {
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

    return BooksAPI.update(book, targetShelf)
      .then(() => {
        this.setState(prevState => {

          book.shelf = targetShelf;

          var newBooks = AddOrUpdateBookInArray(book, prevState.books);

          return {
            books: newBooks
          };

        });
      });
  }

  render() {

    var { books } = this.state;

    return (
      <div className="app">
        <Route
          exact path="/Search" render={() => (
            <SearchPage
              onChangeShelf={this.onChangeShelf}
              booksInShelves={books}
            />
          )}
        />

        <Route
          exact path="/" render={() => (
            <ListPage
              books={books}
              onChangeShelf={this.onChangeShelf}
            />
          )}
        />
      </div>
    )
  }
}

export default BooksApp
