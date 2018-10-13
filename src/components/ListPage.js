import React from 'react'
import { Link } from 'react-router-dom'

import Bookshelf from './books/Bookshelf'

var ListPage = props => {

    var { books, onChangeShelf } = props;

    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>

            <div className="list-books-content">
                <Bookshelf
                    title="Currently Reading"
                    shelf="currentlyReading"
                    books={books}
                    onChangeShelf={onChangeShelf}
                />
                
                <Bookshelf
                    title="Want to Read"
                    shelf="wantToRead"
                    books={books}
                    onChangeShelf={onChangeShelf}
                />

                <Bookshelf
                    title="Read"
                    shelf="read"
                    books={books}
                    onChangeShelf={onChangeShelf}
                />
            </div>

            <div className="open-search">
                <Link to="/Search">Add a book</Link>
            </div>
        </div>
    );
}

export default ListPage;