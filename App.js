import React from 'react';
import {StackNavigator, TabNavigator} from 'react-navigation'
import {View} from 'react-native';
import DeckList from "./components/DeckList";
import Deck from './components/Deck'
import Quiz from './components/Quiz'
import NewDeck from "./components/NewDeck";
import AddCard from "./components/AddCard";
import {Provider} from 'react-redux'
import {addCardToDeck, getDecks, receiveDecks} from './actions'
import configureStore from './store/index'
import {addDeck} from "./actions";
import {MaterialCommunityIcons, Ionicons} from "@expo/vector-icons";

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
                tabBarLabel: 'Decks',
                tabBarIcon: ({tintColor}) => <MaterialCommunityIcons name='cards' size={26} style={{color: tintColor}}/>
            }
        },
        DeckAmend: {
            screen: DeckAmendStack,
            navigationOptions: {
                tabBarLabel: 'New Deck',
                tabBarIcon: ({tintColor}) => <Ionicons name='ios-add-circle' size={26} style={{color: tintColor}}/>
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


        // store.dispatch(receiveDecks(decks));
        // console.log('Getting all decks')
        store.dispatch(getDecks());

        // store.dispatch(addDeck('React')).then(
        //     [
        //         {
        //             question: 'What is React?',
        //             answer: 'A library for managing user interfaces'
        //         },
        //         {
        //             question: 'Where do you make Ajax requests in React?',
        //             answer: 'The componentDidMount lifecycle event'
        //         }
        //     ].map(
        //         (card) => store.dispatch(addCardToDeck('React', card))
        //     ));
        //
        // store.dispatch(addDeck('JavaScript')).then(
        //     [
        //         {
        //             question: 'What is a closure?',
        //             answer: 'The combination of a function and the lexical environment within which that function was declared.'
        //         }
        //     ].map(
        //         (card) => store.dispatch(addCardToDeck('JavaScript', card))
        //     ));


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
