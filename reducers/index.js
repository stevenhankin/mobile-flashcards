import {RECEIVE_DECKS, ADD_DECK, ADD_CARD} from '../actions'

function decks(state = {}, action) {
    switch (action.type) {
        case ADD_DECK:
            const x = {
                ...state,
                decks: {...state.decks},
            };
            x.decks[action.deckName] = {title: action.deckName, questions: []};
            console.log('ADD_DECK', JSON.stringify(x))
            return x;
        case ADD_CARD:
            console.log('ADD CARD!!', action);
            console.log(state);
            const newQ = [...state.decks[action.deckName].questions, {
                question: action.question,
                answer: action.answer
            }];
            const newDeck = {...state.decks[action.deckName], questions: newQ};
            const decks = {...state.decks}
            decks[action.deckName] = newDeck;
            console.log('newDeck',JSON.stringify(newDeck))
            // const newDeck = {...state.decks[action.deckName],}
            // debugger
            // return state;
            return {
                ...state,
                decks
            };

        case RECEIVE_DECKS :
            console.log('RECEIVE_DECKS')
            return {
                ...state,
                decks: {...action.decks},
            };

        default :
            return state
    }
}

export default decks