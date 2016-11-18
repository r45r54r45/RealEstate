import React from 'react'
import {Link} from 'react-router'
import './style.scss'
import Hangul from 'hangul-js';

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
        fetch('/user').then(dat=>dat.json()).then((result)=>{
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
        return (
            <div className="AdminApp">
                <div className="left-area">
                    <div className="info-area">
                        <h1 id="page-user"><Link to="/"> 관리자</Link></h1>
                    </div>
                    <ul className="store-list-area">
                        <li style={{background: 'white', color: '#3ca2e0', borderRadius: '10px', paddingLeft: '10px',marginBottom: '20px'}}><Link to="/add">+ 부동산 추가</Link></li>
                        <li className="searchInput" ><input placeholder="검색" type="text" onChange={(e)=>this.onSearch(e)}/></li>
                        {this.state.shownList.map(function(item, index){
                            return (
                                <li key={index}><Link to={'/update/'+item.id+'?name='+item.store_name}>{item.store_name}</Link></li>
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