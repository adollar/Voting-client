import React from 'react';
import ReactDOM from 'react-dom';
import {
    HashRouter,
    Route,
    Switch
} from 'react-router-dom'
import {VotingContainer} from "./components/voting";
import {Navigator} from "./components/navigator";
import {createStore} from 'redux';
import reducer from './reducer';
import {Provider} from "react-redux";
import {ResultsContainer} from "./components/results";

const store = createStore(reducer);

store.dispatch({
    type: 'SET_STATE',
    state: {
        vote: {
            pair: ['Train', 'Days'],
            tally: {'Train': 2}
        }
    }
});

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