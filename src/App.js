import React, { Component } from 'react';
import {observer, inject} from 'mobx-react';
import './App.css';
import  DayComponent from './components/DayComponent';
import  EventPopup from './components/EventPopup';
import  PopupOverlay from './components/PopupOverlay';

@inject('store')
@observer
class App extends Component {
  constructor(props) {
    super(props);
    // this.props.store.getDaysInMonth(1,2018);
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
        {/* <div className={"container event-block "+ ((this.props.store.showEventBox)? "show": "hide")}>
            {currentEvent}
            <div onClick={() => this.props.store.addEvent()}>Add Event</div>
        </div> */}
        <EventPopup />
        <PopupOverlay show={this.props.store.addEventPopup}/>
      </div>
    );
  }
}

export default App;
