import {RECEIVE_DECKS, ADD_DECK} from '../actions'

function decks(state = {}, action) {
    switch (action.type) {
        case ADD_DECK:
            const x = {
                ...state,
                decks: {...state.decks},
            };
            x.decks[action.deckName]={title: action.deckName, questions: []};
            console.log('ADD_DECK',JSON.stringify(x))
            return x;
        case RECEIVE_DECKS :
            return {
                ...state,
                decks: {...action.decks},
            };

        default :
            return state
    }
}

export default decks