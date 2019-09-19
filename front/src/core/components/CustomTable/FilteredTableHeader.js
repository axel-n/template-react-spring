import React from "react";

import './FilteredTableHeader.scss'
import typewatch from '../../utils/other/typewatch'
import CustomSelect from "../../components/CustomSelect/CustomSelect";

export function FilteredTableHeader({columns, onFilter, currentFilters}) {
    let headers = columns.map((item) => {
            if (item.filter) {
                return <HeaderInputFilter key={item.text} name={item.text} text={item.text}
                                          filter={item.filter} filterData={item.filterData}
                                          filterValue={currentFilters[item.filter]}
                                          onFilter={onFilter}/>
            } else {
                return <SimpleHeader key={item.text} text={item.text}/>
            }
        }
    );

    return (
        <thead>
        <tr className={'filtered-header-row'}>
            {headers}
        </tr>
        </thead>);
}


function SimpleHeader({text}) {
    return <th key={text}>{text}</th>;
}


class HeaderInputFilter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.filterValue ? props.filterValue : '',
            isSearch: !!props.filterValue,
            filterData: []
        };
    }

    async componentDidMount() {
        if (!!this.props.filterData) {
            let filterData;
            if (Array.isArray(this.props.filterData)) {
                filterData = this.props.filterData;
            } else {
                filterData = await this.props.filterData();
            }
            console.log('filterData for ', this.props.name, ': ', filterData);
            this.setState({
                filterData: filterData
            });
        }
    }

    toggleSearch = () => {
        this.setState(prevState => {
                return {
                    isSearch: !prevState.isSearch
                }
            }
        );
    };

    enableSearch = () => {
        this.setState({isSearch: true});
    };

    closeSearch = () => {
        let prevValue;
        this.setState(prevState => {
            prevValue = prevState.value;
            return {
                isSearch: false,
                value: ''
            }
        }, () => {
            if (prevValue !== '') {
                this.props.onFilter(this.props.filter, '');
            }
        })
    };

    handleInputChange = (event) => {
        this.setState({
            value: event.target.value
        }, () => {
            typewatch(() => {
                console.log(this.props);
                this.props.onFilter(this.props.filter, this.state.value)
            }, 1000);
        })
    };

    handleSelectChange = (item) => {
        console.log(item);
        this.setState({value: item.value},
            () => this.props.onFilter(this.props.filter, this.state.value))
    };

    render() {
        return (
            <th className={'filtered-header ' + (this.state.isSearch ? 'filtered-header_active' : '')}>
                {!this.state.isSearch ?
                    <div className='filtered-header__title'>
                        <span>{this.props.text}</span>
                        <span onClick={this.enableSearch} className="cui-magnifying-glass filtered-header__activate-btn"
                              aria-hidden="true"/>
                    </div>
                    :
                    <div className='filtered-header__input-wrapper'>
                        {this.props.filterData ?
                            <CustomSelect
                                className='filtered-header__input'
                                value={this.state.value}
                                onChange={this.handleSelectChange}
                                name={this.props.filter}
                                options={this.state.filterData}
                                placeholder={''}
                            />
                            : <input type={this.props.filter.includes('date') ? 'date' : 'text'}
                                     className='filtered-header__input'
                                     value={this.state.value}
                                     onChange={this.handleInputChange}
                            />
                        }
                        <span onClick={this.closeSearch} className="cui-circle-x filtered-header__cancel-btn"
                              aria-hidden="true"/>
                    </div>}
            </th>
        );
    }
}
