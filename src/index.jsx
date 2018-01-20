import React from 'react';
import ReactDOM from 'react-dom';
import {
    HashRouter,
    Route,
    Switch
} from 'react-router-dom'
import {Voting} from "./components/voting";
import {Results} from "./components/results";
import {
    List,
    Map
} from 'immutable';
import {Navigator} from "./components/navigator";

const pair = List.of('Trainspotting', '28 Days Later');
const tally = Map({'Trainspotting': 5, '28 Days Later': 4});

const
    routes =
        <Switch>
            <Route path="/voting" render={(props) => (
                <Voting {...props} pair={pair} tally={tally}/>
            )}/>
            <Route path="/results" render={(props) => (
                <Results {...props} pair={pair} tally={tally}/>
            )}/>
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