import React, { Component } from 'react';
import {observer, inject} from 'mobx-react';
const hours = ['01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '24:00'];

@inject('store')
@observer
class HourComponent extends Component {
    // onClick={(e)=> this.props.store.addEvent(e, new Date(currentYear, currentMonth, currentDate), 'edit', index)}
    calCulateHeight(obj) {
        var height
        var hourDifference = (parseInt(obj.endTime.split(":")[0], 10)-parseInt(obj.eventStartTime.split(":")[0], 10));
        if(hourDifference>0){
            height = (((60 - parseInt(obj.eventStartTime.split(":")[1], 10)) + ((hourDifference -1) * 60) + parseInt(obj.endTime.split(":")[1], 10))/60)*100;
        }else{
            height = ((parseInt(obj.endTime.split(":")[1], 10) - parseInt(obj.eventStartTime.split(":")[1], 10))/60)*100;
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
                var top = 100 - (((60 - parseInt(obj.eventStartTime.split(":")[1], 10))/60)*100);
                var buttonStyle = {
                    position: "relative",
                    height: height+"%",
                    top: top+"%"
                }
                if(obj.eventStartTime.split(":")[0] === hours[this.props.index].split(":")[0]){
                    return <button  key={index} className="event-button" style={buttonStyle} onClick={(e) => this.props.store.addHourEvent(e, new Date(currentYear, currentMonth, currentDate), 'edit', obj)}>{obj.eventName}</button>;
                }
            });
        }
        return  <div className="row hours-block-container">
            <div className="col-md-1 hours-block">
                {hours[this.props.index]}
            </div>
            <div className="col-md-11 events-block" onClick={(e) => this.props.store.addHourEvent(e, new Date(currentYear, currentMonth, currentDate), 'add', {eventStartTime: hours[this.props.index]})}>
                {hourEvent}
            </div>
        </div>
    }
   
}

export default HourComponent;