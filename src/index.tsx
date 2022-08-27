import React from 'react';
import App from './App';
import {Provider} from "react-redux";
import {store} from "./components/store/store";
import ReactDOM from 'react-dom';

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);

