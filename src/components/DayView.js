import React, { Component } from 'react';
import {observer, inject} from 'mobx-react';
import '../App.css';
import  EventPopup from './EventPopup';
import  PopupOverlay from './PopupOverlay';
import  HourComponent from './HourComponent';

@inject('store')
@observer
class DayView extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    var hours = this.props.store.hours.map((value, index) => {
      return <HourComponent index={index} />
    });
    return (
      <div className="App">
        <div className="container day-view-container">
          {hours}
          <button onClick={() => this.props.store.openMonthView()}>Month View</button>
        </div>
        <EventPopup />
        <PopupOverlay show={this.props.store.addEventPopup}/>
      </div>
    );
  }
}

export default DayView;
