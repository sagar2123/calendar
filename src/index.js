import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Provider } from 'mobx-react';
import CalendarStore from './calendarStore';
import Main from './Main';
import registerServiceWorker from './registerServiceWorker';
const store = new CalendarStore();

ReactDOM.render((<Provider store= {store}>  
    <Main/>
</Provider>), document.getElementById('root'));
registerServiceWorker();
