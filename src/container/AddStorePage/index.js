import React from 'react'
import './style.scss'
class AddStorePage extends React.Component {
    render() {
        return (
            <div className="AddStorePage">
                <h1>부동산 신규 회원 추가 페이지</h1>
                <div className="form">
                    <div className="row">
                        <label htmlFor="name">업체 이름</label>
                        <input id="name" type="text" ref={input=>this.name = input}/>
                    </div>
                    <div className="row">
                        <label htmlFor="ceo_name">대표 성함</label>
                        <input id="ceo_name" type="text" ref={input=>this.ceo_name = input}/>
                    </div>
                    <div className="row">
                        <label htmlFor="id">아이디</label>
                        <input id="id" type="text" ref={input=>this.id = input}/>
                    </div>
                    <div className="row">
                        <label htmlFor="pw">비밀번호</label>
                        <input id="pw" type="password" ref={input=>this.pw = input}/>
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
                        <button>업로드</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddStorePage;