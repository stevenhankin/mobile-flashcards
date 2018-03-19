import React from 'react'
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native'
import {connect} from "react-redux"
import styles from '../utils/styles'

class Deck extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            deckId: props.navigation.state.params.deckId
        }
    }

    static navigationOptions = ({navigation}) => {
        const {deckTitle} = navigation.state.params;
        return {
            title: `${deckTitle} Deck`
        }
    };


    render() {
        const {deckId} = this.state;
        console.log('byId',this.props.decks.byId)
        const deck = this.props.decks.byId[deckId];
        console.log('deck contains',deck)
        const {deckTitle} = deck;
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>
                <Text>{deck.numCards} card{deck.numCards === 1 ? '' : 's'}</Text>
                <TouchableOpacity onPress={() => navigate('Quiz', {deckId, deckTitle})} style={styles.button} disabled={deck.numCards === 0}>
                    <Text>Start a Quiz</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigate('AddCard', {deckId, deckTitle})} style={styles.button}>
                    <Text>Create New Question</Text>
                </TouchableOpacity>
            </View>
        )
    }
}


mapStateToProps = ({decks}) => ({decks});

export default connect(mapStateToProps)(Deck)

