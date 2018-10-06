import React from 'react'
import PropTypes from 'prop-types'

export default class BookOptions extends React.Component {

    static propTypes = {
        onChangeShelf: PropTypes.func.isRequired
    }

    onChangeShelf = event => {

        this.props.onChangeShelf(event.target.value);
    }

    render() {

        return (
            <div className="book-shelf-changer">
                <select onChange={this.onChangeShelf}>
                    <option value="">Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                </select>
            </div>
        );
    }
};