import React from 'react';
import {Button, Form, FormGroup, Input, Label} from 'reactstrap';
import {request} from "../../utils/request/request";
import CustomAlert from "./Login";
import {withRouter} from "react-router";


let userDataRow = localStorage.getItem('user');

class NeedChangePassword extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            pass1: '',
            pass2: '',
            error: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.routeChange = this.routeChange.bind(this);

    }

    componentDidMount() {
        if (!userDataRow) this.routeChange("login");
    }

    routeChange(path) {
        this.props.history.push(path);
    }


    handleChange(event) {

        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {

        event.preventDefault();

        if (this.state.pass1 !== '') {

            let formData = JSON.stringify({
                'password': this.state.pass1
            });

            this.updatePass(formData);
        }

    };

    updatePass(formData) {
        return request.sendRequest("POST", "/api/v1/security/updatePassword", formData)
            .then(response => {

                let success = response.result;

                if (success) {
                    // удаляем старый токен и доп проверки
                    localStorage.removeItem('user');

                    this.routeChange("login");
                } else {
                    this.setState({
                        error: true
                    })
                }
            });
    }

    render() {
        return (

            <div>
                <p>After setting a new password, you will be redirected to the login page.</p>

                {this.state.error &&
                    <CustomAlert
                        text="what went wrong try again later"
                        color="danger"
                    />
                }

                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="pass1">New Pass</Label>
                        <Input valid={this.state.pass1 !== '' && this.state.pass1 === this.state.pass2}
                               type="password"
                               name="pass1"
                               placeholder="new pass"
                               value={this.state.pass1}
                               onChange={this.handleChange}/>
                    </FormGroup>

                    <FormGroup>
                        <Label for="pass2">Repeat Pass</Label>
                        <Input valid={this.state.pass1 !== '' && this.state.pass1 === this.state.pass2}
                               type="password"
                               name="pass2"
                               placeholder="repeat pass"
                               value={this.state.pass2}
                               onChange={this.handleChange}/>
                    </FormGroup>

                    <Button
                        disabled={this.state.pass1 === '' || this.state.pass1 !== this.state.pass2}
                        className="primary">Submit
                    </Button>
                </Form>
            </div>

        );
    }
}

export default withRouter(NeedChangePassword);