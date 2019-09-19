import React, {Component} from 'react';
import {Route, Redirect} from 'react-router-dom';



export default class Private extends Component {
    checkUserData() {

        let userDataRow = localStorage.getItem('user');
        let userDataJson = JSON.parse(userDataRow);
        let needPasswordReset = true, token;

        if (userDataRow) {
            needPasswordReset = userDataJson.needPasswordReset;
            token = userDataJson.token;
        }

        if (token) {

            if (!needPasswordReset) {

                // токен есть и не нужно менять пароль
                console.log("token is exist and not need needPasswordReset. continue");

            // первый раз заходит, нужно обновить пароль
            } else {
                return "/changePassword";
            }

        // токена нет, надо авторизоваться
        } else {

            console.log("token not exist. redirect to login");
            return "/login";
        }
    }



    render() {

        let pathToRedirect = this.checkUserData();

        if (pathToRedirect) {
            return <Redirect to={{pathname: pathToRedirect, state: {from: this.props.location}}}/>;

        } else return <Route path={this.props.path} component={this.props.component}/>;
    }
}
