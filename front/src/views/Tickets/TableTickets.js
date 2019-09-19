import React, {Component} from 'react';

import {Button, Col, Form, FormGroup, Input, Modal, ModalBody, ModalHeader, Row} from "reactstrap";
import {dateProcessing} from "../../core/utils/other/dateProcessing";
import Conversation from "../../core/Conversation";
import {request} from "../../core/utils/request/request";
import CustomAlert from "../../core/Alert";
import * as printStatus from "../../core/utils/other/printStatus";
import CustomTable from "../../core/components/CustomTable/CustomTable";

class TableTickets extends Component {
    constructor(props) {
        super(props);

        this.state = {
            details: [],
            modal: false,

            conversation: {
                data: [],
                loaded: false,
            },

            comment: {
                send: false,
                success: false,
            }
        };

        this.modalClick = this.modalClick.bind(this);
        this.getMessagesByTicket = this.getMessagesByTicket.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    componentDidMount() {
        this.columns = [
            {text: 'ID', dataField: 'id'},
            {text: 'Status', dataField: 'status'},
            {text: 'Summary', dataField: 'summary'},
            {text: 'Category', dataField: 'category'},
            {text: 'Created at', dataField: 'cdat'}
        ];
    }

    modalClick(data) {

        this.setState({
            modal: !this.state.modal,
        });

        if (data.id) {

            this.getMessagesByTicket(data.id);

            this.setState({
                details: data
            })
        }
    }

    getMessagesByTicket(ticketId) {

        return request.sendRequest("GET", "/api/v1/ticket/" + ticketId + "/messages")
            .then(data => {

                if (data.list) {

                    this.setState({
                        conversation: {
                            data: data.list,
                            loaded: true
                        }
                    })
                }
            })
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({
            comment: {
                send: false,
                success: false,
            }
        });

        let ticketId = this.state.details.id;


        let data = new FormData(event.target);
        data.append("ticketId", ticketId);

        let json = request.convertFormToObj(data);

        return request.sendRequest("POST", "/api/v1/ticket/" + ticketId + "/message", JSON.stringify(json))
            .then(data => {

                let success = false;
                if (data.id) {
                    success = true;
                    this.getMessagesByTicket(ticketId);
                }

                this.setState({
                    comment: {
                        send: true,
                        success: success,
                    }
                })

            })


    }

    render() {
        return (
            <>
                {/* details */}
                <Modal isOpen={this.state.modal} toggle={this.modalClick}
                       className={'modal-lg ' + this.props.className}>

                    <ModalHeader
                        toggle={this.modalClick}>Ticket details</ModalHeader>
                    <ModalBody>

                        <Row className="mb-3">
                            <Col>
                                <span>ID: {this.state.details.id}</span>
                            </Col>
                            <Col>
                                <span>Date: {dateProcessing.getFormattedDateTime(this.state.details.cdat)}</span>
                            </Col>

                            <Col>
                                <span>Status: {printStatus.printColorStatus(this.state.details.status)}</span>
                            </Col>

                        </Row>

                        <Row className="mb-3">
                            <Col>
                                <span>From userId: {this.state.details.creatorUserId}</span>
                            </Col>

                            <Col>
                                <span>Categories: {this.state.details.category}</span>
                            </Col>

                            <Col>
                                <span>Transaction Id: {this.state.details.transactionId}</span>
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col>
                                <span>Summary: {this.state.details.summary}</span>
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col>
                                <span>Description: {this.state.details.description}</span>
                            </Col>
                        </Row>

                        <Conversation
                            data={this.state.conversation.data}
                            loaded={this.state.conversation.loaded}
                        />

                        {this.state.comment.send && this.state.comment.success &&
                        <CustomAlert
                            text="Comment added!"
                            color="success"
                        />
                        }

                        {this.state.comment.send && !this.state.comment.success &&
                        <CustomAlert
                            text="Comment not added! Try it later"
                            color="danger"
                        />
                        }

                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup row>
                                <Col xs="12" md="12">
                                    <Input type="textarea" name="comment" rows="3"
                                           placeholder="Comment"/>
                                </Col>
                            </FormGroup>

                            <Button>Comment</Button>
                        </Form>
                    </ModalBody>

                </Modal>

                <CustomTable
                    data={this.props.data}
                    columns={this.columns}
                    detailsClick={this.modalClick}
                />
            </>
        );
    }
}

export default TableTickets;





