import React, { Component } from 'react';
import {observer, inject} from 'mobx-react';
import MonthView from './components/MonthView';
import DayView from './components/DayView';

@inject('store')
@observer
class Main extends Component {
    render(){
        if(this.props.store.weekView){
            return <DayView/>
        }else{
            return <MonthView/>
        }
}
}

export default Main;