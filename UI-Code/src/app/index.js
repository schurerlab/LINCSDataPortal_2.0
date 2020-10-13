import React from "react";
import { render } from "react-dom";
// import * as Sentry from '@sentry/react';
import { Provider } from "react-redux";

import Main from "./layouts/Main"

import reduxStore from "./store";

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// Sentry.init({dsn: "https://5d3a06587e2541f7aafbc862ddcc85e7@o433314.ingest.sentry.io/5391269"});

render(
    <Provider store={reduxStore}>
        <Main />
    </Provider>,
    window.document.getElementById("mainview")
);
