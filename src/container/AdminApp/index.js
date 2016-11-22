import React from 'react'
import {Link} from 'react-router'
import './style.scss'
import logo from './logo.png';
import Hangul from 'hangul-js';
import sv from '../../../server/server'

class AdminApp extends React.Component {
    constructor(){
        super();
        this.state={
            storeList:[],
            shownList: []
        }
        this.onSearch=this.onSearch.bind(this);
    }
    componentWillMount(){
        fetch(sv+'/user').then(dat=>dat.json()).then((result)=>{
            this.setState({
                storeList: result.result,
                shownList: result.result
            })
        });
    }
    onSearch(text){
        let length=this.state.storeList.length;
        let tempArr=[];
        this.state.storeList.forEach((item, index)=>{
            if(Hangul.search(item.store_name,text.target.value)>=0){
                tempArr.push(item);
            }
            if(length-1===index){
                this.setState({
                    shownList: tempArr
                });
            }
        },this);
    }
    render() {
        let css=`
            html{ font-size: 14px;}
`;
        return (
            <div className="AdminApp">
                <style>{css}
                    </style>
                <div className="left-area">
                    <div className="info-area">
                        <img src={logo} style={{width: '80%'}}/>
                        <h1 id="page-user"><Link to="/"> 관리자</Link></h1>
                        <button onClick={e=>{localStorage.removeItem("userType"); location.href="/";}}>로그아웃</button>
                    </div>
                    <ul className="store-list-area">
                        <li style={{background: 'white', color: '#3ca2e0', borderRadius: '10px', paddingLeft: '10px',marginBottom: '20px'}}><Link to="/add">+ 부동산 추가</Link></li>
                        <li className="searchInput" ><input placeholder="검색" type="text" onChange={(e)=>this.onSearch(e)}/></li>
                        {this.state.shownList.map(function(item, index){
                            return (
                                <li key={index}><a href={'/update/'+item.id+'?name='+item.store_name+'&id='+item.id}>{item.store_name}</a></li>
                            )
                        })}
                    </ul>

                </div>
                <div className="right-area">
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default AdminApp