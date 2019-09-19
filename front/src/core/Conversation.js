import React, {Component} from 'react';
import {Card, CardBody, Col, Row} from "reactstrap";
import CardHeader from "reactstrap/es/CardHeader";
import {dateProcessing} from "./utils/other/dateProcessing";
import {request} from "./utils/request/request";

class Conversation extends Component {

    render() {

        if (this.props.loaded) {
            let itemsConversation = this.props.data.map((item, key) => {

                return <Col key={key} className={'conversationItem ' + item.typeUser} xs="12">
                    <Col md="8" className={item.roleUser === "OWN" ? "float-left" : "float-right"}>

                        <Card className={item.roleUser === "OWN" ? 'bg-info' : 'bg-success'}>
                            <CardHeader>
                                <Col>
                                    <Row>
                                        <span>{dateProcessing.getFormattedDateTime(item.cdat)}</span>
                                    </Row>
                                    <Row>
                                        <span>From {item.creator.name} {item.creator.role}</span>
                                    </Row>
                                </Col>
                            </CardHeader>
                            <CardBody>
                                <span>{item.comment}</span>
                            </CardBody>
                        </Card>

                    </Col>
                </Col>
            });

            return (
                <Row className="justify-content-center conversation bg-gray-200 p-3 mb-3">
                    {this.props.data.length > 0 ? itemsConversation : "Comments not found"}
                </Row>
            );

        } else {
            return request.loading()
        }
    }

}

export default Conversation;
