import React from 'react'
import PropTypes from 'prop-types'

import Book from './Book'

var bookshelf = props => {

    var { title, books, onChangeShelf, shelf } = props;

    var shelfBooks = books.filter(book => book.shelf === shelf);

    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{title}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {
                        shelfBooks.map(book => (
                            <li key={book.id}>
                                <Book book={book} onChangeShelf={onChangeShelf} />
                            </li>
                        ))
                    }
                </ol>
            </div>
        </div>
    );
}

bookshelf.protoTypes = {
    title: PropTypes.string.isRequired,
    shelf: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    onChangeShelf: PropTypes.func.isRequired
};

export default bookshelf;