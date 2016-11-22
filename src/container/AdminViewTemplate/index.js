import React from 'react'

class ViewTemplate extends React.Component{
    render(){
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
}
export default ViewTemplate;
