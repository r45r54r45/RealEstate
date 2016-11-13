import React from 'react'
import {Link} from 'react-router'
import './style.scss'

class AdminApp extends React.Component {

    render() {
        let storeList=[{id:1, name: "새마음 부동산"},{id: 2, name: "부동산 114"}, {id:3, name: "아름다운 부동산"}];
        return (
            <div className="AdminApp">
                <div className="left-area">
                    <div className="info-area">
                        <h1 id="page-user"><Link to="/"> 관리자</Link></h1>
                    </div>
                    <ul className="store-list-area">
                        <li><Link to="/add">+ 부동산 추가</Link></li>
                        {storeList.map(function(item, index){
                            return (
                                <li key={index}><Link to={'/update/'+item.id+'?name='+item.name}>{item.name}</Link></li>
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