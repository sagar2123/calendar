import React, { Component } from 'react';
import logo from './logo.svg';
import {observer, inject} from 'mobx-react';
import './App.css';

@inject('store')
@observer
class App extends Component {
  constructor(props) {
    super(props);
    // this.props.store.getDaysInMonth(1,2018);
  }
  render() {
    if( this.props.store.currentEvents && this.props.store.currentEvents.length> 0){
      var currentEvent = this.props.store.currentEvents.map((obj) => {
        return <div className="row event-block-container">
                <div className="col-md-3">
                  {obj.eventName}
                </div>
                <div className="col-md-3">
                  {obj.eventStartTime}
                </div>
                <div className="col-md-3">
                  {obj.endTime}
                </div>
                <div className="col-md-3">
                  Edit
                </div>
          </div>
      });
    } else{
      var currentEvent = [<div>No Data Found</div>]
    }
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
        <div className={"container-width " + ((this.props.store.currentDate.getDate() == this.props.store.days[key].date)? "highlight": "")} onClick = {()=> this.props.store.getEventInfo(new Date(this.props.store.days[key].year, this.props.store.days[key].month, this.props.store.days[key].date))}>
              {this.props.store.days[key].date}
           </div>
      ) 
    });
    return (
      <div className="App">
        <div className="container">
          <div className="row current-month-year-container">
            <div className="col-md-6">
              Current Month: {this.props.store.monthDays[this.props.store.currentDate.getMonth()]}
          </div>
          <div className="col-md-6">
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
        <div className={"container event-block "+ ((this.props.store.showEventBox)? "show": "hide")}>
            {currentEvent}
            <div onClick={() => this.props.store.addEvent()}>Add Event</div>
        </div>
        <div className={"add-event-popup "+ ((this.props.store.addEventPopup)? "show": "hide")}>
            <div className="container">
              <div className="row">
                <input value={this.props.store.formModel.eventName} onChange={() => this.props.store.addModel()}/>
              </div>
              <div className="row"></div>
              <div className="row"></div>
            </div>
          <button onClick={()=>this.props.store.closeEventPopup()}>Close</button>
          </div>
          <div className={"popup-overlay "+ ((this.props.store.addEventPopup)? "show": "hide")}></div>
      </div>
    );
  }
}

export default App;
