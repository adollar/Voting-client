import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Route, Switch} from 'react-router-dom'
import {Voting} from "./components/voting";
import {Results} from "./components/results";
import {List} from 'immutable';
import {Navigator} from "./components/navigator";

const pair = List.of('Trainspotting', '28 Days Later');

const routes =
    <Switch>
        <Route path="/voting" render={(props) => (
            <Voting {...props} pair={pair}/>
        )}/>
        <Route path="/results" component={Results}/>
    </Switch>;

ReactDOM.render(
    <HashRouter>
        <div>
            <Navigator/>
            {routes}
        </div>
    </HashRouter>,
    document.getElementById('app')
);