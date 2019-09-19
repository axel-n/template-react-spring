import React, {Component} from 'react';
import {
    Card, CardBody, Col, Modal, ModalBody, ModalHeader, Row
} from "reactstrap";

import {request} from "../../core/utils/request/request";
import CardHeader from "reactstrap/es/CardHeader";
import {printColorStatus} from "../../core/utils/other/printStatus";
import {dateProcessing} from "../../core/utils/other/dateProcessing";
import CardTitle from "reactstrap/es/CardTitle";
import DetailsTask from "./Common/DetailsTask";

class Board extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: {},
            details: [],
            modal: false,
            loaded: false,
        };

        this.getData = this.getData.bind(this);
        this.handleDetailsClick = this.handleDetailsClick.bind(this);
        this.printCardTask = this.printCardTask.bind(this);

        this.getData();
    }

    getData() {
        let url = "/tasks/board";
        return request.sendRequest("GET", url)
            .then(data => {
                this.setState({
                    data: data,
                    loaded: true,
                });
            });
    }

    handleDetailsClick(task) {
        this.setState({
            modal: !this.state.modal
        });

        if (task.id) {
            this.setState({
                details: task
            })
        }
    }

    printCardTask(item, index) {
        return <Card key={index} color={item.status === "NEW" ? "warning": "info"} onClick={() => this.handleDetailsClick(item)}>
            <CardHeader>{item.name}</CardHeader>
            <CardBody>
                <div>Назначен: {item.assigner ? item.assigner.name : "Никто"}</div>
                <div>Статус: {printColorStatus(item.status)}</div>
                <div>Создан: {dateProcessing.getFormattedDateTime(item.cdat)}</div>
            </CardBody>
        </Card>
    }

    printColumn(nameColumn, values, index) {
        let cardsTasks = values.map((item, index) => this.printCardTask(item, index));

        return <Col key={index}>
            <Card outline body color="primary">
                <CardTitle>{nameColumn}</CardTitle>
                <CardBody>{cardsTasks}</CardBody>
            </Card>
        </Col>

    }

    printBoard() {

        if (this.state.loaded) {
            return this.state.data.map((obj, index) => this.printColumn(obj.name, obj.values, index))
        } else {
            return request.loading();
        }
    }

    render() {

        return <div className="animated fadeIn">

            {/* details */}
            <Modal isOpen={this.state.modal} toggle={this.handleDetailsClick}
                   className={'modal-xl ' + this.props.className}>

                <ModalHeader
                    toggle={this.handleDetailsClick}>Подробности</ModalHeader>
                <ModalBody>

                    <DetailsTask
                        details={this.state.details}
                        typeTask="CONTRACT"
                    />

                </ModalBody>
            </Modal>

            <Card>
                <CardHeader>Доска проектов</CardHeader>
                <CardBody>
                    <Row>
                    {this.printBoard()}
                    </Row>
                </CardBody>
            </Card>
        </div>
    }


}

export default Board;