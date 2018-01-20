import React from 'react';
import ReactDOM from 'react-dom';
import {expect} from 'chai';
import {
    List,
    Map
} from 'immutable';
import {Results} from "../../src/components/results";
import {
    renderIntoDocument,
    scryRenderedDOMComponentsWithClass,
    Simulate
} from 'react-dom/test-utils';


describe('Results component', () => {
    it('Выводит записи и количеством голосов либо 0', () => {
        const pair = List.of('Train', 'Days');
        const tally = Map({'Train': 5});
        const component = renderIntoDocument(
            <Results pair={pair} tally={tally}/>
        );

        const entries = scryRenderedDOMComponentsWithClass(component, 'entry');
        const [train, days] = entries.map(e => e.textContent);

        expect(entries.length).to.equal(2);
        expect(train).to.contains('Train');
        expect(train).to.contains('5');
        expect(days).to.contains('Days');
        expect(days).to.contains('0');
    });

    it('вызывает колбек при нажатии Next', () => {
        let clicked = false;
        const next = () => clicked = true;

        const pair = List.of('Train', 'Days');
        const component = renderIntoDocument(
            <Results
                pair={pair}
                tally={Map()}
                next={next}
            />
        );

        Simulate.click(ReactDOM.findDOMNode(component.refs.next));

        expect(clicked).to.equal(true);
    })
});