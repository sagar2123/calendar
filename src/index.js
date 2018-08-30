import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Provider } from 'mobx-react';
import CalendarStore from './calendarStore';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
const store = new CalendarStore();

ReactDOM.render((<Provider store= {store}>  
    <App/>
</Provider>), document.getElementById('root'));
registerServiceWorker();
