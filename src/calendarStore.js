import { observable } from "mobx";
import { action } from 'mobx';
const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

class calendarStore {
    @observable emptyDatesCount = 0;
    @observable currentDate = new Date();
    @observable days = this.getDaysInMonth(this.currentDate.getMonth(), this.currentDate.getFullYear());
    @observable showEventBox = false;
    @observable addEventPopup = false;
    @observable weekView = true;
    @observable events = {
        "2018": {
            "7": {
                "30": [{
                    eventName: "Meeting",
                    eventStartTime: "03:00",
                    endTime: "04:00"
                }, {
                    eventName: "Training",
                    eventStartTime: "04:00",
                    endTime: "05:00"
                }, {
                    eventName: "Workshop",
                    eventStartTime: "05:00",
                    endTime: "06:00"
                }, {
                    eventName: "Presentation",
                    eventStartTime: "06:00",
                    endTime: "07:00"
                }]
            },
            "8": {
                "1": [{
                    eventName: "Meeting",
                    eventStartTime: "04:00",
                    endTime: "05:00"
                }],
                "2": [{
                    eventName: "Training",
                    eventStartTime: "04:30",
                    endTime: "05:00"
                }],
                "3": [{
                    eventName: "Workshop",
                    eventStartTime: "04:00",
                    endTime: "05:00"
                },{
                    eventName: "scrum",
                    eventStartTime: "05:00",
                    endTime: "06:00"
                }],
                "4": [{
                    eventName: "Interview Process",
                    eventStartTime: "04:00",
                    endTime: "05:00"
                }],
                "5": [{
                    eventName: "Technical Demo",
                    eventStartTime: "04:00",
                    endTime: "05:00"
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
    @observable invalidTime = false;
    @observable editFlow = false;
    @observable inValidStartTime = false;
    @observable inValidEndTime = false;
    @observable inValidName = false;


    @action getDaysInMonth(month, year) {
        console.log(month)
        console.log(year)
        var date = new Date(year, month, 1);
        this.emptyDatesCount = date.getDay();
        var days = {};
        while (date.getMonth() === month) {
            days[date.getDate()] = {
                day: weekDays[date.getDay()],
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
        if (this.currentDate.getMonth() <= 11) {
            this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 1);
            this.days = this.getDaysInMonth(this.currentDate.getMonth(), this.currentDate.getFullYear());
        } else {
            this.currentDate = new Date(this.currentDate.getFullYear() + 1, 0, 1);
            this.days = this.getDaysInMonth(this.currentDate.getMonth(), this.currentDate.getFullYear());
        }
    }

    @action getPreviousMonth() {
        if (this.currentDate.getMonth() >= 0) {
            this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1, 1);
            this.days = this.getDaysInMonth(this.currentDate.getMonth(), this.currentDate.getFullYear());
        } else {
            this.currentDate = new Date(this.currentDate.getFullYear() - 1, 11, 1);
            this.days = this.getDaysInMonth(this.currentDate.getMonth(), this.currentDate.getFullYear());
        }
    }

    @action addEvent(event, date, flowType, index) {
        this.conflictError = false;
        this.invalidTime = false;
        this.inValidStartTime = false;
        this.inValidEndTime = false;
        this.inValidName = false;
        this.currentDate = date;
        this.eventIndex = index;
        this.addEventPopup = true;

        if (flowType === 'edit') {
            this.editFlow = true;
            event.stopPropagation();
            this.formModel.eventStartTime = this.events[this.currentDate.getFullYear()][this.currentDate.getMonth()][this.currentDate.getDate()][index].eventStartTime;
            this.formModel.endTime = this.events[this.currentDate.getFullYear()][this.currentDate.getMonth()][this.currentDate.getDate()][index].endTime;
            this.formModel.eventName = this.events[this.currentDate.getFullYear()][this.currentDate.getMonth()][this.currentDate.getDate()][index].eventName;
        }

        if (flowType === 'add') {
            this.editFlow = false;
            this.eventIndex = -1;
            this.formModel = {
                eventName: "",
                eventStartTime: "",
                endTime: ""
            }
        }
    }

    @action addHourEvent(event, date, flowType, obj) {
        this.conflictError = false;
        this.invalidTime = false;
        this.inValidStartTime = false;
        this.inValidEndTime = false;
        this.inValidName = false;
        this.addEventPopup = true;

        if (flowType === 'edit') {
            this.editFlow = true;
            if (obj) {
                var index = this.getIndexOfObj(obj);
            }
            this.eventIndex = index;
            event.stopPropagation();
            this.formModel.eventStartTime = this.events[this.currentDate.getFullYear()][this.currentDate.getMonth()][this.currentDate.getDate()][index].eventStartTime;
            this.formModel.endTime = this.events[this.currentDate.getFullYear()][this.currentDate.getMonth()][this.currentDate.getDate()][index].endTime;
            this.formModel.eventName = this.events[this.currentDate.getFullYear()][this.currentDate.getMonth()][this.currentDate.getDate()][index].eventName;
        }

        if (flowType === 'add') {
            this.editFlow = false;
            this.eventIndex = -1;
            this.formModel = {
                eventName: "",
                eventStartTime: "",
                endTime: ""
            }
            if (obj) {
                this.formModel.eventStartTime = obj.eventStartTime;
                var endTime = parseInt(obj.eventStartTime.split(":")[0], 10) + 1;
                this.formModel.endTime = (endTime.toString().length === 2 ? "" : "0") + endTime.toString() + ":00";
            }
        }
    };

    @action getIndexOfObj(obj) {
        for (var i = 0; i < this.events[this.currentDate.getFullYear()][this.currentDate.getMonth()][this.currentDate.getDate()].length; i++) {
            if (this.events[this.currentDate.getFullYear()][this.currentDate.getMonth()][this.currentDate.getDate()][i].eventName === obj.eventName && this.events[this.currentDate.getFullYear()][this.currentDate.getMonth()][this.currentDate.getDate()][i].eventStartTime === obj.eventStartTime && this.events[this.currentDate.getFullYear()][this.currentDate.getMonth()][this.currentDate.getDate()][i].endTime === obj.endTime) {
                return i;
            }
        }
    }

    @action closeEventPopup() {
        this.editFlow = false;
        this.addEventPopup = false;
    }

    @action addModel(value, name) {
        Object.assign(this.formModel, {
            [name]: value
        })
    }

    @action saveEvent(index) {
        if (index !== -1) {
            if (this.isValidForm(this.formModel, index)) {
                this.events[this.currentDate.getFullYear()][this.currentDate.getMonth()][this.currentDate.getDate()][index].eventName = this.formModel.eventName;
                this.events[this.currentDate.getFullYear()][this.currentDate.getMonth()][this.currentDate.getDate()][index].eventStartTime = this.formModel.eventStartTime;
                this.events[this.currentDate.getFullYear()][this.currentDate.getMonth()][this.currentDate.getDate()][index].endTime = this.formModel.endTime;
                this.closeEventPopup();
            }
        } else {
            if (!this.events.hasOwnProperty(this.currentDate.getFullYear())) {
                this.events[this.currentDate.getFullYear()] = {};
            } if (!this.events[this.currentDate.getFullYear()].hasOwnProperty(this.currentDate.getMonth())) {
                this.events[this.currentDate.getFullYear()][this.currentDate.getMonth()] = {};
            } if (!this.events[this.currentDate.getFullYear()][this.currentDate.getMonth()].hasOwnProperty(this.currentDate.getDate())) {
                this.events[this.currentDate.getFullYear()][this.currentDate.getMonth()][this.currentDate.getDate()] = [];
            }
            if (this.isValidForm(this.formModel, index)) {
                var arr = this.events[this.currentDate.getFullYear()][this.currentDate.getMonth()][this.currentDate.getDate()];
                arr.push(this.formModel);
                Object.assign(this.events[this.currentDate.getFullYear()][this.currentDate.getMonth()],
                    { [this.currentDate.getDate()]: arr }
                )
                // this.events[this.currentDate.getFullYear()][this.currentDate.getMonth()][this.currentDate.getDate()].push(this.formModel);
                this.formModel = {
                    eventName: "",
                    eventStartTime: "",
                    endTime: ""
                }
                this.closeEventPopup();
            }
        }
        // this.closeEventPopup();
    }

    @action isValidForm(obj, index) {
        var inValid = false;
        var objStartHr = parseInt(obj.eventStartTime.split(":")[0], 10);
        var objStartMin = parseInt(obj.eventStartTime.split(":")[1], 10);
        var objEndHr = parseInt(obj.endTime.split(":")[0], 10);
        var objEndMin = parseInt(obj.endTime.split(":")[1], 10);
        var objStartTime = objStartHr * 60 + objStartMin;
        var objEndTime = objEndHr * 60 + objEndMin;
        if(!obj.eventStartTime){
            this.inValidStartTime = true;
            inValid = true;
        }
        if(!obj.endTime){
            this.inValidEndTime = true;
            inValid = true;
        }
        if(!obj.eventName){
            this.inValidName = true;
            inValid = true;
        }
        if(inValid){
            return false;
        }else{
            this.inValidStartTime = false;
            this.inValidEndTime = false;
            this.inValidName = false;
        }
        if((objEndTime-objStartTime)<=0){
            this.invalidTime = true;
            return false;
        }
        var currentEvents = this.events[this.currentDate.getFullYear()][this.currentDate.getMonth()][this.currentDate.getDate()];
        for (var i = 0; i < currentEvents.length; i++) {
            if (i !== index) {
                var startHr = parseInt(currentEvents[i].eventStartTime.split(":")[0], 10);
                var startMin = parseInt(currentEvents[i].eventStartTime.split(":")[1], 10);
                var endHr = parseInt(currentEvents[i].endTime.split(":")[0], 10);
                var endMin = parseInt(currentEvents[i].endTime.split(":")[1], 10);
                var startTime = startHr * 60 + startMin;
                var endTime = endHr * 60 + endMin;
                // if(!(endHr <= objStartHr && endMin <= objStartMin) && !(startHr >= objEndHr && startMin > objEndMin)){
                //     return false
                // }
                if (!(objStartTime <= startTime && objEndTime <= startTime) && !(objStartTime >= endTime && objEndTime >= endTime)) {
                    this.conflictError = true;
                    return false;
                }
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

    @action selectNextDate() {
        var date = this.currentDate;
        date.setDate(this.currentDate.getDate() + 1);
        this.currentDate = new Date(date);
    }

    @action selectPrevDate() {
        var date = this.currentDate;
        date.setDate(this.currentDate.getDate() - 1);
        this.currentDate = new Date(date);
    }

    @action deleteEvent(index) {
        this.events[this.currentDate.getFullYear()][this.currentDate.getMonth()][this.currentDate.getDate()].splice(index, 1);
        this.closeEventPopup();
    }


}

export default calendarStore;