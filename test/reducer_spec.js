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

    it('обрабатывает событие VOTE с помощью havVoted аттрибута', () => {
        const state = fromJS({
            vote: {
                pair: ['Tran', 'Days'],
                tally: {Tran: 1}
            }
        });

        const action = {type: 'VOTE', 'entry': 'Tran'};
        const nextState = reducer(state, action);

        expect(nextState).to.equal(fromJS({
            vote: {
                pair: ['Tran', 'Days'],
                tally: {Tran: 1}
            },
            hasVoted: 'Tran'
        }))
    });

    it('если запись не правильна - не назначает hasVoted для VOTE action', () => {
        const state = fromJS({
            vote: {
                pair: ['Tran', 'Days'],
                tally: {Tran: 1}
            }
        });

        const action = {type: 'VOTE', 'entry': 'Blabla'};
        const nextState = reducer(state, action);

        expect(nextState).to.equal(fromJS({
            vote: {
                pair: ['Tran', 'Days'],
                tally: {Tran: 1}
            },
        }))
    });

    it('если пара изменилась то убираем hasVoted', () => {
        const state = fromJS({
            vote: {
                pair: ['Tran', 'Days'],
                tally: {Tran: 1}
            },
            hasVoted: 'Tran'

        });

        const action = {
            type: 'SET_STATE',
            state: {
                vote: {
                    pair: ['Blabla', 'Yoyo']
                }
            }
        };
        const nextState = reducer(state, action);

        expect(nextState).to.equal(fromJS({
            vote: {
                pair: ['Blabla', 'Yoyo'],
            },
        }))
    });
});