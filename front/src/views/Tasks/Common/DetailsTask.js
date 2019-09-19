import React, {Component} from 'react';
import {Button, Card, Col, Form, Input, Row} from "reactstrap";
import CardBody from "reactstrap/es/CardBody";
import Label from "reactstrap/es/Label";
import FormGroup from "reactstrap/es/FormGroup";
import {dateProcessing} from "../../../core/utils/other/dateProcessing";
import {printColorStatus} from "../../../core/utils/other/printStatus";
import {request} from "../../../core/utils/request/request";
import Conversation from "../../../core/Conversation";

class DetailsTask extends Component {

    constructor(props) {
        super(props);

        this.state = {
            status: {
                send: false,
                error: false,
            },
            comments: {
                loaded: false,
                list: [],
            },

            comment: {
                send: false,
                success: false,
            }
        };

        this.changeStatus = this.changeStatus.bind(this);
        this.handleCreateMessage = this.handleCreateMessage.bind(this);
        this.getComments = this.getComments.bind(this);

        this.getComments();
    }

    getComments() {

        let taskId = this.props.details.id;

        return request.sendRequest("GET", `/tasks/${taskId}/messages`)
            .then(response => {

                this.setState({
                    comments: {
                        loaded: true,
                        list: response,
                    },
                })
            })
    }

    static printAssigner(assigner) {

        if (assigner) {
            return assigner.name + " " + assigner.role;
        } else {
            return "Никто";
        }
    }

    handleCreateMessage(event) {
        event.preventDefault();

        this.setState({
            comment: {
                send: false,
                success: false,
            }
        });

        let taskId = this.props.details.id;
        let json = {};
        json.comment = event.target.comment.value;

        let url = `/tasks/${taskId}/message`;

        return request.sendRequest("POST", url, JSON.stringify(json))
            .then(success => {
                this.setState({
                    comment: {
                        send: true,
                        success: success,
                    }
                }, () => this.getComments())
            })
    }

    changeStatus(newStatus) {

        let taskId = this.props.details.id;
        let url = `/tasks/${taskId}/changeStatus`;

        let json = {};
        json.newStatus = newStatus;

        this.setState({
            status: {
                send: false,
                error: false,
            }
        });

        return request.sendRequest("PUT", url, JSON.stringify(json))
            .then(success => {

                this.setState({
                    status: {
                        send: true,
                        error: !success,
                    }
                });
            })
    }

    render() {
        return <div className="animated fadeIn">

            <Row className="mb-3">
                <Col>
                    {this.props.details.status === "NEW" && <Button onClick={() => this.changeStatus("IN_PROGRESS")}>Взять в работу</Button>}
                    {this.props.details.status === "IN_PROGRESS" && <Button onClick={() => this.changeStatus("DONE")}>Готово</Button>}
                </Col>
            </Row>

            <Row>

                <Col>
                    <Card>
                        <CardBody>
                            <FormGroup row>
                                <Col md="5">
                                    <Label>Уникальный номер</Label>
                                </Col>
                                <Col xs="12" md="7">
                                    <p className="form-control-static">{this.props.details.id}</p>
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Col md="5">
                                    <Label>Статус</Label>
                                </Col>
                                <Col xs="12" md="7">
                                    <p className="form-control-static">{printColorStatus(this.props.details.status)}</p>
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Col md="5">
                                    <Label>Название</Label>
                                </Col>
                                <Col xs="12" md="7">
                                    <Input name="name"
                                           defaultValue={this.props.details.name}
                                           placeholder="Название"/>
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Col md="5">
                                    <Label>Создатель</Label>
                                </Col>
                                <Col xs="12" md="7">
                                    <p className="form-control-static">{this.props.details.creator.name} {this.props.details.creator.role}</p>
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Col md="5">
                                    <Label>Назначен</Label>
                                </Col>
                                <Col xs="12" md="7">
                                    <p className="form-control-static">
                                        {DetailsTask.printAssigner(this.props.assigner)}
                                    </p>
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Col md="5">
                                    <Label>Описание</Label>
                                </Col>
                                <Col xs="12" md="7">
                                    <Input type="textarea"
                                           name="description"
                                           defaultValue={this.props.details.description}
                                           placeholder="Название"/>
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Col md="5">
                                    <Label>Дата и время создания</Label>
                                </Col>
                                <Col xs="12" md="7">
                                    <p className="form-control-static">{dateProcessing.getFormattedDateTime(this.props.details.cdat)}</p>
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Col md="5">
                                    <Label>Дата и время обновления</Label>
                                </Col>
                                <Col xs="12" md="7">
                                    <p className="form-control-static">{dateProcessing.getFormattedDateTime(this.props.details.udat)}</p>
                                </Col>
                            </FormGroup>
                        </CardBody>
                    </Card>

                </Col>

                <Col>
                    <Card>

                        <CardBody>

                            <Conversation
                                data={this.state.comments.list}
                                loaded={this.state.comments.loaded}
                            />

                            <Form onSubmit={this.handleCreateMessage}>
                                <FormGroup row>
                                    <Col xs="12" md="12">
                                        <Input type="textarea" name="comment" rows="3"
                                               placeholder="Comment"/>
                                    </Col>
                                </FormGroup>

                                <Button>Comment</Button>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>

            </Row>

        </div>
    }

}

export default DetailsTask;