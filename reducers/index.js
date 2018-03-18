import {RECEIVE_DECKS, ADD_DECK, ADD_CARD, LOAD_PERSISTED_STATE} from '../actions'
import {combineReducers} from 'redux'


const card = (state, action) => {
    switch (action.type) {
        case ADD_CARD:
            return {
                question: action.question,
                answer: action.answer
            };
        default:
            return state
    }
};


const cards = (state, action) => {
    switch (action.type) {
        case ADD_CARD:
            return [
                ...state,
                card(state, action),
            ];
        default:
            return state
    }
};

/**
 * A single deck. Cards are stored in an object
 *
 * @param state
 * @param action
 * @returns {*}
 */
const deck = (state, action) => {
    switch (action.type) {
        case ADD_CARD:
            return {
                ...state,
                cards: cards(state.cards, action),
                numCards: state.numCards + 1,
            };
        case ADD_DECK :
            return {
                ...state,
                deckTitle: action.deckTitle,
                cards: [],
                numCards: 0,
            };
        default:
            return state
    }
};


/**
 * All decks by ID
 *
 * @param state
 * @param action
 * @returns {*}
 */
const byId = (state = {}, action) => {
    let decks = {};

    switch (action.type) {
        case LOAD_PERSISTED_STATE:
            return action.state.decks.byId;

        case ADD_CARD:
        case ADD_DECK :
            return {
                ...state,
                [action.deckTitle]: deck(state[action.deckTitle], action)
            };

        case RECEIVE_DECKS :
            const newState2 = action.decks;
            return newState2;

        default :
            return state
    }
};

/**
 * Keep an array of all deck ids
 *
 * @param state
 * @param action
 * @returns {*}
 */
const allIds = (state = [], action) => {
    switch (action.type) {
        case LOAD_PERSISTED_STATE:
            return action.state.decks.allIds;
        case ADD_DECK:
            return [...state, action.deckTitle];
        default:
            return state;
    }
};

const decks = combineReducers({byId, allIds});

export default decks

/**
 * Return an array of all decks
 *
 * @param state
 * @returns {Object|*|{}|Uint8Array|any[]|Int32Array}
 */
export const getAllDecks = (state) => state.allIds.map(id => state.byId[id]);
