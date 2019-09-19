import React, {Component} from 'react';

import {
    Col,
    Row
} from 'reactstrap';

import {request} from "../../core/utils/request/request";
import Widget01 from "./Widget01";


class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            projects: {
                assignForMe: 0,
                createdByMe: 0
            },

            documents: {
                assignForMe: 0,
                createdByMe: 0
            },
        };
    }


    getDataWidgets() {
        return request.sendRequest("GET", "api/v1/statistic/total")
            .then(data => {

                    this.setState({
                        projects: {
                            assignForMe: data.projects.assignForMe,
                            createdByMe: data.projects.createdByMe,
                        },

                        documents: {
                            assignForMe: data.documents.assignForMe,
                            createdByMe: data.documents.createdByMe,
                        },
                    })
                }
            );
    }

    render() {

        return (
            <div className="animated fadeIn">

                <Row>
                    <Col>
                        <Col className="highlight">

                            <Row>
                                <Col xs="12" sm="6" lg="3">
                                    <Widget01 color="danger"
                                              header={this.state.projects.createdByMe}
                                              mainText="Проекты"
                                              smallText="Созданные мной"
                                              link="#"/>
                                </Col>
                                <Col xs="12" sm="6" lg="3">
                                    <Widget01 color="danger"
                                              header={this.state.projects.assignForMe}
                                              mainText="Проекты"
                                              smallText="Назначенные на меня"
                                              link="#"/>
                                </Col>
                                <Col xs="12" sm="6" lg="3">
                                    <Widget01 color="danger"
                                              header={this.state.documents.createdByMe}
                                              mainText="Документы"
                                              smallText="Созданные мной"
                                              link="#"/>
                                </Col>
                                <Col xs="12" sm="6" lg="3">
                                    <Widget01 color="danger"
                                              header={this.state.documents.assignForMe}
                                              mainText="Документы"
                                              smallText="Назначенные на меня"
                                              link="#"/>
                                </Col>

                            </Row>


                        </Col>
                    </Col>

                </Row>


            </div>
        );
    }
}

export default Dashboard;
