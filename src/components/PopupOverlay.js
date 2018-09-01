import React, { Component } from 'react';

class PopupOverlay extends Component {
    render(){
        return <div className={"popup-overlay "+ ((this.props.show)? "show": "hide")}></div>
    }
   
}

export default PopupOverlay;