import React from 'react'

class ShowHide extends React.Component{
    constructor(){
        super();
    }
    render(){
        return(
            <div style={this.props.show?{display:'initial'}:{display:'none'}}>
                {this.props.children}
            </div>
        )
    }
}

export default ShowHide