import * as fromServices from '../services'

// export const ADD_DECK = 'ADD_DECK';
// export const ADD_CARD = 'ADD_CARD';
export const RECEIVE_DECK = 'RECEIVE_DECK';
export const RECEIVE_DECKS = 'RECEIVE_DECKS';


// export function addDeck(deckName) {
//     return {
//         type: ADD_DECK,
//         deckName,
//     }
// }
//
// export function addCard(deckName, question, answer) {
//     return {
//         type: ADD_CARD,
//         deckName,
//         question,
//         answer
//     }
// }

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


/**
 * Thunk : Create a deck with the supplied name and store in AsyncStorage
 *
 * @param deckName
 * @returns {function(*): (*|Promise<*>|PromiseLike<T>|Promise<T>)}
 */
export const addDeck = (deckName) => dispatch => (
    fromServices.addDeck(deckName)
        .then(deck => dispatch(receiveDeck(deck))));


/**
 * Thunk : Add a card to a deck and store the new deck using AsyncStorage
 *
 * @returns {function(*): (JQueryPromise<any> | JQueryPromise<void> | PromiseLike<T> | Promise<T>)}
 */
export const addCardToDeck = (deckName, card) => dispatch => (
    fromServices.addCardToDeck(deckName, card)
        .then(deck => dispatch(receiveDeck(deck))));

