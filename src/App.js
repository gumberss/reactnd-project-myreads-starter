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

  async componentDidMount() {
    const books = await BooksAPI.getAll();
    this.setState(books);
  }

  onChangeBooks = books => {
    this.setState(books);
  }

  onChangeShelf = (targetShelf, book) => {

    return BooksAPI.update(book, targetShelf)
      .then(() => {
        book.shelf = targetShelf;
        
        this.setState(prevState => ({
            books: prevState.books.filter(b => b.id !== book.id).concat([book])
        }));
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
              onChangeBooks={this.onChangeBooks}
            />
          )}
        />
      </div>
    )
  }
}

export default BooksApp
