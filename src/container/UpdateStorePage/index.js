import React from 'react'
import './style.scss'
import ShowHide from '../../component/ShowHide'


class UpdateStorePage extends React.Component {
    constructor() {
        super();
        this.state = {
            editBasic: false,
            newItem: false,
            editItem: false,
            itemList: true,
            pathName: null,
            editData: null
        }
        this.editBasic = this.editBasic.bind(this);
        this.newItem=this.newItem.bind(this);
        this.editItem=this.editItem.bind(this);
    }
    editBasic() {
        this.setState(
            {
                editBasic: !this.state.editBasic,
                newItem: false,
                editItem: false,
                itemList: this.state.editBasic
            }
        )
    }
    newItem(type){
        type.cancel=type.cancel||false;
        this.setState(
            {
                editBasic: false,
                newItem: !type.cancel,
                editItem: false,
                itemList: type.cancel
            }
        )
    }
    editItem(type){
        if(type.cancel===undefined){
            type.cancel=false;
            this.setState({
                editData: type.data
            })
        }
        this.setState(
            {
                editBasic: false,
                newItem: false,
                editItem: !type.cancel,
                itemList: type.cancel
            }
        )
    }
    componentWillReceiveProps(){
        if(this.props.location.pathname!==this.state.pathName){
            this.setState({
                pathName: this.props.location.pathname,
                editBasic: false,
                editItem: false,
                newItem: false,
                itemList: true
            })
        }
    }
    render() {
        let name = this.props.location.query.name;
        let itemList=["신시가지 아파트","센트럴파크 푸르지오", "더샵4차"];
        return (
            <div className="UpdateStorePage">
                <h1>{name}
                    <button onClick={this.editBasic} className="editBasicButton">기본 정보 수정</button>
                </h1>
                <ShowHide show={!this.state.newItem}>
                    <button className="newItemButton" onClick={this.newItem}>새 매물</button>
                </ShowHide>

                <ShowHide show={this.state.itemList}>
                    <div className="ItemList">
                        <h3>매물 리스트</h3>
                        <ul>
                            {itemList.map((item, index)=>{
                                return (
                                <li key={index}>
                                    {item} <a onClick={()=>{confirm('삭제하시겠습니까?')}} className="delete">삭제</a> <a className="edit" onClick={this.editItem.bind(this, {cancel:undefined,data:item})}>수정</a>
                                </li>
                                )
                            })}
                        </ul>
                    </div>
                </ShowHide>
                <ShowHide show={this.state.editItem}>
                    <form className="newItem-area">
                        <div className="row">
                            <h4>매물 종류</h4>
                            <input id="type" name="type" type="radio" ref={input=>this.name = input}/>
                            <label htmlFor="type">전세</label>

                            <input id="type" name="type" type="radio" ref={input=>this.name = input}/>
                            <label htmlFor="type">매매</label>

                            <input id="type" name="type" type="radio" ref={input=>this.name = input}/>
                            <label htmlFor="type">월세</label>
                        </div>
                        <div className="row">
                            <h4>매물 제목</h4>
                            <input id="name" value={this.state.editData} type="text" ref={input=>this.name = input}/>
                        </div>
                        <div className="row">
                            <h4>위치</h4>
                            <input id="ceo_name" type="text" ref={input=>this.ceo_name = input}/>
                        </div>
                        <div className="row">
                            <h4>공급 면적</h4>
                            <input id="ceo_name" type="text" ref={input=>this.ceo_name = input}/>㎡
                        </div>
                        <div className="row">
                            <h4>전용 면적</h4>
                            <input id="ceo_name" type="text" ref={input=>this.ceo_name = input}/>㎡
                        </div>
                        <div className="row">
                            <h4>해당 층</h4>
                            <input id="ceo_name" type="text" ref={input=>this.ceo_name = input}/>층
                        </div>
                        <div className="row">
                            <h4>전체 층</h4>
                            <input id="ceo_name" type="text" ref={input=>this.ceo_name = input}/>층
                        </div>
                        <div className="row">
                            <h4>방수</h4>
                            <input id="ceo_name" type="text" ref={input=>this.ceo_name = input}/>개
                        </div>
                        <div className="row">
                            <h4>욕실 수</h4>
                            <input id="ceo_name" type="text" ref={input=>this.ceo_name = input}/>개
                        </div>
                        <div className="row">
                            <h4>입주 가능일</h4>
                            <input id="ceo_name" type="text" ref={input=>this.ceo_name = input}/>
                        </div>
                        <div className="row">
                            <h4>특징</h4>
                            <input id="ceo_name" type="text" ref={input=>this.ceo_name = input}/>
                        </div>
                        <div className="row">
                            <h4>매매가</h4>
                            <input id="ceo_name" type="text" ref={input=>this.ceo_name = input}/>원
                        </div>
                        <div className="row">
                            <h4>보증금</h4>
                            <input id="ceo_name" type="text" ref={input=>this.ceo_name = input}/>원
                        </div>
                        <div className="row">
                            <h4>사진</h4>
                            <input type="file" accept="image/x-png,image/gif,image/jpeg" multiple/>
                        </div>
                    </form>
                    <div>
                        <button id="newItemUploadButton">수정</button>
                        <button style={{marginLeft: '10px'}} id="newItemUploadButton" onClick={this.editItem.bind(this,{cancel:true})}>취소</button>
                    </div>
                </ShowHide>

                <ShowHide show={this.state.editBasic}>
                    <form className="editBasicForm">
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
                            <label htmlFor="tel">전화번호(유선)</label>
                            <input id="tel" type="tel" ref={input=>this.tel = input}/>
                        </div>
                        <div className="row">
                            <label htmlFor="phone">휴대폰 번호</label>
                            <input id="phone" type="tel" ref={input=>this.phone = input}/>
                        </div>
                        <div className="row">
                            <button>기본정보 수정</button>
                        </div>
                    </form>
                </ShowHide>
                <ShowHide show={this.state.newItem}>
                    <form className="newItem-area">
                        <div className="row">
                            <h4>매물 종류</h4>
                            <input id="type" name="type" type="radio" ref={input=>this.name = input}/>
                            <label htmlFor="type">전세</label>

                            <input id="type" name="type" type="radio" ref={input=>this.name = input}/>
                            <label htmlFor="type">매매</label>

                            <input id="type" name="type" type="radio" ref={input=>this.name = input}/>
                            <label htmlFor="type">월세</label>
                        </div>
                        <div className="row">
                            <h4>매물 제목</h4>
                            <input id="name" type="text" ref={input=>this.name = input}/>
                        </div>
                        <div className="row">
                            <h4>위치</h4>
                            <input id="ceo_name" type="text" ref={input=>this.ceo_name = input}/>
                        </div>
                        <div className="row">
                            <h4>공급 면적</h4>
                            <input id="ceo_name" type="text" ref={input=>this.ceo_name = input}/>㎡
                        </div>
                        <div className="row">
                            <h4>전용 면적</h4>
                            <input id="ceo_name" type="text" ref={input=>this.ceo_name = input}/>㎡
                        </div>
                        <div className="row">
                            <h4>해당 층</h4>
                            <input id="ceo_name" type="text" ref={input=>this.ceo_name = input}/>층
                        </div>
                        <div className="row">
                            <h4>전체 층</h4>
                            <input id="ceo_name" type="text" ref={input=>this.ceo_name = input}/>층
                        </div>
                        <div className="row">
                            <h4>방수</h4>
                            <input id="ceo_name" type="text" ref={input=>this.ceo_name = input}/>개
                        </div>
                        <div className="row">
                            <h4>욕실 수</h4>
                            <input id="ceo_name" type="text" ref={input=>this.ceo_name = input}/>개
                        </div>
                        <div className="row">
                            <h4>입주 가능일</h4>
                            <input id="ceo_name" type="text" ref={input=>this.ceo_name = input}/>
                        </div>
                        <div className="row">
                            <h4>특징</h4>
                            <input id="ceo_name" type="text" ref={input=>this.ceo_name = input}/>
                        </div>
                        <div className="row">
                            <h4>매매가</h4>
                            <input id="ceo_name" type="text" ref={input=>this.ceo_name = input}/>원
                        </div>
                        <div className="row">
                            <h4>보증금</h4>
                            <input id="ceo_name" type="text" ref={input=>this.ceo_name = input}/>원
                        </div>
                        <div className="row">
                            <h4>사진</h4>
                            <input type="file" accept="image/x-png,image/gif,image/jpeg" multiple/>
                        </div>
                    </form>
                    <div>
                        <button id="newItemUploadButton">업로드</button>
                        <button style={{marginLeft: '10px'}} id="newItemUploadButton" onClick={this.newItem.bind(this,{cancel:true})}>취소</button>
                    </div>
                </ShowHide>
            </div>
        );
    }
}

export default UpdateStorePage;