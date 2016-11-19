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
        fetch('/user?id='+localStorage.getItem("userId")).then(dat=>dat.json()).then((result)=>{
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
                        <button onClick={e=>{localStorage.removeItem("userType");localStorage.removeItem("userId"); location.href="/";}}>로그아웃</button>
                    </div>
                </div>
                <div className="right-area">
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default UserApp