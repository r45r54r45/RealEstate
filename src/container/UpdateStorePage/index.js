import React from 'react'
import './style.scss'
import ShowHide from '../../component/ShowHide'


class UpdateStorePage extends React.Component {
    constructor() {
        super();
        this.state = {
            current: 'list',
            pathName: null,
            new: {
                type:0
            },
            edit:{
                type:0
            }
        }
        this.editBasic = this.editBasic.bind(this);
        this.newItem=this.newItem.bind(this);
        this.editItem=this.editItem.bind(this);
        this.selectType=this.selectType.bind(this);
    }
    editBasic() {
        if(this.state.current==='basic'){
            this.setState(
                {
                    current: 'list'
                }
            )
        }else{
            this.setState(
                {
                    current: 'basic'
                }
            )
        }

    }
    newItem(type){
        if(type.cancel){
            this.setState(
                {
                    current: 'list'
                }
            )
        }else{
            this.setState(
                {
                    current: 'new'
                }
            )
        }

    }
    editItem(type){
        if(type.cancel){
            this.setState({
                current: 'list'
            })
        }else{
            this.setState(
                {
                    current: 'edit'
                }
            )
        }

    }
    componentWillReceiveProps(){
        if(this.props.location.pathname!==this.state.pathName){
            this.setState({
                pathName: this.props.location.pathname,
                current: 'list'
            })
        }
    }
    selectType(section,type){
        this.setState({
            [section]:{
                type: type
            }
        })
    }
    render() {
        let name = this.props.location.query.name;
        let itemList=["신시가지 아파트","센트럴파크 푸르지오", "더샵4차"];
        return (
            <div className="UpdateStorePage">
                <h1>{name}
                    <button onClick={this.editBasic} className="editBasicButton">기본 정보 수정</button>
                </h1>
                <ShowHide show={this.state.current!=='new'}>
                    <button className="newItemButton" onClick={this.newItem}>새 매물</button>
                </ShowHide>

                <ShowHide show={this.state.current==='list'}>
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
                <ShowHide show={this.state.current==='edit'}>
                    <form className="newItem-area">
                        <div className="row">
                            <h4>매물 종류</h4>
                            <input id="j_edit" name="type" type="radio" onChange={this.selectType.bind(this,'edit',1)} ref={input=>this.name = input}/>
                            <label htmlFor="j_edit">전세</label>

                            <input id="m_edit" name="type" type="radio" onChange={this.selectType.bind(this,'edit',2)} ref={input=>this.name = input}/>
                            <label htmlFor="m_edit">매매</label>

                            <input id="w_edit" name="type" type="radio" onChange={this.selectType.bind(this,'edit',3)} ref={input=>this.name = input}/>
                            <label htmlFor="w_edit">월세</label>
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
                        <div className="row" style={this.state.edit.type!==2?{display:'none'}:{}}>
                            <h4>매매가</h4>
                            <input id="ceo_name" type="text" ref={input=>this.ceo_name = input}/>원
                        </div>
                        <div className="row" style={this.state.edit.type!==1?{display:'none'}:{}}>
                            <h4>전세가</h4>
                            <input id="ceo_name" type="text" ref={input=>this.ceo_name = input}/>원
                        </div>
                        <div className="row" style={this.state.edit.type!==3?{display:'none'}:{}}>
                            <h4>보증금</h4>
                            <input id="ceo_name" type="text" ref={input=>this.ceo_name = input}/>원
                        </div>
                        <div className="row" style={this.state.edit.type!==3?{display:'none'}:{}}>
                            <h4>월세</h4>
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

                <ShowHide show={this.state.current==='basic'}>
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
                <ShowHide show={this.state.current==='new'}>
                    <form className="newItem-area">
                        <div className="row">
                            <h4>매물 종류</h4>
                            <input id="j_new" name="type" type="radio" onChange={this.selectType.bind(this,'new',1)} ref={input=>this.name = input}/>
                            <label htmlFor="j_new">전세</label>

                            <input id="m_new" name="type" type="radio" onChange={this.selectType.bind(this,'new',2)} ref={input=>this.name = input}/>
                            <label htmlFor="m_new">매매</label>

                            <input id="w_new" name="type" type="radio" onChange={this.selectType.bind(this,'new',3)} ref={input=>this.name = input}/>
                            <label htmlFor="w_new">월세</label>
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
                        <div className="row" style={this.state.new.type!==2?{display:'none'}:{}}>
                            <h4>매매가</h4>
                            <input id="ceo_name" type="text" ref={input=>this.ceo_name = input}/>원
                        </div>
                        <div className="row" style={this.state.new.type!==1?{display:'none'}:{}}>
                            <h4>전세가</h4>
                            <input id="ceo_name" type="text" ref={input=>this.ceo_name = input}/>원
                        </div>
                        <div className="row" style={this.state.new.type!==3?{display:'none'}:{}}>
                            <h4>보증금</h4>
                            <input id="ceo_name" type="text" ref={input=>this.ceo_name = input}/>원
                        </div>
                        <div className="row" style={this.state.new.type!==3?{display:'none'}:{}}>
                            <h4>월세</h4>
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