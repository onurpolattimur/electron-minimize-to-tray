import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import WindowOperation from "./components/WindowOperation";

ReactDOM.render(
    <React.StrictMode>
        <WindowOperation/>
        <App/>
    </React.StrictMode>,
    document.getElementById('root')
);

