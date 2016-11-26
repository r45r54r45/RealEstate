import React from 'react'
import './style.scss'
import logo from './logo.png';
import "../../../node_modules/react-toggle-switch/dist/css/switch.min.css"

class Login extends React.Component{
    constructor(){
        super();
        this.login=this.login.bind(this);
        this.state={
            viewMode: false,
            saveMode: false,
            stored_id: getCookie("stored_id"),
            stored_pw: getCookie("stored_pw")
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
        if(this.state.saveMode===true){
            setCookie("stored_id",this.id.value,10);
            setCookie("stored_pw",this.pw.value,10);
        }
        //test code
        if(this.id.value==='admin'&&this.pw.value==='admin'){
            setCookie('userType','admin',1);
            location.reload();
        }else{
            fetch('/login',{
                method: "POST",
                headers: new Headers({
                    'Content-Type': 'application/json'
                }),
                body: JSON.stringify({
                    login_id: this.id.value,
                    login_pw: this.pw.value
                })
            }).then(dat=>dat.json()).then(data=>{
                if(data.result){
                    setCookie('userType','customer',1);
                    setCookie('userId',data.userId.toString(),1);
                    // if(this.state.viewMode===true){
                    //     setCookie('viewMode','true');
                    // }
                    var openNewWindow = window.open("about:blank");

                    openNewWindow.location.href = 'http://104.197.153.50/preview?id='+data.userId.toString();
                    location.reload();
                }else{
                    alert('아이디 비밀번호가 일치하지 않습니다');
                }
            })
        }
    }
    render(){
        return (
            <div className="LoginPage">
                <div className="login-area" style={{overflow: 'hidden'}}>
                    <div><img style={{width:'100%'}} src={logo}/></div>
                    {/*<div className="title">로그인</div>*/}
                    <div className="input-area">
                        <input ref={input=>this.id=input} className="id" placeholder="아이디" type="text"
                               onChange={e=>this.setState({stored_id: e.target.value})} value={this.state.stored_id}/>
                        <input ref={input=>this.pw=input} className="pw" placeholder="비밀번호"
                               onChange={e=>this.setState({stored_pw: e.target.value})} value={this.state.stored_pw} type="password"/>
                        <label htmlFor="viewMode" style={{fontSize: '15px'}}>
                            <input onChange={e=>this.setState({viewMode:!this.state.viewMode})} id="viewMode" type="checkbox" value="Bike"/>
                            뷰모드
                        </label>
                        <label htmlFor="save" style={{fontSize: '15px'}}>
                            <input onChange={e=>this.setState({saveMode:!this.state.saveMode})} id="save" type="checkbox"/>
                            아이디/비번 저장
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
export default Login;