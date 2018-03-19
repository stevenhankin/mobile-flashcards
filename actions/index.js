export const ADD_DECK = 'ADD_DECK';
export const RECEIVE_DECKS = 'RECEIVE_DECKS';
export const ADD_CARD = 'ADD_CARD';
export const LOAD_PERSISTED_STATE = 'LOAD_PERSISTED_STATE';


export const loadPersistedState = (state) => ({
    type: LOAD_PERSISTED_STATE,
    state,
});

export const addCard = (deckId,deckTitle, question, answer) => ({
    type: ADD_CARD,
    deckId,
    deckTitle,
    question,
    answer,
});


export const addDeck = (deckId,deckTitle) => ({
    type: ADD_DECK,
    deckId,
    deckTitle,
});


export const receiveDecks = (decks) => ({
    type: RECEIVE_DECKS,
    decks,
});