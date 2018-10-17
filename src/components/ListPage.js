import React from 'react'
import { Link } from 'react-router-dom'

import Bookshelf from './books/Bookshelf'
import SelectedBooksAction from './Others/SelectedBooksAction'

var ListPage = props => {

    var { books, onChangeShelf, onChangeBooks } = props;

    var currentlyReading = books.filter(book => book.shelf === 'currentlyReading');
    var wantToRead = books.filter(book => book.shelf === 'wantToRead');
    var read = books.filter(book => book.shelf === 'read');

    var countSelectedBooks = books.filter(book => book.selected).length;

    return (

        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>

            <SelectedBooksAction
                countSelectedBooks={countSelectedBooks}
                onChangeShelf={onChangeShelf}
                books={books}
            />

            <div className="list-books-content">

                <Bookshelf
                    title="Currently Reading"
                    books={currentlyReading}
                    onChangeShelf={onChangeShelf}
                    onChangeBooks={onChangeBooks}
                />

                <Bookshelf
                    title="Want to Read"
                    books={wantToRead}
                    onChangeShelf={onChangeShelf}
                    onChangeBooks={onChangeBooks}
                />

                <Bookshelf
                    title="Read"
                    books={read}
                    onChangeShelf={onChangeShelf}
                    onChangeBooks={onChangeBooks}
                />

            </div>

            <div className="open-search">
                <Link to="/Search">Add a book</Link>
            </div>
        </div>
    );
}

export default ListPage;