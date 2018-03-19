export const ADD_DECK = 'ADD_DECK';
export const RECEIVE_DECKS = 'RECEIVE_DECKS';
export const ADD_CARD = 'ADD_CARD';
export const LOAD_PERSISTED_STATE = 'LOAD_PERSISTED_STATE';


export const loadPersistedState = (state) => ({
    type: LOAD_PERSISTED_STATE,
    state,
});

export const addCard = (deckTitle, question, answer) => ({
    type: ADD_CARD,
    deckTitle,
    question,
    answer,
});


export const addDeck = (deckTitle) => ({
    type: ADD_DECK,
    deckTitle,
});


export const receiveDecks = (decks) => ({
    type: RECEIVE_DECKS,
    decks,
});