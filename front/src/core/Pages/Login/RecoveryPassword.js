import React, {Component} from 'react';

import {
    Card,
    CardBody,
    CardGroup,
    Col,
    Container,
    Row
} from 'reactstrap';

export default class RecoveryPassword extends Component {

    render() {
        return (
            <div className="app flex-row align-items-center">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="4">
                            <CardGroup>
                                <Card className="p-4">
                                    <CardBody>
                                        <h1>Biller portal</h1>
                                        <p>Please do not hesitate contact to our support centre to recover it.</p>
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

