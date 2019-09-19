import React, {Component} from 'react';
import {
    ButtonDropdown,
    Col,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Pagination,
    PaginationItem,
    PaginationLink,
    Row,
} from "reactstrap";
import PropTypes from "prop-types";

import {numberProcessing} from "./utils/other/numberProcessing";

const propTypes = {
    countElements: PropTypes.number,
    needExportToCsv: PropTypes.bool,
    currentPage: PropTypes.number,
    lastPage: PropTypes.number,
    hasNext: PropTypes.bool,
    elementsPerPage: PropTypes.number,
    paginate: PropTypes.func
};

const defaultProps = {
    countElements: 0,
    needExportToCsv: false,
    currentPage: 0,
    lastPage: 0,
    hasNext: false,
    elementsPerPage: 10,
};


class TableFooter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            elementsPerPageDropdownOpen: false,
        };

        this.toggle = this.toggle.bind(this);
        this.changePage = this.changePage.bind(this);
        this.changePageSize = this.changePageSize.bind(this);

    }

    componentDidMount() {
        this.props.paginate({
            currentPage: this.props.currentPage,
            elementsPerPage: this.props.elementsPerPage
        });
    }

    changePageSize = elementsPerPage => {
        this.props.paginate({
            currentPage: 0,
            elementsPerPage: elementsPerPage
        });
    };

    changePage = page => {
        this.props.paginate({
            currentPage: page,
            elementsPerPage: this.props.elementsPerPage
        });
    };

    toggle() {
        this.setState(prevState => ({
            elementsPerPageDropdownOpen: !prevState.elementsPerPageDropdownOpen
        }));
    }

    render() {
        if (this.props.countElements > 0) {
            return (
                <Row className="mt-3 table-footer">

                    <Col>
                        <Row className="align-items-center">
                            <Col md="auto">
                                <span>
                                    Всего записей {numberProcessing.formatNumber(this.props.countElements)}
                                </span>
                            </Col>

                        </Row>

                    </Col>

                    <Col>
                        <Row className="justify-content-md-end">
                            <Col md="auto">
                                <span className="mr-2">Элементов на страницу</span>

                                <ButtonDropdown direction="up" className="itemsPerPage"
                                                isOpen={this.state.elementsPerPageDropdownOpen}
                                                toggle={this.toggle} onSelect={this.changePageSize}>
                                    <DropdownToggle caret>
                                        {this.props.elementsPerPage}
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        {[5, 10, 25, 50, 100]
                                            .map((size, ind) =>
                                                (<DropdownItem key={ind}
                                                    onClick={() => this.changePageSize(size)}>{size}
                                                </DropdownItem>))}
                                    </DropdownMenu>
                                </ButtonDropdown>
                            </Col>

                            {this.props.countElements > this.props.elementsPerPage &&
                            <Col md="auto">
                                <Pagination>

                                    {/* prev */}
                                    {this.props.currentPage !== 1 &&
                                    <PaginationItem>
                                        <PaginationLink
                                            onClick={() => this.changePage(this.props.currentPage - 1)}
                                            tag="button">
                                            <i className="fa fa-angle-left"/>
                                        </PaginationLink>
                                    </PaginationItem>
                                    }


                                    {/* first */}
                                    {this.props.currentPage > 2 &&
                                    <PaginationItem disabled={this.props.currentPage === 0}>
                                        <PaginationLink
                                            onClick={() => this.changePage(1)}
                                            tag="button">1</PaginationLink>
                                    </PaginationItem>
                                    }

                                    {/* ... */}
                                    {this.props.currentPage > 2 && this.props.currentPage !== 0 &&
                                    <PaginationItem disabled>
                                        <PaginationLink
                                            tag="button">...</PaginationLink>
                                    </PaginationItem>
                                    }

                                    {/* current */}
                                    <PaginationItem active>
                                        <PaginationLink
                                            tag="button">
                                            {this.props.currentPage}
                                        </PaginationLink>
                                    </PaginationItem>

                                    {/* ... */}
                                    {this.props.currentPage !== this.props.lastPage && this.props.currentPage + 1 < this.props.lastPage &&
                                    <PaginationItem disabled>
                                        <PaginationLink
                                            tag="button">...</PaginationLink>
                                    </PaginationItem>
                                    }

                                    {/* last */}
                                    {this.props.currentPage !== this.props.lastPage &&
                                    <PaginationItem>
                                        <PaginationLink
                                            onClick={() => this.changePage(this.props.lastPage)}
                                            tag="button">
                                            {this.props.lastPage}
                                        </PaginationLink>
                                    </PaginationItem>
                                    }

                                    {/* next */}
                                    {this.props.currentPage !== this.props.lastPage &&
                                    <PaginationItem disabled={this.props.currentPage === this.props.lastPage}>
                                        <PaginationLink
                                            onClick={() => this.changePage(this.props.currentPage + 1)}
                                            tag="button">
                                            <i className="fa fa-angle-right"/>
                                        </PaginationLink>
                                    </PaginationItem>
                                    }

                                </Pagination>
                            </Col>
                            }
                        </Row>
                    </Col>
                </Row>
            )
        }
        else return null;
    }
}

TableFooter.propTypes = propTypes;
TableFooter.defaultProps = defaultProps;


export default TableFooter;
