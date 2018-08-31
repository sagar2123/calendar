import React, { Component } from 'react';
import {observer, inject} from 'mobx-react';

@inject('store')
@observer
class HourComponent extends Component {
    // onClick={(e)=> this.props.store.addEvent(e, new Date(currentYear, currentMonth, currentDate), 'edit', index)}
    render(){
        var currentYear = this.props.store.currentDate.getFullYear();
        var currentMonth = this.props.store.currentDate.getMonth();
        var currentDate = this.props.store.currentDate.getDate();
        if(this.props.store.events && this.props.store.events[currentYear] && this.props.store.events[currentYear][currentMonth] && this.props.store.events[currentYear][currentMonth][currentDate]){
            var hourEvent = this.props.store.events[currentYear][currentMonth][currentDate].map((obj, index)=> {
                if(obj.eventStartTime === this.props.store.hours[this.props.index]){
                    return <button className="event-button">{obj.eventStartTime}</button>;
                }
        });
        }
        return  <div className="row hours-block-container">
            <div className="col-md-1 hours-block">
                {this.props.store.hours[this.props.index]}
            </div>
            <div className="col-md-11 events-block">
                {hourEvent}
            </div>
        </div>
    }
   
}

export default HourComponent;