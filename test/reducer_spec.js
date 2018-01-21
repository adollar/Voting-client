import {
    Map,
    List,
    fromJS
} from 'immutable';
import reducer from '../src/reducer'
import {expect} from 'chai';

describe('Reducer', () => {

    it('handles SET_STATE', () => {
        const initialState = Map();
        const action = {
            type: 'SET_STATE',
            state: Map({
                vote: Map({
                    pair: List.of('Tran', 'Days'),
                    tally: Map({'Train': 1})
                }),
            })
        };

        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(fromJS({
            vote: {
                pair: ['Tran', 'Days'],
                tally: {'Train': 1}
            },
        }))
    });

    it('обрабатывает SET_STATE с простой js-нагрузкой', () => {
        const initialState = Map();
        const action = {
            type: 'SET_STATE',
            state: {
                vote: {
                    pair: List.of('Tran', 'Days'),
                    tally: {'Train': 1}
                },
            }
        };

        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(fromJS({
            vote: {
                pair: ['Tran', 'Days'],
                tally: {'Train': 1}
            }
        }))
    });

    it('handles SET_STATE с начальным состоянием undefined', () => {
        const action = {
            type: 'SET_STATE',
            state: {
                vote: {
                    pair: List.of('Tran', 'Days'),
                    tally: {'Train': 1}
                },
            }
        };

        const nextState = reducer(undefined, action);

        expect(nextState).to.equal(fromJS({
            vote: {
                pair: ['Tran', 'Days'],
                tally: {'Train': 1}
            }
        }))
    });
});