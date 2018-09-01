import React, { Component } from 'react';
import {observer, inject} from 'mobx-react';
import '../App.css';
import  DayComponent from './DayComponent';
import  EventPopup from './EventPopup';
import  PopupOverlay from './PopupOverlay';
const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const monthDays = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

@inject('store')
@observer
class MonthView extends Component {

  render() {
    var emptyDates = [];
    for (var i = 0; i < this.props.store.emptyDatesCount; i++) {
        emptyDates.push(<div key={i} className="container-width"></div>);
    }
    var allDays = weekDays.map((day, index)=>{
      return <div  key={index} className="container-width month-view-header">
              {day}
           </div>
    });
    var allDates=[];
    Object.keys(this.props.store.days).forEach((key) => {
      allDates.push(
        <DayComponent day={this.props.store.days[key]} />
      ) 
    });
    return (
      <div className="App">
        <div className="container">
          <div className="row current-month-year-container">
            <div className="col-md-6">
              Current Month: {monthDays[this.props.store.currentDate.getMonth()]}
            </div>
            <div className="col-md-6">
              Current Year: {this.props.store.currentDate.getFullYear()}
            </div>
          </div>
          <div className="row current-month-year-container">
            <div className="col-md-4">
              <button className="btn btn-secondary buttons" onClick={()=>this.props.store.getPreviousMonth()}>Previous month</button>
            </div>
            <div className="col-md-4">
                <button className="btn btn-primary buttons" onClick={()=>this.props.store.openDayView()}>Day View</button>
            </div>
            <div className="col-md-4">
                <button className="btn btn-secondary buttons" onClick={()=>this.props.store.getNextMonth()}>Next month</button>
            </div>
          </div>
          <div className="row calendar-container">
            {allDays}
            {emptyDates}
           {allDates}
         </div>
        </div>
        <EventPopup />
        <PopupOverlay show={this.props.store.addEventPopup}/>
      </div>
    );
  }
}

export default MonthView;
