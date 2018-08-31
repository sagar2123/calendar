import { observable } from "mobx";
import {action} from 'mobx';

class calendarStore {
    @observable weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    @observable monthDays = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    @observable day=20;
    @observable emptyDatesCount = 0;
    @observable currentDate = new Date();
    @observable days = this.getDaysInMonth(this.currentDate.getMonth(),this.currentDate.getFullYear());
    @observable showEventBox = false;
    @observable addEventPopup = false;
    @observable events = {
        "2018": {
            "7": {
                "30": {
                    "01": [{
                        eventName: "Random",
                        eventStartTime: "3:30",
                        endTime: "4:30"
                    },{
                        eventName: "Random2",
                        eventStartTime: "1:30",
                        endTime: "2:30"
                    },{
                        eventName: "Random3",
                        eventStartTime: "2:30",
                        endTime: "3:30"
                    }]
                }
            }

        }
    };
    @observable formModel = {
        eventName: "",
        eventStartTime: "",
        endTime: ""
    };
    @observable currentEvents = [];


    @action getDaysInMonth(month, year) {
        console.log(month)
        console.log(year)
        var date = new Date(year, month, 1);
        this.emptyDatesCount = date.getDay();
        var days = {};
        while (date.getMonth() === month) {
            days[date.getDate()] = {
                day: this.weekDays[date.getDay()],
                date: date.getDate(),
                month: date.getMonth(),
                year: date.getFullYear(),
                fullDate: date
            };
            date.setDate(date.getDate() + 1);
        }
        return days;
    }

    @action getNextMonth() {
        if(this.currentDate.getMonth()<=11){
            this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth()+1, 1);
            this.days = this.getDaysInMonth(this.currentDate.getMonth(),this.currentDate.getFullYear());
        }else{
            this.currentDate = new Date(this.currentDate.getFullYear()+1, 0, 1);
            this.days = this.getDaysInMonth(this.currentDate.getMonth(),this.currentDate.getFullYear());
        }
    }

    @action getPreviousMonth() {
        if(this.currentDate.getMonth()>=0){
            this.currentDate = new Date(this.currentDate.getFullYear(),this.currentDate.getMonth()-1, 1);
            this.days = this.getDaysInMonth(this.currentDate.getMonth(),this.currentDate.getFullYear());
        }else{
            this.currentDate = new Date(this.currentDate.getFullYear()-1, 11, 1);
            this.days = this.getDaysInMonth(this.currentDate.getMonth(),this.currentDate.getFullYear());
        }
    }

    @action getEventInfo(date) {
        this.currentDate = date;
        this.getCurrentEventData(date);
        this.showEventBox = true;
    }

    @action getCurrentEventData(date) {
        if(this.events.hasOwnProperty(date.getDate().toString()+date.getMonth().toString()+date.getFullYear().toString())){
            this.currentEvents = this.events[date.getDate().toString()+date.getMonth().toString()+date.getFullYear().toString()];
        }
    }

    @action addEvent() {
        this.addEventPopup = true;
    }

    @action closeEventPopup() {
        this.addEventPopup = false;
    }

    @action addModel(value, name) {
        Object.assign(this.formModel,{
            [name] : value
        })
    }
    
    @action saveEvent() {
        this.events[this.currentDate.getDate().toString()+this.currentDate.getMonth().toString()+this.currentDate.getFullYear().toString()].push(this.formModel);
        this.closeEventPopup();
        this.resetFormModel();
    }

    @action resetFormModel() {
        this.formModel = {
            eventName : "",
            eventStartTime: "",
            endTime: ""
        }
    }
}

export default calendarStore;