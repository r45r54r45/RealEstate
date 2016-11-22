import React from 'react'
import './style.scss'
import sv from '../../../server/server'

class StatusPage extends React.Component {
    constructor() {
        super();
        this.state = {
            list: []
        }
    }

    componentWillMount() {
        fetch(sv + '/expire').then(dat=>dat.json()).then(data=> {
            this.setState({
                list: data
            })
        })
    }

    render() {
        return (
            <div className="StatusPage">
                <h1>만료 날짜</h1>
                <ol>
                    {this.state.list.map((item, index)=> {
                        return (
                            <a href={'/update/' + item.id + '?name=' + item.store_name + '&id=' + item.id}>
                                <li key={index}>
                                    <span className="name">{item.store_name}</span> <span
                                    className="expire">({item.contract_end == '' ? '미지정' : item.contract_end})</span>
                                </li>
                            </a>
                        )
                    })}

                </ol>
            </div>
        );
    }
}

export default StatusPage;