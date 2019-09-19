import React from 'react';
import {Alert} from 'reactstrap';
import PropTypes from "prop-types";

const propTypes = {
    text: PropTypes.string,
    color: PropTypes.string
};

export default class CustomAlert extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            active: true,
            time: 3,
        };

        this.time = setInterval(
            () => this.tick(),
            1000
        );

        this.onDismiss = this.onDismiss.bind(this);
    }

    tick() {

        if (this.state.time > 0) {

            this.setState({
                time: this.state.time - 1,
            });
        } else {

            this.setState({
                active: false
            });
        }
    }
    componentDidMount() {
        clearInterval(this.time);
    }

    onDismiss() {
        this.setState({
            active: false
        });
    }

    render() {

        const {text, color} = this.props;

        return (
            <Alert color={color} isOpen={this.state.active} toggle={this.onDismiss}>
                {text}
            </Alert>
        );
    }
}

CustomAlert.propTypes = propTypes;