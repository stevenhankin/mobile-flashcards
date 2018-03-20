import React from 'react';
import {View} from 'react-native';
import {Provider} from 'react-redux'
import * as fromActions from "./actions";
import {combineReducers, createStore} from "redux";
import deckReducer from "./reducers";
import {loadState, saveState} from "./storage";
import {setLocalNotification} from "./utils/notifier"
import {TabNav} from './utils/navigation'


const rootReducer = combineReducers({decks: deckReducer});

const store = createStore(
    rootReducer,
);


loadState()
    .then((persistedState) => {
            /*
            Once state is loaded, dispatch a request
            to hydrate the application state
             */
            store.dispatch(fromActions.loadPersistedState(persistedState));
        }
    )
    .finally(
        () => {
            /*
            After the state has been hydrated, subscribe to state changes
            so that they can be stored into local device storage
             */
            store.subscribe(() => {
                saveState(store.getState());
            });
        }
    );


class App extends React.Component {

    /**
     * When app first loads,
     * user will be prompted for permission
     * to ping user with a notification
     */
    componentDidMount() {
        setLocalNotification();
    }

    render() {
        return (
            <Provider store={store}>
                <View style={{flex: 1}}>
                    <TabNav/>
                </View>
            </Provider>
        )
    }
}

export default App;
