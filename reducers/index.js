import {RECEIVE_DECKS, RECEIVE_DECK} from '../actions'

function decks(state = {}, action) {
    let decks = {}
    switch (action.type) {
        // case ADD_DECK:
        //     if (state.decks.hasOwnProperty(action.deckName)) {
        //         console.log('Deck already exists! will not add..')
        //         return state;
        //     }
        //     const x = {
        //         ...state,
        //         decks: {...state.decks},
        //     };
        //     x.decks[action.deckName] = {title: action.deckName, questions: []};
        //     console.log('ADD_DECK', JSON.stringify(x))
        //     return x;
        // case ADD_CARD:
        //     console.log('ADD CARD!!', action);
        //     console.log(state);
        //     const newQ = [...state.decks[action.deckName].questions, {
        //         question: action.question,
        //         answer: action.answer
        //     }];
        //     const newDeck = {...state.decks[action.deckName], questions: newQ};
        //      decks = {...state.decks};
        //     decks[action.deckName] = newDeck;
        //     console.log('newDeck',JSON.stringify(newDeck));
        //     return {
        //         ...state,
        //         decks
        //     };

        case RECEIVE_DECK :
            console.log('RECEIVE_DECK');
             decks = {...state.decks};
            decks[action.deck.title] = action.deck;
            console.log('decks will be', JSON.stringify(decks))
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