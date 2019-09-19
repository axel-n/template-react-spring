import React, {Component} from 'react';
import {
    Table,
} from "reactstrap";
import PropTypes from "prop-types";
import {getContent} from "./table-builder";
import {FilteredTableHeader} from "./FilteredTableHeader";

const propTypes = {
    data: PropTypes.array,
    search: PropTypes.bool,
    columns: PropTypes.array,
    hover: PropTypes.bool,
    loaded: PropTypes.bool,
    onFilter: PropTypes.func,
    detailsClick: PropTypes.func
};

const defaultProps = {
    data: [],
    columns: [],
    search: false,
    hover: false,
    loaded: true,
    filters: {},
    onFilter: () => {},
    detailsClick: () => {}
};

class CustomTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            search: this.props.search,
            filters: this.props.filters
        };
    }

    setFilter = (key, value) => {
        console.log('setting filter:', key, value);
        this.setState(prevState => {
            return {
                filters:{
                    ...prevState.filters,
                    [key]: value
                }
            }
        }, () => this.props.onFilter(this.state.filters));
    };

    render() {
        return (
            <Table responsive striped hover={this.props.hover} className={this.props.loaded ? '' : 'loading'}>
                <FilteredTableHeader
                    columns={this.props.columns}
                    onFilter={this.setFilter}
                    currentFilters={this.state.filters}/>

                <tbody>
                {getContent(this.props.data, this.props.columns, this.props.detailsClick)}
                </tbody>
            </Table>
        );
    }
}

CustomTable.propTypes = propTypes;
CustomTable.defaultProps = defaultProps;

export default CustomTable;




