import React from 'react'
import {Link} from 'react-router'
import './style.scss'
import logo from './logo.png';
import Hangul from 'hangul-js';

class UserApp extends React.Component {
    constructor(){
        super();
        this.state={
            basic: {}
        }
    }
    componentWillMount(){
        fetch('/user?id='+getCookie("userId")).then(dat=>dat.json()).then((result)=>{
            this.setState({
               basic: result.result
            })
        });
    }

    render() {
        return (
            <div className="AdminApp">
                <div className="left-area">
                    <div className="info-area">
                        <img src={logo} style={{width: '80%'}}/>
                        <h1 id="page-user"><Link to="/">{this.state.basic.store_name}</Link></h1>
                        <button onClick={e=>{setCookie("userType",'',1);setCookie("userId",'',1); location.href="/";}}>로그아웃</button>
                    </div>
                </div>
                <div className="right-area">
                    {this.props.children}
                </div>
            </div>
        )
    }
}
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
export default UserApp