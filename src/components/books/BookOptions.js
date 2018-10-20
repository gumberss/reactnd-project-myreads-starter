import React from 'react'
import PropTypes from 'prop-types'

export default class BookOptions extends React.Component {

    static propTypes = {
        onChangeShelf: PropTypes.func.isRequired,
        currentShelf: PropTypes.string,
        styleClass: PropTypes.string
    }

    shelves = {
        currentlyReading: 'Currently Reading',
        wantToRead: 'Want to Read',
        read: 'Read',
        none: 'None'
    }

    onChangeShelf = event => {
        this.props.onChangeShelf(event.target.value);
    }

    render() {

        let { currentShelf, styleClass } = this.props;
        currentShelf = currentShelf || "";
        const shelvesKeys = Object.keys(this.shelves);

        return (
            <div className={"book-shelf-changer " + styleClass} onClick={ event => event.stopPropagation()}>
                <select onChange={this.onChangeShelf} value={currentShelf}>
                    <option disabled value="">Move to...</option>
                    {
                        shelvesKeys.map(shelf => (
                            <option
                                key={shelf}
                                value={shelf}
                            >
                                {this.shelves[shelf]}
                            </option>
                        ))
                    }
                </select>
            </div>
        );
    }
};