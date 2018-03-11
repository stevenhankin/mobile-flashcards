import React from 'react';
import {StackNavigator, TabNavigator} from 'react-navigation'
import {View} from 'react-native';
import DeckList from "./components/DeckList";
import Deck from './components/Deck'
import Quiz from './components/Quiz'
import NewDeck from "./components/NewDeck";
import AddCard from "./components/AddCard";
import {Provider} from 'react-redux'
import {receiveDecks} from './actions'
import configureStore from './store/configureStore'

// Create a new Redux store
const store = configureStore();


const DeckUseStack = StackNavigator(
    {
        DeckList: {screen: DeckList},
        Deck: {screen: Deck},
        AddCard: {screen: AddCard},
        Quiz: {screen: Quiz},
    },
    {
        initialRouteName: 'DeckList',
    });

const DeckAmendStack = StackNavigator(
    {
        NewDeck: {screen: NewDeck}

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
                tabBarLabel: 'New Deck'
            }
        },
    },
    {
        initialRouteName: 'DeckUse',
    }
);

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
        };

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
