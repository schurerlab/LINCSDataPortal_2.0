import React from "react";
import { render } from "react-dom";

import { Provider } from "react-redux";

import Main from "./layouts/Main"

import reduxStore from "./store";

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

render(
    <Provider store={reduxStore}>
        <Main />
    </Provider>,
    window.document.getElementById("mainview")
);
