import React, {Component, Suspense} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {Container} from 'reactstrap';

import {
    AppSidebar
} from '@coreui/react';
// sidebar nav config
import navigation from '../../../_nav';
// routes config
import routes from '../../../routes';
import AppHeader from "@coreui/react/es/Header";
import DefaultHeader from "./DefaultHeader";
import CustomBreadcrumb from "./CustomBreadcrumb";
import AppSidebarMinimizer from "@coreui/react/es/SidebarMinimizer";

import AppSidebarNav from "@coreui/react/es/SidebarNav";
import {request} from "../../utils/request/request";

class DefaultLayout extends Component {

    constructor(props) {
        super(props);

        this.logout = this.logout.bind(this);
        this.move = this.move.bind(this);
    }


    logout(e) {
        e.preventDefault();

        localStorage.removeItem('user');
        this.props.history.push('/login')
    }

    move(e, uri) {
        e.preventDefault();
        this.props.history.push(uri)
    }

    render() {

        return (
            <div className="app">

                <div className="d-lg-none">
                    <AppHeader fixed>
                        <Suspense fallback={request.loading()}>
                            <DefaultHeader headerName="Biller portal"/>
                        </Suspense>
                    </AppHeader>
                </div>
                <div className="app-body">
                    <AppSidebar fixed display="lg">
                        <Suspense>
                            <AppSidebarNav navConfig={navigation} {...this.props} />
                        </Suspense>

                        <AppSidebarMinimizer/>
                    </AppSidebar>
                    <main className="main">
                        <CustomBreadcrumb appRoutes={routes} currentUrl={this.props.location.pathname}
                                          onSettings={this.settings}
                                          onMove={this.move}
                                          onLogout={this.logout}/>
                        <Container fluid>
                            <Suspense fallback={request.loading()}>
                                <Switch>
                                    {routes.map((route, idx) => {


                                        // return route.component && this.state.adminRoles.includes(route.permission) ? (
                                        return <Route
                                            key={idx}
                                            path={route.path}
                                            exact
                                            name={route.name}
                                            render={props => <route.component {...props}/>}/>
                                        //) : null;
                                    })}

                                    {/* if page not found */}
                                    <Redirect from="/" to="/404"/>
                                </Switch>
                            </Suspense>
                        </Container>
                    </main>

                </div>
            </div>
        );
    }
}

export default DefaultLayout;
