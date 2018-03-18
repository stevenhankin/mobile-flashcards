import React from 'react'
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native'
import {connect} from "react-redux"
import styles from '../utils/styles'

class Deck extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            deckName: props.navigation.state.params.selectedDeck
        }
    }

    static navigationOptions = ({navigation}) => {
        return {
            title: `${navigation.state.params.selectedDeck} Deck`
        }
    };


    render() {
        const {deckName} = this.state;
        const deck = this.props.decks.byId[deckName];
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>
                <Text>{deck.numCards} card{deck.numCards === 1 ? '' : 's'}</Text>
                <TouchableOpacity onPress={() => navigate('Quiz', {deckName})} style={styles.button} disabled={deck.numCards === 0}>
                    <Text>Start a Quiz</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigate('AddCard', {selectedDeck: deckName})} style={styles.button}>
                    <Text>Create New Question</Text>
                </TouchableOpacity>
            </View>
        )
    }
}


mapStateToProps = ({decks}) => ({decks});

export default connect(mapStateToProps)(Deck)

