import React from 'react';
import {StackNavigator, TabNavigator} from 'react-navigation'
import {StyleSheet, Text, View} from 'react-native';
import DeckList from "./components/DeckList";
import Deck from './components/Deck'
import Quiz from './components/Quiz'
// import {createStore} from 'redux'
import {Provider} from 'react-redux'
// import reducer from './reducers'
import {receiveDecks} from './actions'
import configureStore from './store/configureStore'


const store = configureStore();


const DeckUseStack = StackNavigator(
    {
        DeckList: {screen: DeckList},
        Deck: {screen: Deck},
        Quiz: {screen: Quiz},
    },
    {
        initialRouteName: 'DeckList',
    });

const DeckAmendStack = StackNavigator(
    {
        NewDeck: {screen: DeckList},
        AddCard: {screen: Deck},

    },
    {
        initialRouteName: 'NewDeck',
    });

const TabNav = TabNavigator(
    {
        DeckUse: {
            screen: DeckUseStack,
            navigationOptions: {
                tabBarLabel: 'Decks'
            }
        },
        DeckAmend: {
            screen: DeckAmendStack,
            navigationOptions: {
                tabBarLabel: 'Edit'
            }
        },
    },
    {
        initialRouteName: 'DeckUse',
    }
)

class App extends React.Component {

    componentDidMount() {

        // TODO : Load from AsyncStorage
        const decks = {
            React: {
                title: 'React',
                questions: [
                    {
                        question: 'What is React?',
                        answer: 'A library for managing user interfaces'
                    },
                    {
                        question: 'Where do you make Ajax requests in React?',
                        answer: 'The componentDidMount lifecycle event'
                    }
                ]
            },
            JavaScript: {
                title: 'JavaScript',
                questions: [
                    {
                        question: 'What is a closure?',
                        answer: 'The combination of a function and the lexical environment within which that function was declared.'
                    }
                ]
            }
        }

        store.dispatch(receiveDecks(decks))
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
