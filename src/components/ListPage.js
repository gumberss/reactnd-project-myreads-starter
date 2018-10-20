import React from 'react'
import { Link } from 'react-router-dom'

import Bookshelf from './books/Bookshelf'
import SelectedBooksAction from './others/SelectedBooksAction'

var ListPage = props => {

    const { books, onChangeShelf, onChangeBooks } = props;

    const filter = books => shelf => books.filter(book => book.shelf === shelf);
    const filterBy = filter(books);

    const currentlyReading = filterBy('currentlyReading');
    const wantToRead = filterBy('wantToRead');
    const read = filterBy('read');

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