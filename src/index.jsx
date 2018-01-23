import React from 'react';
import ReactDOM from 'react-dom';
import {
    HashRouter,
    Route,
    Switch
} from 'react-router-dom'
import {VotingContainer} from "./components/voting";
import {Navigator} from "./components/navigator";
import {
    createStore,
    applyMiddleware
} from 'redux';
import remoteActionMiddleware from './remote_acton_middleware';
import reducer from './reducer';
import {Provider} from "react-redux";
import {ResultsContainer} from "./components/results";
import io from 'socket.io-client';
import {setState} from "./action_creators";


const socket = io(`${location.protocol}//${location.hostname}:8090`);

socket.on('state', state =>
    store.dispatch(setState(state))
);

const createStoreWithMiddleware = applyMiddleware(
    remoteActionMiddleware(socket)
)(createStore);

const store = createStoreWithMiddleware(reducer);

const
    routes =
        <Switch>
            <Route path="/voting" component={VotingContainer}/>
            <Route path="/results" component={ResultsContainer}/>
        </Switch>;

ReactDOM.render(
    <Provider store={store}>
        <HashRouter>
            <div>
                <Navigator/>
                {routes}
            </div>
        </HashRouter>
    </Provider>,
    document.getElementById('app')
);