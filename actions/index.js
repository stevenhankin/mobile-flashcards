import * as fromServices from '../services'


export const RECEIVE_DECK = 'RECEIVE_DECK';
export const RECEIVE_DECKS = 'RECEIVE_DECKS';
export const SERVICE_ERROR = 'SERVICE_ERROR';

export function receiveDeck(deck) {
    return {
        type: RECEIVE_DECK,
        deck,
    }
}


export function receiveDecks(decks) {
    return {
        type: RECEIVE_DECKS,
        decks,
    }
}


export function serviceError(err) {
    return {
        type: SERVICE_ERROR,
        err,
    }
}

/**
 * Thunk : Create a deck with the supplied name and store in AsyncStorage
 *
 * @param deckName
 * @returns {function(*): (*|Promise<*>|PromiseLike<T>|Promise<T>)}
 */
export const getDecks = () => dispatch => (
    fromServices.getDecks()
        .then(decks => dispatch(receiveDecks(decks)))
        .catch(err => {
            dispatch(serviceError(err))
        }));


/**
 * Thunk : Create a deck with the supplied name and store in AsyncStorage
 *
 * @param deckName
 * @returns {function(*): (*|Promise<*>|PromiseLike<T>|Promise<T>)}
 */
export const addDeck = (deckName) => dispatch => (
    fromServices.addDeck(deckName)
        .then(deck => dispatch(receiveDeck(deck)))
);


/**
 *  Thunk : Add a card to a deck and store the new deck using AsyncStorage
 *
 * @param deckName
 * @param card
 * @returns {function(*): (*|Promise<*>|PromiseLike<T>|Promise<T>)}
 */
export const addCardToDeck = (deckName, card) => dispatch => (
    fromServices.addCardToDeck(deckName, card)
        .then(deck => dispatch(receiveDeck(deck))));

