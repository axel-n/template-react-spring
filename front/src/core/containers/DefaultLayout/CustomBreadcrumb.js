import React, {Component} from 'react';
import {ButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle} from "reactstrap";
const linkStyle = {
    cursor: "pointer",
    color: '#53adff',
    textDecoration: 'underline'
};

function firstUppercase(string) {
    if (string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
}

class CustomBreadcrumb extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isOpenSettings: false,
        };

        let userDataRow = localStorage.getItem('user');
        let jsonData = JSON.parse(userDataRow);
        if (jsonData) {
            this.name = jsonData.name;
            this.role = jsonData.role;
        }

        this.toggleSettings = this.toggleSettings.bind(this);

    }

    generateBreadcrumbs() {
        let currentRoute = this.props.appRoutes.find(item => item.path === this.props.currentUrl);
        if (currentRoute) return currentRoute.path.split("/");
    }

    toggleSettings() {
        this.setState({
            isOpenSettings: !this.state.isOpenSettings
        });

    }

    printBreadcrumbs() {
        let breadCrumbsData = this.generateBreadcrumbs();

        if (breadCrumbsData) {
            let itemsCount = breadCrumbsData.length;

            let breadCrumbs = breadCrumbsData.map((link, linkKey) => {

                // root and duplicate breadcrumb
                if (link.length === 0 && linkKey + 1 === itemsCount) return null;

                if (link.length === 0)
                    return <li key={linkKey} className="breadcrumb-item">
                        <span style={linkStyle} onClick={event => this.props.onMove(event, "/")}>Home</span>
                    </li>;
                else if (linkKey + 1 !== itemsCount)
                    return <li key={linkKey} className="breadcrumb-item">
                        <span style={linkStyle}
                              onClick={event => this.props.onMove(event, "/" + link)}>{firstUppercase(link)}</span>
                    </li>;
                else
                    return <li key={linkKey} className="breadcrumb-item active">{firstUppercase(link)}</li>;
            });

            return <nav className="" aria-label="breadcrumb">
                <ol className="breadcrumb">
                    {breadCrumbs}
                    <li className="breadcrumb-menu">

                        <ButtonDropdown isOpen={this.state.isOpenSettings} toggle={this.toggleSettings}>
                            <DropdownToggle nav caret> {this.name}</DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem header tag="div" className="text-center">
                                    <span>{this.role}</span>
                                </DropdownItem>

                                <DropdownItem divider/>
                                <DropdownItem onClick={this.props.onLogout}>
                                    <i className="cui-account-logout"/> Logout</DropdownItem>
                            </DropdownMenu>
                        </ButtonDropdown>
                    </li>


                </ol>
            </nav>;
        }
    }


    render() {
        return (
            <div>
                {this.printBreadcrumbs()}
            </div>
        );
    }


}

export default CustomBreadcrumb;
