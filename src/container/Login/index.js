import React from 'react'
import './style.scss'

class Login extends React.Component{
    render(){
        return (
            <div className="LoginPage">
                <div className="login-area">
                    <div className="title">로그인</div>
                    <div className="input-area">
                        <input className="id" placeholder="아이디" type="text"/>
                        <input className="pw" placeholder="비밀번호" type="password"/>
                    </div>
                    <div className="button">
                        <button>Log in</button>
                    </div>
                </div>
            </div>
        )
    }
}
export default Login;