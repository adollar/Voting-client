import React from 'react';
import ReactDOM from 'react-dom';
import {renderIntoDocument, scryRenderedDOMComponentsWithTag, Simulate} from 'react-dom/test-utils';
import {expect} from 'chai';
import {List} from 'immutable';

import {Voting} from '../../src/components/voting';

describe('Voting', () => {

    it('renders a pair of buttons', () => {

        const component = renderIntoDocument(
            <Voting pair={["Trainspotting", "28 Days Later"]}/>
        );
        const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

        expect(buttons.length).to.equal(2);
        expect(buttons[0].textContent).to.equal('Trainspotting');
        expect(buttons[1].textContent).to.equal('28 Days Later');
    });

    it('invokes callback when a button is clicked', () => {
        let votedWith;
        const vote = (entry) => votedWith = entry;

        const component = renderIntoDocument(
            <Voting pair={["Trainspotting", "28 Days Later"]}
                    vote={vote}/>
        );
        const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

        Simulate.click(buttons[0]);

        expect(votedWith).to.equal('Trainspotting');
    });

    it('выкл кнопку когда юзер проголосовал', () => {
        const component = renderIntoDocument(
            <Voting
                pair={["Trainspotting", "28 Days Later"]}
                hasVoted="28 Days Later"
            />
        );

        const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

        expect(buttons.length).to.equal(2);
        expect(buttons[0].hasAttribute('disabled')).to.equal(true);
        expect(buttons[1].hasAttribute('disabled')).to.equal(true);
    });

    it('добавляет лейбу на кнопку которой юзер голосовал', () => {
        const component = renderIntoDocument(
            <Voting
                pair={["Trainspotting", "28 Days Later"]}
                hasVoted="28 Days Later"
            />
        );

        const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

        expect(buttons[1].textContent).to.contains('Voted');
    });

    it('рисует только победителя', () => {
        const component = renderIntoDocument(
            <Voting winner="28 Days Later"/>
        );

        const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
        expect(buttons.length).to.equal(0);

        const winner = ReactDOM.findDOMNode(component.refs.winner);
        expect(winner.textContent).to.contains('28 Days Later');

    });

    it('отрисовывается как чистый компонент', () => {
        const pair = List.of("Trainspotting", "28 Days Later");
        const container = document.createElement('div');
        let component = ReactDOM.render(
            <Voting pair={pair}/>,
            container
        );

        let firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
        expect(firstButton.textContent).to.equal('Trainspotting')

        const newPair = pair.set(0, 'Blabla');

        component = ReactDOM.render(
            <Voting pair={newPair}/>,
            container
        );

        firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
        expect(firstButton.textContent).to.equal('Blabla')
    })

});