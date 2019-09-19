import React, {Component} from 'react';
import {Card, CardBody
} from "reactstrap";

import TableTasks from "./Common/TableTasks";
import TableFooter from "../../core/TableFooter";
import {request} from "../../core/utils/request/request";
import CardHeader from "reactstrap/es/CardHeader";


class CreatedByMe extends Component {

    constructor(props) {
        super(props);

        this.state = {
            pagination: {},
            list: [],
        };

        this.getData = this.getData.bind(this);

    }

    getData(pagination) {
        let {currentPage, elementsPerPage} = {...this.state.pagination, ...pagination};
         let url = "/tasks/createdByMe?page=" + currentPage + "&size=" + elementsPerPage;
        return request.sendRequest("GET", url)
            .then(data => {

                let countElements = parseInt(data.totalElements);
                let lastPage = Math.ceil(countElements / elementsPerPage);

                this.setState({
                    pagination: {
                        currentPage,
                        elementsPerPage,
                        countElements,
                        lastPage
                    },
                    data: data.content,
                });

            });
    }

    render() {

        return <div className="animated fadeIn">
            <Card>
                <CardHeader>Созданные мной</CardHeader>
                <CardBody>
                    <TableTasks
                        list={this.state.data}
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


