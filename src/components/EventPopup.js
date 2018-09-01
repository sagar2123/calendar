import React, { Component } from 'react';
import {observer, inject} from 'mobx-react';

@inject('store')
@observer
class EventPopup extends Component {
    render(){
        return  (
          <div className={"add-event-popup "+ ((this.props.store.addEventPopup)? "show": "hide")}>
            <h1>Event</h1>
            <div className="container event-form-container">
              <div className="col-xs-12 form-group">
                  <label for="event-name">Email address</label>
                  <input id="event-name" placeholder="Name of the event" value={this.props.store.formModel.eventName} onChange={(event) => this.props.store.addModel(event.target.value, 'eventName')}/>
              </div>
              <div className={(this.props.store.inValidName? "alert alert-danger show": "hide")}>Select valid name.</div>
              <div className="col-xs-12 form-group">
                  <label for="event-st">Start time</label>
                  <input id="event-st" placeholder="Name of the event" type="time" name="eventStartTime" value={this.props.store.formModel.eventStartTime} onChange={(event) => this.props.store.addModel(event.target.value, 'eventStartTime')}/>
              </div>
              <div className={(this.props.store.inValidStartTime? "alert alert-danger show": "hide")}>Select valid time.</div>
              <div className="col-xs-12 form-group">
                <label for="event-et">End time</label>
                <input id="event-et" placeholder="Name of the event" type="time" min="09:00" name="endTime" value={this.props.store.formModel.endTime} onChange={(event) => this.props.store.addModel(event.target.value, 'endTime')}/>
              </div>
              <div className={(this.props.store.inValidEndTime? "alert alert-danger show": "hide")}>Select valid time.</div>
              <div className={(this.props.store.invalidTime? "alert alert-danger show": "hide")}>Select end time greater than start time.</div>
              <div className={(this.props.store.conflictError? "alert alert-danger show": "hide")}>There is a conflict please try any other time to book this event.</div>
              <div className="col-xs-12 text-right">
                <button className="btn btn-primary buttons text-right delete-button" disabled={this.editFlow} onClick={()=>this.props.store.deleteEvent(this.props.store.eventIndex)}>Delete</button>
                <button className="btn btn-primary buttons text-right" onClick={()=>this.props.store.saveEvent(this.props.store.eventIndex)}>Save</button>
              </div>
            </div>
            <button type="button" className="close btn-close" aria-label="Close" onClick={()=>this.props.store.closeEventPopup()}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        );
    }
   
}

export default EventPopup;
