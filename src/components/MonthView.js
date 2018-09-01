import React, { Component } from 'react';
import {observer, inject} from 'mobx-react';
import '../App.css';
import  DayComponent from './DayComponent';
import  EventPopup from './EventPopup';
import  PopupOverlay from './PopupOverlay';

@inject('store')
@observer
class MonthView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var emptyDates = [];
    for (var i = 0; i < this.props.store.emptyDatesCount; i++) {
        emptyDates.push(<div className="container-width"></div>);
    }
    var allDays = this.props.store.weekDays.map((day)=>{
      return <div className="container-width">
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
            <div className="col-md-4">
              Current Month: {this.props.store.monthDays[this.props.store.currentDate.getMonth()]}
          </div>
          <div className="col-md-4">
              <button onClick={()=>this.props.store.openDayView()}>Day View</button>
          </div>
          <div className="col-md-4">
              Current Year: {this.props.store.currentDate.getFullYear()}
          </div>
         </div>
          <div className="row calendar-container">
            {allDays}
            {emptyDates}
           {allDates}
         </div>
         <div className="row calendar-actions-container">
            <div className="col-md-6">
              <button onClick={()=>this.props.store.getNextMonth()}>Next month</button>
            </div>
            <div className="col-md-6">
              <button onClick={()=>this.props.store.getPreviousMonth()}>Previous month</button>
            </div>
         </div>
        </div>
        <EventPopup />
        <PopupOverlay show={this.props.store.addEventPopup}/>
      </div>
    );
  }
}

export default MonthView;
