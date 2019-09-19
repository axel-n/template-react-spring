import React, {Component} from 'react';
import {
  Modal, ModalBody, ModalHeader,
} from "reactstrap";

import CustomTable from "../../../core/components/CustomTable/CustomTable";
import DetailsTask from "./DetailsTask";

class TableTasks extends Component {
    constructor(props) {
        super(props);

        this.state = {
            list: [],
            modal: false,
            details: [],
        };

        this.columns = [
            {text: 'ID', dataField: 'id'},
            {text: 'Дата создания', dataField: 'cdat'},
            {text: 'Название', dataField: 'name',},
            {text: 'Создатель', dataField: 'creator.name'},
            {text: 'Назначен', dataField: 'assigner'},
            {text: 'Статус', dataField: 'status'},
            {text: 'Назначена команда', dataField: 'assignTeam'},

        ];

        this.modalClick = this.modalClick.bind(this);
    }


    modalClick(data) {
        this.setState({
            modal: !this.state.modal,
        });

        // if open modal
        if (data.id) {
            this.setState({
                details: data,
            });
        }
    }

    render() {
        return (
            <>
                {/* details */}
                <Modal isOpen={this.state.modal} toggle={this.modalClick}
                       className={'modal-xl ' + this.props.className}>

                    <ModalHeader
                        toggle={this.modalClick}>Подробности</ModalHeader>
                    <ModalBody>

                        <DetailsTask
                            details={this.state.details}
                        />

                    </ModalBody>
                </Modal>

                <CustomTable
                    data={this.props.list}
                    columns={this.columns}
                    detailsClick={this.modalClick}
                />
            </>
        );
    }
}


export default TableTasks;





