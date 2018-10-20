import React from 'react'
import PropTypes from 'prop-types'
import BookOptions from '../books/BookOptions'

export default class SelectedBooksAction extends React.Component {

    static propTypes = {
        books: PropTypes.array.isRequired,
        onChangeShelf: PropTypes.func.isRequired,
        countSelectedBooks: PropTypes.number.isRequired
    }

    onChangeManyBooksShelf = targetShelf => {

        let { books, onChangeShelf } = this.props;

        let selectedBooks = books.filter(book => book.selected);

        selectedBooks.forEach(book => {
            book.selected = false;
            onChangeShelf(targetShelf, book)
        });
    }

    render() {
        const { countSelectedBooks } = this.props;

        return (
            (countSelectedBooks && (
                <div className="select-message">
                    <span>
                        {`Você possui ${countSelectedBooks} livros selecionados`}
                    </span>
                    <BookOptions onChangeShelf={this.onChangeManyBooksShelf} styleClass="many-selected-options" />

                </div>
            )) || ''
        )
    }
}