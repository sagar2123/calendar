import React, { Component } from 'react';
import {observer, inject} from 'mobx-react';

@inject('store')
@observer
class DayComponent extends Component {
    render(){
    if(this.props.store.events && this.props.store.events[this.props.day.year] && this.props.store.events[this.props.day.year][this.props.day.month] && this.props.store.events[this.props.day.year][this.props.day.month][this.props.day.date]){
    var calendarEvents = this.props.store.events[this.props.day.year][this.props.day.month][this.props.day.date].map((obj, index)=> {
        return <button key={index} className="event-button" onClick={(e)=> this.props.store.addEvent(e, new Date(this.props.day.year, this.props.day.month, this.props.day.date), 'edit', index)}>{obj.eventName}</button>;
     });
    }
        return  <div className={"container-width " + ((this.props.store.currentDate.getDate() === this.props.day.date)? "highlight": "")} onClick = {(e)=> this.props.store.addEvent(e, new Date(this.props.day.year, this.props.day.month, this.props.day.date), 'add', -1)}>
                    {this.props.day.date}
                    {calendarEvents}
                </div>
    }
   
}

export default DayComponent;