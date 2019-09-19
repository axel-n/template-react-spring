import React, {Component} from 'react';

import {
    Card,
    CardBody,
    CardGroup,
    Col,
    Container,
    Row
} from 'reactstrap';
import NeedChangePassword from "../../Pages/Login/NeedChangePassword";

export default class ChangePassword extends Component {

    render() {
        return (
            <div className="app flex-row align-items-center">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="4">
                            <CardGroup>
                                <Card className="p-4">
                                    <CardBody>

                                        <NeedChangePassword/>

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

