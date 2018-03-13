import { createStore, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';
import rootReducer from '../reducers';
export default function configureStore(initialState) {
    const store = createStore(
        rootReducer,
        initialState,
         // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
        // applyMiddleware(thunk)
    );

    // /**
    //  * On change of Redux Store, update the local storage too
    //  */
    // store.subscribe(() => {
    //     localStorage.state = JSON.stringify(store.getState());
    // });

    return store;
}