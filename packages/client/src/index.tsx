import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './App';

import './index.less';
import { store } from './redux';


const mountNode = document.getElementById('app');
const app = React.createElement(App);
ReactDOM.render(<Provider store={store}><App /></Provider>, mountNode);
