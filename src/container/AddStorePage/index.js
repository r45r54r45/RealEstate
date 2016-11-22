import React from 'react'
import './style.scss'
import DayPicker from 'react-day-picker';
import MomentLocaleUtils from 'react-day-picker/moment';
import 'moment/locale/ko';
import 'react-day-picker/lib/style.css';

class AddStorePage extends React.Component {
    constructor(){
        super();
        this.state={
            contract_start: null,
            selectedDay: null,
            contract_duration: 1,
            contract_end: null
        }
        this.submit=this.submit.bind(this);
        this.handleDayClick=this.handleDayClick.bind(this);
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
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
                store_name: this.store_name.value,
                ceo_name: this.ceo_name.value,
                login_id: this.login_id.value,
                login_pw: this.login_pw.value,
                tel: this.tel.value,
                phone: this.phone.value,
                contract_start: this.state.contract_start,
                contract_duration: this.state.contract_duration,
                contract_end: this.state.contract_end
            })
        }).then(()=> {
            alert('업체가 추가되었습니다');
            location.href = "/";
        })
    }
    handleDayClick(e, day, {selected}){
        this.setState({
            selectedDay: selected ? null : day
        }, ()=> {
            this.setState({
                    contract_start: this.state.selectedDay ? this.state.selectedDay.toLocaleDateString() : ""
            },()=>{
                this.computeDate(this.state.contract_duration);
            })
        });
    }
    computeDate(date){
        if(!this.state.contract_start){
            alert('먼저 계약 시작일을 선택해주세요');
            return;
        }else{
            this.setState({
                contract_duration: date
            });
        }
        let start=new Date(this.state.contract_start);
        start.setMonth(start.getMonth()+parseInt(date));
        let result=start.toLocaleDateString();

        this.setState({
            contract_end: result
        });
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
                        <label htmlFor="phone">계약 시작일</label>
                        <input id="phone" type="text" value={this.state.contract_start} placeholder="아래에서 클릭" readOnly/>
                        <DayPicker
                            style={{width: '229px'}}
                            dir="false"
                            locale={ 'ko' }
                            localeUtils={ MomentLocaleUtils }
                            modifiers={ {sunday: day => day.getDay() === 0} }
                            onDayClick={ this.handleDayClick }
                        />
                    </div>
                    <div className="row">
                        <label htmlFor="phone">계약 기간</label>
                        <select defaultValue={1} value={this.state.contract_duration} onChange={e=>{this.computeDate(e.target.value)}} style={{width:'129px'}}>
                            {[1,2,3,4,5,6,7,8,9,10,11,12].map((item, index)=>{
                                return (
                                    <option key={index} value={item}>{item} 개월</option>
                                )
                            })}
                        </select>

                    </div>
                    <div className="row">
                        <label htmlFor="phone">계약 종료일</label>
                        <input id="phone" type="text" value={this.state.contract_end} readOnly/>
                    </div>
                    {/*<div className="row">*/}
                        {/*<label htmlFor="phone">계약 시작일</label>*/}
                        {/*<input id="phone" type="text" ref={input=>this.contract_start = input}/>*/}
                    {/*</div>*/}
                    {/*<div className="row">*/}
                        {/*<label htmlFor="phone">계약 기간</label>*/}
                        {/*<input id="phone" type="text" ref={input=>this.contract_duration = input}/>*/}
                    {/*</div>*/}
                    {/*<div className="row">*/}
                        {/*<label htmlFor="phone">계약 종료일</label>*/}
                        {/*<input id="phone" type="text" ref={input=>this.contract_end = input}/>*/}
                    {/*</div>*/}
                    <div className="row">
                        <button onClick={this.submit}>업로드</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddStorePage;