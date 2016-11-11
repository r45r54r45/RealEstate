import React from 'react'
import './style.scss'
import "../../../node_modules/react-toggle-switch/dist/css/switch.min.css"

class Login extends React.Component{
    constructor(){
        super();
        this.login=this.login.bind(this);
        this.state={
            viewMode: false
        }
    }
    login(){
        console.log(this.id.value, this.pw.value, this.state.viewMode)
        if(this.id.value===''){
            this.id.focus();
            return;
        }else if(this.pw.value===''){
            this.pw.focus()
            return;
        }
        //test code
        if(this.id.value==='test'&&this.pw.value==='1234'&&this.state.viewMode===true){
            localStorage.setItem('viewMode','true');
            localStorage.setItem('userType','customer');
            location.reload();
        }else{
            alert('개발중입니다');
        }

    }
    render(){
        return (
            <div className="LoginPage">
                <div className="login-area">
                    <div className="title">로그인</div>
                    <div className="input-area">
                        <input ref={input=>this.id=input} className="id" placeholder="아이디" type="text"/>
                        <input ref={input=>this.pw=input} className="pw" placeholder="비밀번호" type="password"/>
                        <label htmlFor="viewMode">
                            <input onChange={e=>this.setState({viewMode:!this.state.viewMode})} id="viewMode" type="checkbox" value="Bike"/>
                            뷰모드
                        </label>
                    </div>
                    <div className="button">
                        <button onClick={this.login}>Log in</button>
                    </div>
                </div>
            </div>
        )
    }
}
export default Login;