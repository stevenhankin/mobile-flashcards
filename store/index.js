import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import deckReducer from '../reducers';
export default function configureStore(initialState) {


    /**
     * Although there is currently only one reducer,
     * it is useful to get the namespace for the
     * decks by combining
     *
     * @type {Reducer<any>}
     */
    const rootReducer = combineReducers({decks:deckReducer});

    const store = createStore(
        rootReducer,
        initialState,
         // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
        applyMiddleware(thunk)
    );

    return store;
}


