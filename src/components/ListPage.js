import React from 'react'
import { Link } from 'react-router-dom'

import Bookshelf from './books/Bookshelf'

var ListPage = props => {

    var { books, onChangeShelf } = props;

    var currentlyReading = books.filter(book => book.shelf === 'currentlyReading');
    var wantToRead = books.filter(book => book.shelf === 'wantToRead');
    var read = books.filter(book => book.shelf === 'read');

    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <Bookshelf title="Currently Reading" books={currentlyReading} onChangeShelf={onChangeShelf} />
                <Bookshelf title="Want to Read" books={wantToRead} onChangeShelf={onChangeShelf} />
                <Bookshelf title="Read" books={read} onChangeShelf={onChangeShelf} />
            </div>
            <div className="open-search">
                <Link to="/Search">Add a book</Link>
            </div>
        </div>
    );
}

export default ListPage;