import React from 'react'
import { Route } from 'react-router-dom'

import './App.css'

import * as BooksAPI from './BooksAPI'
import SearchPage from './components/SearchPage'
import ListPage from './components/ListPage'


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

    return (
      <div className="app">
        <Route
          exact path="/Search" render={() => (
            <SearchPage onChangeShelf={this.onChangeShelf}/>
          )}
        />

        <Route
          exact path="/" render={() => (
            <ListPage books={books} onChangeShelf={this.onChangeShelf} />
          )}
        />
      </div>
    )
  }
}

export default BooksApp
