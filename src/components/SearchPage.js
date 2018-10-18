import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import TextSerach from './external/TextSerach'
import Bookshelf from './books/Bookshelf'
import SelectedBooksAction from './others/SelectedBooksAction'

import * as BooksAPI from '../BooksAPI'

import FillShelfService from '../services/FillShelfService'

export default class SearchPage extends React.Component {

  static propTypes = {
    booksInShelves: PropTypes.array.isRequired,
    onChangeShelf: PropTypes.func.isRequired
  }

  state = {
    searchData: '',
    message: '',
    books: []
  }

  onChangeSearchData = newSearchData => {

    this.setState({
      searchData: newSearchData
    });

    if (!newSearchData) {
      this.setState({
        books: [],
        message: ''
      });
      return;
    }

    BooksAPI.search(newSearchData)
      .then(books => {

        !books && this.setState({
          books: [],
          message: ''
        });

        books && books.error && this.setState({
          books: [],
          message: 'Não foi encontrado resultado para sua pesquisa'
        });

        if (books && !books.error) {

          var booksWithShelf = FillShelfService(books, this.props.booksInShelves);

          booksWithShelf.forEach(book => book.selected = false);

          this.setState({
            books: booksWithShelf,
            message: `Foram encontrados ${books.length} livro(s) pelo seu filtro`
          });
        }
      });
  }

  onChangeBooks = books => {

    this.setState(books);
  }

  render() {

    var { searchData, message, books } = this.state;
    var { onChangeShelf } = this.props;

    var countSelectedBooks = books.filter(book => book.selected).length;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            to="/"
            className="close-search"
          >
            Close
          </Link>

          <div className="search-books-input-wrapper">
            {/* https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md */}
            <TextSerach placeholder="Search by title or author"
              onChange={this.onChangeSearchData}
            />
          </div>
        </div>
        {
          searchData && (
            <div className="filter-message">
              <span>{message}</span>
            </div>
          )
        }

        <SelectedBooksAction
          countSelectedBooks={countSelectedBooks}
          onChangeShelf={onChangeShelf}
          books={books}
        />

        <div className="search-books-results">
          <ol className="books-grid">
            <Bookshelf
              books={books}
              onChangeShelf={onChangeShelf}
              onChangeBooks={this.onChangeBooks}
            />
          </ol>
        </div>
      </div>
    )
  }
}