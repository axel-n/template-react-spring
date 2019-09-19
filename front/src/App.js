import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import './core/scss/App.scss';
import Private from './core/Private';
import {request} from "./core/utils/request/request";

// Containers
const DefaultLayout = React.lazy(() => import('./core/containers/DefaultLayout'));

// Pages
const Login = React.lazy(() => import('./core/Pages/Login/Login'));
const Page404 = React.lazy(() => import('./core/Pages/Page404/Page404'));
const Page500 = React.lazy(() => import('./core/Pages/Page500/Page500'));
const RecoveryPass = React.lazy(() => import('./core/Pages/Login/RecoveryPassword'));
const ChangePassword = React.lazy(() => import('./core/Pages/Login/ChangePassword'));

class App extends Component {

    render() {
        return (
            <BrowserRouter>
                <React.Suspense fallback={request.loading()}>
                    <Switch>
                        <Route exact path="/login" name="Login Page" component={Login}/>
                        <Route exact path="/recoveryPassword" name="Recovery pass" component={RecoveryPass}/>
                        <Route exact path="/changePassword" name="Recovery pass" component={ChangePassword}/>
                        <Route exact path="/404" name="Page 404" component={Page404}/>
                        <Route exact path="/500" name="Page 500" component={Page500}/>
                        <Private path="/" name="Home" component={DefaultLayout}/>
                    </Switch>
                </React.Suspense>
            </BrowserRouter>
        );
    }
}

export default App;