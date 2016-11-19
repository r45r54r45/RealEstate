import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory,IndexRoute } from 'react-router'
import App from './App';
import './index.css';
import ViewScreen from './container/ViewScreen'
import ViewTemplate from './container/ViewTemplate'
import Login from './container/Login'
import NoMatch from './container/NoMatch'
import AdminApp from './container/AdminApp'
import StatusPage from './container/StatusPage'
import AddStorePage from './container/AddStorePage'
import UpdateStorePage from './container/UpdateStorePage'
ReactDOM.render(
    (
        getTemplate()
    ),
  document.getElementById('root')
);

function getUserType(){
    /*
    1: 관리자
    2. 고객
    3. 비로그인
     */
    // if(!localStorage.getItem('userType')){
    //     return 3;
    // }else if(localStorage.getItem('userType')=='customer'){
    //     return 2;
    // }
    return 1;

}

function getPageType(){
    if(localStorage.getItem('viewMode')){
        return 'VIEW_PAGE';
    }else{
        return 'ADMIN_PAGE';
    }
}

function getTemplate(){
    switch (getUserType()) {
        case 1: //관리자
            return (
                <Router history={browserHistory}>
                    <Route path="/" component={AdminApp}>
                    <IndexRoute component={StatusPage} />
                    <Route path="add" component={AddStorePage}/>
                    <Route path="update/:storeId" component={UpdateStorePage} onChange={()=>{this.forceUpdate()}}/>
                    <Route path="*" component={NoMatch}/>
                    </Route>
                </Router>
            )
        case 2: //고객
            if (getPageType() !== 'VIEW_PAGE') {
                return (
                    <Router history={browserHistory}>
                        {/*<Route path="/" component={App}>*/}
                        {/*<IndexRoute component={Dashboard} />*/}
                        {/*<Route path="about" component={About}/>*/}
                        {/*<Route path="users" component={Users}>*/}
                        {/*<Route path="/user/:userId" component={User}/>*/}
                        {/*</Route>*/}
                        {/*<Route path="*" component={NoMatch}/>*/}
                        {/*</Route>*/}
                    </Router>
                )
            } else{
                return (
                    <Router history={browserHistory}>
                        <Route path="/" component={ViewTemplate}>
                            <IndexRoute component={ViewScreen}/>
                            <Route path="*" component={ViewScreen}/>
                        </Route>
                    </Router>
                )
            }

        case 3: //비로그인 유저
            return (
                <Router history={browserHistory}>
                    <Route path="/" component={App}>
                        <IndexRoute component={Login} />
                        <Route path="*" component={NoMatch}/>
                    </Route>
                </Router>
            )
    }

}