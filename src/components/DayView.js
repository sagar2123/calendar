import React, { Component } from 'react';
import {observer, inject} from 'mobx-react';
import '../App.css';
import  EventPopup from './EventPopup';
import  PopupOverlay from './PopupOverlay';
import  HourComponent from './HourComponent';
const monthDays = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const hours = ['01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '24:00'];

@inject('store')
@observer
class DayView extends Component {
  render() {
    var hoursData = hours.map((value, index) => {
      return <HourComponent  key={index} index={index} />
    });
    return (
      <div className="App">
        <div className="container day-view-container">
          <div className="row">
            <div className="col-md-12">
              <div>Current date: {this.props.store.currentDate.getDate()} {monthDays[this.props.store.currentDate.getMonth()]} {this.props.store.currentDate.getFullYear()}</div>
            </div>
          </div>
          <div className="row current-month-year-container">
          <div className="col-md-4">
              <button className="btn btn-secondary buttons" onClick={() => this.props.store.selectPrevDate()}>Previous Day</button>
            </div>
            <div className="col-md-4">
              <button className="btn btn-primary buttons" onClick={() => this.props.store.openMonthView()}>Month View</button>
            </div>
            <div className="col-md-4">
              <button className="btn btn-secondary buttons" onClick={() => this.props.store.selectNextDate()}>Next Day</button>
            </div>
          </div>
          {hoursData}
        </div>
        <EventPopup />
        <PopupOverlay show={this.props.store.addEventPopup}/>
      </div>
    );
  }
}

export default DayView;
