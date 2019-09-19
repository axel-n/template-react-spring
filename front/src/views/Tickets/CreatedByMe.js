import React, {Component} from 'react';
import {
    Button,
    Card,
    CardBody,
    Col, Form,
    FormGroup,
    Input,
    Label,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader, Row,

} from "reactstrap";
import CardHeader from "reactstrap/es/CardHeader";
import TableTickets from "./TableTickets";
import TableFooter from "../../core/TableFooter";
import {request} from "../../core/utils/request/request";

class CreatedByMe extends Component {

    constructor(props) {
        super(props);

        this.state = {
            pagination: {
                currentPage: 1,
                elementsPerPage: 10,
                countElements: 0,
                lastPage: 1,
            },
            modal: false,

            loaded: false,
            data: [],
        };

        this.handleCreate = this.handleCreate.bind(this);
        this.modalClick = this.modalClick.bind(this);
        this.getData = this.getData.bind(this);
    }

    modalClick() {
        this.setState({
            modal: !this.state.modal,
        })
    }

    getData(pagination) {

        let {currentPage, elementsPerPage} = {...this.state.pagination, ...pagination};

        let url = "/api/v1/tickets/search?page=" + currentPage + "&elementsPerPage=" + elementsPerPage;

        let params = {};
        params.type = "createdByMe";

        return request.sendRequest("POST", url, JSON.stringify(params))
            .then(data => {

                let countElements = parseInt(data.countElements);
                let lastPage = Math.ceil(countElements / elementsPerPage);

                this.setState({
                    pagination: {
                        currentPage,
                        elementsPerPage,
                        countElements,
                        lastPage
                    },
                    data: data.list,
                    loaded: true,
                });

            });
    }

    handleCreate(event) {
        event.preventDefault();

        let data = new FormData(event.target);

        let json = request.convertFormToObj(data);

        return request.sendRequest("POST", "/api/v1/ticket", JSON.stringify(json))
            .then(data => {

                if (data.id) {
                    this.setState({
                        modal: false,
                    }, () => this.getData({}))
                }
            })

    }

    render() {

        return <div className="animated fadeIn">

            {/* create request */}
            <Modal isOpen={this.state.modal} toggle={this.modalClick}
                   className={'modal-md ' + this.props.className}>

                <ModalHeader
                    toggle={this.modalClick}>Create ticket
                </ModalHeader>

                <Form onSubmit={this.handleCreate}>
                    <ModalBody>

                        <FormGroup row>
                            <Col md="3">
                                <Label>Summary</Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Input required type="text" name="summary"/>
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Col xs="3">
                                <Label className="">Transaction ID</Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Input type="number" name="transactionId"/>
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Col md="3">
                                <Label>Category</Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Input required type="select" name="category">
                                    <option value="0">Clarify details</option>
                                    <option value="1">Other</option>
                                </Input>
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Col md="3">
                                <Label>Text</Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Input type="textarea" name="description" rows="9"
                                       placeholder="Message" required/>
                            </Col>
                        </FormGroup>

                        {/*<FormGroup row>*/}
                        {/*    <Col md="3">*/}
                        {/*        <Label>Attached</Label>*/}
                        {/*    </Col>*/}
                        {/*    <Col xs="12" md="9">*/}
                        {/*        <Input type="file" name="file-input"/>*/}
                        {/*    </Col>*/}
                        {/*</FormGroup>*/}

                    </ModalBody>

                    <ModalFooter>
                        <Button>Create</Button>
                    </ModalFooter>
                </Form>
            </Modal>

            <Card>
                <CardHeader>Created by me</CardHeader>
                <CardBody>

                    <Row className="mb-3">
                        <Col>
                            <Button onClick={this.modalClick}>Create request</Button>
                        </Col>
                    </Row>

                    <TableTickets
                        data={this.state.data}
                    />

                    <TableFooter
                        {...this.state.pagination}
                        paginate={this.getData}
                    />
                </CardBody>
            </Card>
        </div>
    }

}

export default CreatedByMe;


