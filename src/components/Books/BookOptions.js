import React from 'react'
import PropTypes from 'prop-types'

export default class BookOptions extends React.Component {

    static propTypes = {
        onChangeShelf: PropTypes.func.isRequired,
        currentShelf: PropTypes.string.isRequired
    }

    state = {
        shelves: {
            currentlyReading: 'Currently Reading',
            wantToRead: 'Want to Read',
            read: 'Read',
            none: 'None'
        }
    }

    onChangeShelf = event => {

        this.props.onChangeShelf(event.target.value);
    }

    render() {

        var { shelves } = this.state;
        var { currentShelf } = this.props;

        var shelvesKeys = Object.keys(shelves);

        return (
            <div className="book-shelf-changer">
                <select onChange={this.onChangeShelf}>
                    <option disabled value="">Move to...</option>
                    {
                        shelvesKeys.map(shelf => (
                            <option
                                key={shelf}
                                value={shelf}
                                selected={shelf === currentShelf}
                            >
                                {shelves[shelf]}
                            </option>
                        ))
                    }
                </select>
            </div>
        );
    }
};