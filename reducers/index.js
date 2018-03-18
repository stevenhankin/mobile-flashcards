import {RECEIVE_DECKS, RECEIVE_DECK, SERVICE_ERROR} from '../actions'

const byId = (state = {}, action) => {
    let decks = {};
    switch (action.type) {

        case ADD_CARD:
            return {
                ...state,
                [action.deck.title]: action.deck
            }

        case RECEIVE_DECK :
            console.log('RECEIVE_DECK');
            console.log('action.deck', JSON.stringify(action.deck))
            console.log('action.deck.title', action.deck.title);
            const newState =
                {
                    ...state,
                    [action.deck.title]: action.deck
                };
            return newState;

        case SERVICE_ERROR:
            console.log('SERVICE_ERROR', JSON.stringify(action));
            return state;

        case RECEIVE_DECKS :
            const newState2 = action.decks;
            return newState2;

        default :
            return state
    }
};

const allIds = (state = [], action) => {

    switch (action.type) {

    }
}

const decks = byId; // Could be extended using combineReducers

export default decks