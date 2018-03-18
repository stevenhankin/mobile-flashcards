export const ADD_DECK = 'ADD_DECK';
export const RECEIVE_DECKS = 'RECEIVE_DECKS';
export const ADD_CARD = 'ADD_CARD';
export const LOAD_PERSISTED_STATE = 'LOAD_PERSISTED_STATE';


export function loadPersistedState(state) {
    return {
        type: LOAD_PERSISTED_STATE,
        state,
    }
}

export function addCard(deckTitle, question, answer) {
    return {
        type: ADD_CARD,
        deckTitle,
        question,
        answer,
    }
}


export function addDeck(deckTitle) {
    return {
        type: ADD_DECK,
        deckTitle,
    }
}


export function receiveDecks(decks) {
    return {
        type: RECEIVE_DECKS,
        decks,
    }
}

