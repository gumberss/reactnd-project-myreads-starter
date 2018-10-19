import React from 'react'
import PropTypes from 'prop-types'

import BookOptions from './BookOptions'

export default class Book extends React.Component {

    static propTypes = {
        book: PropTypes.object.isRequired,
        onChangeShelf: PropTypes.func.isRequired
    }

    onChangeShelf = targetShelfKey => {
        targetShelfKey !== this.props.book.shelf && this.props.onChangeShelf(targetShelfKey, this.props.book);
    }

    render() {
        var { book } = this.props;

        var authors = (
            book.authors
            && book.authors.reduce((allAuthors, author) => allAuthors + " & " + author)
        )
            || 'Autor desconhecido';

        return (
            <div className={"book " + (book.selected ? "selected" : "")}>
                <div className="book-top">
                    <div
                        className="book-cover"
                        style={{ backgroundImage: book.imageLinks && `url(${book.imageLinks.smallThumbnail})` }}>
                    </div>
                    <BookOptions
                        onChangeShelf={this.onChangeShelf}
                        currentShelf={book.shelf}
                    />
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{authors}</div>
            </div>
        );
    }
}