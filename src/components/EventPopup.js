import React, { Component } from 'react';
import {observer, inject} from 'mobx-react';

@inject('store')
@observer
class EventPopup extends Component {
    render(){
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
        return  <div className={"add-event-popup "+ ((this.props.store.addEventPopup)? "show": "hide")}>
            <div className="container">
            <div className="row">
                <input value={this.props.store.formModel.eventName} onChange={(event) => this.props.store.addModel(event.target.value, 'eventName')}/>
            </div>
            <div className="row">
                <input type="time" name="eventStartTime" value={this.props.store.formModel.eventStartTime} onChange={(event) => this.props.store.addModel(event.target.value, 'eventStartTime')}/>
            </div>
            <div className="row">
            <input type="time" name="endTime" value={this.props.store.formModel.endTime} onChange={(event) => this.props.store.addModel(event.target.value, 'endTime')}/>
                </div>
            </div>
        <button onClick={()=>this.props.store.closeEventPopup()}>Close</button>
        <button onClick={()=>this.props.store.saveEvent(this.props.store.eventIndex)}>Save</button>
        <p className={(this.props.store.conflictError? "show": "hide")}>There is a conflict please try any other time to book this event.</p>
      </div>
    }
   
}

export default EventPopup;