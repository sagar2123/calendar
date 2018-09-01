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
                },
        "8": {
            "1":  [{
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
    @observable conflictError = false;


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

    // @action getCurrentEventData(date) {
    //     if(this.events.hasOwnProperty(date.getDate().toString()+date.getMonth().toString()+date.getFullYear().toString())){
    //         this.currentEvents = this.events[date.getDate().toString()+date.getMonth().toString()+date.getFullYear().toString()];
    //     }
    // }

    @action addEvent(event, date, flowType, index) {
        this.currentDate = date;
        // this.getCurrentEventData(date);
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

    @action addHourEvent(event, date, flowType, obj) {
        // this.getCurrentEventData(date);
        // console.log(this.currentEvents.indexOf(obj));
        this.addEventPopup = true;
        
        if(flowType === 'edit'){
            if(obj){
                var index = this.getIndexOfObj(obj);
            }
            this.eventIndex = index;
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
            if(obj){
                this.formModel.eventStartTime = obj.eventStartTime;
                var endTime = parseInt(obj.eventStartTime.split(":")[0])+1;
                this.formModel.endTime = (endTime.toString().length==2?"":"0")+endTime.toString() + ":00";
            }
        }
    }

    @action getIndexOfObj(obj) {
        for(var i = 0; i<this.events[this.currentDate.getFullYear()][this.currentDate.getMonth()][this.currentDate.getDate()].length; i++){
            if(this.events[this.currentDate.getFullYear()][this.currentDate.getMonth()][this.currentDate.getDate()][i].eventName === obj.eventName && this.events[this.currentDate.getFullYear()][this.currentDate.getMonth()][this.currentDate.getDate()][i].eventStartTime === obj.eventStartTime && this.events[this.currentDate.getFullYear()][this.currentDate.getMonth()][this.currentDate.getDate()][i].endTime === obj.endTime){
                return i;
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
            if(this.isValidForm(this.formModel)){
                this.events[this.currentDate.getFullYear()][this.currentDate.getMonth()][this.currentDate.getDate()][index].eventName = this.formModel.eventName;
                this.events[this.currentDate.getFullYear()][this.currentDate.getMonth()][this.currentDate.getDate()][index].eventStartTime = this.formModel.eventStartTime;
                this.events[this.currentDate.getFullYear()][this.currentDate.getMonth()][this.currentDate.getDate()][index].endTime = this.formModel.endTime;
                this.closeEventPopup();
                this.conflictError = false;
            }else {
                this.conflictError = true;
            }
        }else{
            if(!this.events.hasOwnProperty(this.currentDate.getFullYear())){
                this.events[this.currentDate.getFullYear()] = {};
            }if(!this.events[this.currentDate.getFullYear()].hasOwnProperty(this.currentDate.getMonth())){
                this.events[this.currentDate.getFullYear()][this.currentDate.getMonth()] = {};
            }if(!this.events[this.currentDate.getFullYear()][this.currentDate.getMonth()].hasOwnProperty(this.currentDate.getDate())){
                this.events[this.currentDate.getFullYear()][this.currentDate.getMonth()][this.currentDate.getDate()] = [];
            }
            if(this.isValidForm(this.formModel)){
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
            this.closeEventPopup();
            this.conflictError = false;
            }else {
                this.conflictError = true;
            }
        }
        // this.closeEventPopup();
    }

    @action isValidForm(obj){
        var objStartHr = parseInt(obj.eventStartTime.split(":")[0]);
        var objStartMin = parseInt(obj.eventStartTime.split(":")[1]);
        var objEndHr = parseInt(obj.endTime.split(":")[0]);
        var objEndMin = parseInt(obj.endTime.split(":")[1]);
        var objStartTime = objStartHr*60 + objStartMin;
        var objEndTime = objEndHr*60 + objEndMin;
        var currentEvents = this.events[this.currentDate.getFullYear()][this.currentDate.getMonth()][this.currentDate.getDate()];
        for(var i=0; i<currentEvents.length; i++){
            var startHr = parseInt(currentEvents[i].eventStartTime.split(":")[0]);
            var startMin = parseInt(currentEvents[i].eventStartTime.split(":")[1]); 
            var endHr = parseInt(currentEvents[i].endTime.split(":")[0]);
            var endMin = parseInt(currentEvents[i].endTime.split(":")[1]); 
            var startTime = startHr*60 + startMin;
            var endTime = endHr*60 + endMin;
            // if(!(endHr <= objStartHr && endMin <= objStartMin) && !(startHr >= objEndHr && startMin > objEndMin)){
            //     return false
            // }
            if(!(objStartTime <= startTime && objEndTime <= startTime) && !(objStartTime >= endTime && objEndTime >= endTime)){
                return false;
            }
        }
        return true;
    }

    @action openMonthView() {
        this.weekView = false;
    }

    @action openDayView() {
        this.weekView = true;
    }

}

export default calendarStore;