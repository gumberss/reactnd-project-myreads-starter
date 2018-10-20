/**
 * https://gist.github.com/krambertech/76afec49d7508e89e028fce14894724c
 * Created by: krambertech
 * Adapted by:  Gustavo Marin Suppi
 */

import React, { Component } from 'react';

const WAIT_INTERVAL = 1000;

export default class TextSearch extends Component {

    state = {
        value: ''
    }

    componentWillMount() {
        this.timer = null;
    }

    handleChange = event => {
        clearTimeout(this.timer);

        const { value } = event.target;

        this.setState({
            value: value
        });

        this.timer = setTimeout(this.triggerChange, WAIT_INTERVAL);
    }

    triggerChange = () => {

        this.props.onChange(this.state.value);
    }

    render() {
        const { className, placeholder } = this.props;

        return (
            <input
                className={className}
                placeholder={placeholder}
                onChange={this.handleChange}
            />
        );
    }
}