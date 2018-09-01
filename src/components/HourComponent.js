import React, { Component } from 'react';
import {observer, inject} from 'mobx-react';

@inject('store')
@observer
class HourComponent extends Component {
    // onClick={(e)=> this.props.store.addEvent(e, new Date(currentYear, currentMonth, currentDate), 'edit', index)}
    calCulateHeight(obj) {
        var hourDifference = (parseInt(obj.endTime.split(":")[0])-parseInt(obj.eventStartTime.split(":")[0]));
        if(hourDifference>0){
            var height = (((60 - parseInt(obj.eventStartTime.split(":")[1])) + ((hourDifference -1) * 60) + parseInt(obj.endTime.split(":")[1]))/60)*100;
        }else{
            var height = ((parseInt(obj.endTime.split(":")[1]) - parseInt(obj.eventStartTime.split(":")[1]))/60)*100;
        }
        return height;
    }

    render(){
        var currentYear = this.props.store.currentDate.getFullYear();
        var currentMonth = this.props.store.currentDate.getMonth();
        var currentDate = this.props.store.currentDate.getDate();
        if(this.props.store.events && this.props.store.events[currentYear] && this.props.store.events[currentYear][currentMonth] && this.props.store.events[currentYear][currentMonth][currentDate]){
            var hourEvent = this.props.store.events[currentYear][currentMonth][currentDate].map((obj, index)=> {
                var height = this.calCulateHeight(obj);
                var top = 100 - (((60 - parseInt(obj.eventStartTime.split(":")[1]))/60)*100);
                var buttonStyle = {
                    position: "relative",
                    height: height+"%",
                    top: top+"%"

                }
                if(obj.eventStartTime.split(":")[0] === this.props.store.hours[this.props.index].split(":")[0]){
                    return <button className="event-button" style={buttonStyle} onClick={(e) => this.props.store.addHourEvent(e, new Date(currentYear, currentMonth, currentDate), 'edit', obj)}>{obj.eventName}</button>;
                }
        });
        }
        return  <div className="row hours-block-container">
            <div className="col-md-1 hours-block">
                {this.props.store.hours[this.props.index]}
            </div>
            <div className="col-md-11 events-block" onClick={(e) => this.props.store.addHourEvent(e, new Date(currentYear, currentMonth, currentDate), 'add', {eventStartTime: this.props.store.hours[this.props.index]})}>
                {hourEvent}
            </div>
        </div>
    }
   
}

export default HourComponent;