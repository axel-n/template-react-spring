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
            tasks: {
                assignForMe: 0,
                createdByMe: 0
            },
        };
    }


    getDataWidgets() {
        return request.sendRequest("GET", "api/v1/statistic/total")
            .then(data => {

                    this.setState({
                        tasks: {
                            assignForMe: data.tasks.assignForMe,
                            createdByMe: data.tasks.createdByMe,
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
                                <Col xs="12" sm="6" lg="6">
                                    <Widget01 color="danger"
                                              header={this.state.tasks.createdByMe}
                                              smallText="Созданные мной"
                                              link="#"/>
                                </Col>
                                <Col xs="12" sm="6" lg="6">
                                    <Widget01 color="danger"
                                              header={this.state.tasks.assignForMe}
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
