import React from 'react';
import {StackNavigator} from 'react-navigation'
import {StyleSheet, Text, View} from 'react-native';
import DeckList from "./components/DeckList";
import Deck from './components/Deck'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import reducer from './reducers'
import {receiveDecks} from './actions'
import configureStore from './store/configureStore'

const store = configureStore();

const MainNavigator = StackNavigator(
    {
        Home: {screen: DeckList},
        Deck: {screen: Deck}
    },
    {
        initialRouteName: 'Home',
    });

export default class App extends React.Component {

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
                    <MainNavigator/>
                </View>
            </Provider>
        )
    }
}