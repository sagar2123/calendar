import React, { Component } from 'react';
import {observer, inject} from 'mobx-react';

@inject('store')
@observer
class DayComponent extends Component {
    // var
    render(){
        return  <div className={"container-width " + ((this.props.store.currentDate.getDate() == this.props.day.date)? "highlight": "")} onClick = {()=> this.props.store.getEventInfo(new Date(this.props.day.year, this.props.day.month, this.props.day.date))}>
                    {this.props.day.date}
                </div>
    }
   
}

export default DayComponent;