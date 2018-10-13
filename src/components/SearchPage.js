import React from 'react'
import { Link } from 'react-router-dom'

import TextSerach from './external/TextSerach'
import Book from './books/Book'
import * as BooksAPI from '../BooksAPI'

export default class SearchPage extends React.Component {

  state = {
    searchData: '',
    message: '',
    books: []
  }

  onChangeSearchData = event => {

    this.setState(() => ({
      searchData: event
    }));

    if (!this.searchData) {
      this.setState({
        books: [],
        message: ''
      });
    }

    BooksAPI.search(event)
      .then(books => {

        !books && this.setState({
          books: [],
          message: ''
        });

        books && books.error && this.setState({
          books: [],
          message: 'Não foi encontrado resultado para sua pesquisa'
        });

        books && !books.error && this.setState({
          books: books,
          message: `Foram encontrados ${books.length} livro(s) pelo seu filtro`
        });
      });
  }

  render() {

    var { searchData, message, books } = this.state;
    var { onChangeShelf } = this.props;


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
            {/*
                    NOTES: The search from BooksAPI is limited to a particular set of search terms.
                    You can find these search terms here:
                    https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
  
                    However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                    you don't find a specific author or title. Every search is limited by search terms.
                  */}
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

        <div className="search-books-results">
          <ol className="books-grid">
            {
              books.map(book => (
                <li key={book.id}>
                  <Book
                    book={book}
                    onChangeShelf={onChangeShelf}
                  />
                </li>
              ))
            }
          </ol>
        </div>
      </div>
    )
  }
}