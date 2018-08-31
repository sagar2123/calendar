import { observable } from "mobx";
import {action} from 'mobx';

class calendarStore {
    @observable weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    @observable monthDays = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    @observable hours = ['01:00','02:00','03:00','04:00','05:00','06:00','07:00','08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00','24:00'];
    @observable emptyDatesCount = 0;
    @observable currentDate = new Date();
    @observable days = this.getDaysInMonth(this.currentDate.getMonth(),this.currentDate.getFullYear());
    @observable showEventBox = false;
    @observable addEventPopup = false;
    @observable weekView = true;
    @observable events = {
        "2018": {
            "7": {
                "30":  [{
                        eventName: "Random",
                        eventStartTime: "03:00",
                        endTime: "04:00"
                    },{
                        eventName: "Random2",
                        eventStartTime: "04:00",
                        endTime: "05:00"
                    },{
                        eventName: "Random3",
                        eventStartTime: "05:00",
                        endTime: "06:00"
                    },{
                        eventName: "Random4",
                        eventStartTime: "06:00",
                        endTime: "07:00"
                    },{
                        eventName: "Random5",
                        eventStartTime: "07:00",
                        endTime: "08:00"
                    }]
                }
        }
    };
    @observable formModel = {
        eventName: "",
        eventStartTime: "",
        endTime: ""
    };
    @observable eventIndex = -1;
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

    // @action getEventInfo(date) {
    //     this.currentDate = date;
    //     this.getCurrentEventData(date);
    //     this.showEventBox = true;
    // }

    @action getCurrentEventData(date) {
        if(this.events.hasOwnProperty(date.getDate().toString()+date.getMonth().toString()+date.getFullYear().toString())){
            this.currentEvents = this.events[date.getDate().toString()+date.getMonth().toString()+date.getFullYear().toString()];
        }
    }

    @action addEvent(event, date, flowType, index) {
        this.currentDate = date;
        this.getCurrentEventData(date);
        this.eventIndex = index;
        this.addEventPopup = true;

        if(flowType === 'edit'){
            event.stopPropagation();
            this.formModel.eventStartTime = this.events[this.currentDate.getFullYear()][this.currentDate.getMonth()][this.currentDate.getDate()][index].eventStartTime;
            this.formModel.endTime = this.events[this.currentDate.getFullYear()][this.currentDate.getMonth()][this.currentDate.getDate()][index].endTime;
            this.formModel.eventName = this.events[this.currentDate.getFullYear()][this.currentDate.getMonth()][this.currentDate.getDate()][index].eventName;
        }

        if(flowType === 'add'){
            this.eventIndex = -1;
            this.formModel = {
                eventName: "",
                eventStartTime: "",
                endTime: ""
            }
        }
    }

    @action closeEventPopup() {
        this.addEventPopup = false;
    }

    @action addModel(value, name) {
        Object.assign(this.formModel,{
            [name] : value
        })
    }
    
    @action saveEvent(index) {
        if(index!== -1){
            this.events[this.currentDate.getFullYear()][this.currentDate.getMonth()][this.currentDate.getDate()][index].eventName = this.formModel.eventName;
            this.events[this.currentDate.getFullYear()][this.currentDate.getMonth()][this.currentDate.getDate()][index].eventStartTime = this.formModel.eventStartTime;
            this.events[this.currentDate.getFullYear()][this.currentDate.getMonth()][this.currentDate.getDate()][index].endTime = this.formModel.endTime;
        }else{
            if(!this.events.hasOwnProperty(this.currentDate.getFullYear())){
                this.events[this.currentDate.getFullYear()] = {};
            }if(!this.events[this.currentDate.getFullYear()].hasOwnProperty(this.currentDate.getMonth())){
                this.events[this.currentDate.getFullYear()][this.currentDate.getMonth()] = {};
            }if(!this.events[this.currentDate.getFullYear()][this.currentDate.getMonth()].hasOwnProperty(this.currentDate.getDate())){
                this.events[this.currentDate.getFullYear()][this.currentDate.getMonth()][this.currentDate.getDate()] = [];
            }
            if(this.formModel){
                var arr = this.events[this.currentDate.getFullYear()][this.currentDate.getMonth()][this.currentDate.getDate()];
                arr.push(this.formModel);
                Object.assign(this.events[this.currentDate.getFullYear()][this.currentDate.getMonth()],
                 { [this.currentDate.getDate()] : arr }
                 )
                // this.events[this.currentDate.getFullYear()][this.currentDate.getMonth()][this.currentDate.getDate()].push(this.formModel);
                this.formModel = {
                eventName: "",
                eventStartTime: "",
                endTime: ""
            }
            }
        }
        this.closeEventPopup();
    }

    @action openMonthView() {
        this.weekView = false;
    }

    @action openWeekView() {
        this.weekView = true;
    }

}

export default calendarStore;