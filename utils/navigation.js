import React from 'react';
import DeckList from "../components/DeckList";
import {StackNavigator, TabNavigator} from "react-navigation";
import AddCard from "../components/AddCard";
import Quiz from "../components/Quiz";
import Deck from "../components/Deck";
import NewDeck from "../components/NewDeck";
import {MaterialCommunityIcons, Ionicons} from "@expo/vector-icons";


/*
Main application menu
 */
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

/*
Menu used only for adding new Decks
 */
const DeckAmendStack = StackNavigator(
    {
        NewDeck: {screen: NewDeck}

    },
    {
        initialRouteName: 'NewDeck',
    });

/*
Useful tab navigator on top of screen (Android), or bottom (iOS)
 */
export const TabNav = TabNavigator(
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