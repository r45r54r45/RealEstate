import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, Link, browserHistory, IndexRoute} from 'react-router'
import App from './App';
import './index.css';
import ViewScreen from './container/ViewScreen'
import ViewTemplate from './container/ViewTemplate'
import AdminViewScreen from './container/AdminViewScreen'
import AdminViewTemplate from './container/AdminViewTemplate'

import Login from './container/Login'
import NoMatch from './container/NoMatch'
import AdminApp from './container/AdminApp'
import StatusPage from './container/StatusPage'
import AddStorePage from './container/AddStorePage'
import UpdateStorePage from './container/UpdateStorePage'

import UserApp from './container/UserApp'
import UserUpdateStorePage from './container/UserUpdateStorePage'
ReactDOM.render(
    (
        getTemplate()
    ),
    document.getElementById('root')
);
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length,c.length);
        }
    }
    return "";
}
function getUserType() {
    /*
     1: 관리자
     2. 고객
     3. 비로그인
     */
    // return 2;

    if (getCookie('userType')=="") {
        return 3;
    } else if (getCookie('userType') == 'customer') {
        return 2;
    } else if (getCookie('userType') == 'admin') {
        return 1;
    }
    return 3;
}

function getPageType() {
    // return 'VIEW_PAGE';

    if (getCookie('viewMode')!=='') {
        return 'VIEW_PAGE';
    } else {
        return 'ADMIN_PAGE';
    }
}

function getTemplate() {
    switch (getUserType()) {
        case 1: //관리자
            return (
                <Router history={browserHistory}>
                    <Route path="/preview" component={AdminViewTemplate}>
                        <IndexRoute component={AdminViewScreen}/>
                        <Route path="*" component={NoMatch}/>
                    </Route>
                    <Route path="/" component={AdminApp}>
                        <IndexRoute component={StatusPage}/>
                        <Route path="add" component={AddStorePage}/>
                        <Route path="update/:storeId" component={UpdateStorePage}/>
                        <Route path="*" component={NoMatch}/>
                    </Route>
                </Router>
            )
        case 2: //고객
            if (getPageType() !== 'VIEW_PAGE') {
                return (
                    <Router history={browserHistory}>
                        <Route path="/preview" component={AdminViewTemplate}>
                            <IndexRoute component={AdminViewScreen}/>
                            <Route path="*" component={NoMatch}/>
                        </Route>
                        <Route path="/" component={UserApp}>
                            <IndexRoute component={UserUpdateStorePage}/>
                            <Route path="*" component={NoMatch}/>
                        </Route>
                    </Router>
                )
            } else {
                return (
                    <Router history={browserHistory}>
                        <Route path="/" component={ViewTemplate}>
                            <IndexRoute component={ViewScreen}/>
                            <Route path="*" component={ViewScreen}/>
                            <Route path="*" component={NoMatch}/>
                        </Route>
                    </Router>
                )
            }

        case 3: //비로그인 유저
            return (
                <Router history={browserHistory}>
                    <Route path="/" component={App}>
                        <IndexRoute component={Login}/>
                        <Route path="*" component={NoMatch}/>
                    </Route>
                </Router>
            )
    }

}