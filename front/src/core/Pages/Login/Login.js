import React, {Component} from 'react';

import {
    Button,
    Card,
    CardBody,
    CardGroup,
    Col,
    Container,
    Form,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Row,
} from 'reactstrap';
import CustomAlert from '../../Alert'
export default class Login extends Component {

    constructor(props) {
        super(props);
        this.routeChange = this.routeChange.bind(this);
        this.handleResponse = this.handleResponse.bind(this);

        this.state = {
            error: false,
        };
    }

   componentDidMount() {
       let userDataRow = localStorage.getItem('user');
       if (userDataRow) this.routeChange();
   }

    handleSubmit = (event) => {
        event.preventDefault();

        this.setState({
            error: false,
        });

        let username = event.target.elements.username.value;
        let pass = event.target.elements.password.value;
        let formData = JSON.stringify({username: username, password: pass});
        if (username && pass) this.login(formData);

    };

    login(formData) {

        const requestOptions = {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        };

        let that = this;

        fetch('/api/v1/login', requestOptions)
            .then(response => {

                if (response.ok) {

                    let json = response.json();
                    json.then(result => that.handleResponse(result))

                } else {

                    // логин или пароль неверный
                    this.setState({
                        error: true,

                    });
                }
            })
    }

    handleResponse(json) {
        localStorage.setItem('user', JSON.stringify(json));
        this.routeChange();
    }

    routeChange() {
        let path = 'dashboard';
        this.props.history.push(path);
    }

    render() {
        return (
            <div className="app flex-row align-items-center">

                <Container>
                    <Row className="justify-content-center">
                        <Col md="5">
                            <CardGroup>
                                <Card className="p-4">
                                    <CardBody>
                                        <Form onSubmit={this.handleSubmit}>
                                            <h1>Согласование задач</h1>
                                            <p className="text-muted">Добро пожаловать!</p>

                                            {this.state.error &&
                                                <CustomAlert
                                                    text="Неправильная почта или пароль!"
                                                    color="danger"
                                                />
                                            }

                                            <InputGroup className="mb-3">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="icon-user"/>
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input type="text"
                                                       name="username"
                                                       placeholder="почта"
                                                       defaultValue="user1@gmail.com"
                                                       autoComplete="username"/>

                                            </InputGroup>
                                            <InputGroup className="mb-4">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="icon-lock"/>
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input type="password"
                                                       name="password"
                                                       defaultValue="123"
                                                       placeholder="пароль" autoComplete="current-password"/>
                                            </InputGroup>
                                            <Row>
                                                <Col xs="4">
                                                    <Button color="primary"
                                                            className="px-4">Войти</Button>
                                                </Col>
                                            </Row>
                                        </Form>
                                    </CardBody>
                                </Card>
                            </CardGroup>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

