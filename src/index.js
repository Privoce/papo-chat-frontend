/* eslint-disable react/jsx-filename-extension */
import React from 'react';

import { render } from 'react-dom';

import 'styles/index.scss';
import 'emoji-mart/css/emoji-mart.css';

import * as serviceWorker from 'serviceWorker';

import App from './App';

render(<App />, document.getElementById('app'));

serviceWorker.unregister();
