import React from 'react'
import PropTypes from 'prop-types'

import Book from './Book'

export default class Bookshelf extends React.Component {

    static protoTypes = {
        title: PropTypes.string,
        books: PropTypes.array.isRequired,
        onChangeShelf: PropTypes.func.isRequired,
        onChangeBooks: PropTypes.func.isRequired
    };

    onChangeBook = book => {
        return event => {

            var changedBooks = this.props.books;

            var stateBook = changedBooks.find(stateBook => stateBook.id === book.id);

            stateBook.selected = !stateBook.selected;

            this.props.onChangeBooks(changedBooks);
        }
    }

    render() {

        var { title, books, onChangeShelf } = this.props;

        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{title}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {
                            books.map(book => (
                                <li key={book.id} onClick={this.onChangeBook(book)}>
                                    <Book book={book} onChangeShelf={onChangeShelf} />
                                </li>
                            ))
                        }
                    </ol>
                </div>
            </div>
        );
    }
}