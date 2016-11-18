import React from 'react'
import './style.scss'
class AddStorePage extends React.Component {
    constructor(){
        super();
        this.submit=this.submit.bind(this);
    }
    submit() {
        if (this.store_name.value == "") {
            this.store_name.focus();
            return;
        } else if (this.ceo_name.value == "") {
            this.store_name.focus();
            return;

        } else if (this.login_id.value == "") {
            this.login_id.focus();
            return;

        } else if (this.login_pw.value == "") {
            this.login_pw.focus();
            return;

        } else if (this.login_pw.value !== this.pw2.value) {
            this.pw2.focus();
            return;

        } else if (this.tel.value == "") {
            this.tel.focus();
            return;

        } else if (this.phone.value == "") {
            this.phone.focus();
            return;

        }
        fetch('/user',{
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'Application/json'
            }),
            body: JSON.stringify({
                store_name: this.store_name.value,
                ceo_name: this.ceo_name.value,
                login_id: this.login_id.value,
                login_pw: this.login_pw.value,
                tel: this.tel.value,
                phone: this.phone.value
            })
        }).then(()=> {
            alert('업체가 추가되었습니다');
            location.href = "/";
        })
    }
    render() {
        return (
            <div className="AddStorePage">
                <h1>부동산 신규 회원 추가 페이지</h1>
                <div className="form">
                    <div className="row">
                        <label htmlFor="name">업체 이름</label>
                        <input id="name" type="text" ref={input=>this.store_name = input}/>
                    </div>
                    <div className="row">
                        <label htmlFor="ceo_name">대표 성함</label>
                        <input id="ceo_name" type="text" ref={input=>this.ceo_name = input}/>
                    </div>
                    <div className="row">
                        <label htmlFor="id">아이디</label>
                        <input id="id" type="text" ref={input=>this.login_id = input}/>
                    </div>
                    <div className="row">
                        <label htmlFor="pw">비밀번호</label>
                        <input id="pw" type="password" ref={input=>this.login_pw = input}/>
                    </div>
                    <div className="row">
                        <label htmlFor="pw2">비밀번호 확인</label>
                        <input id="pw2" type="password" ref={input=>this.pw2 = input}/>
                    </div>
                    <div className="row">
                        <label htmlFor="tel">전화번호(유선)</label>
                        <input id="tel" type="tel" ref={input=>this.tel = input}/>
                    </div>
                    <div className="row">
                        <label htmlFor="phone">휴대폰 번호</label>
                        <input id="phone" type="tel" ref={input=>this.phone = input}/>
                    </div>
                    <div className="row">
                        <button onClick={this.submit}>업로드</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddStorePage;