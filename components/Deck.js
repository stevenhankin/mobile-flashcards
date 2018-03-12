import React from 'react'
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native'
import {connect} from "react-redux";
import {addCard} from "../actions";

class Deck extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            deckName: props.navigation.state.params.deckName
        }
    }

    static navigationOptions = ({navigation}) => {
        const {deckName} = navigation.state.params;
        return {
            /* Title for this Navigated screen */
            title: `${deckName} Deck`,
        }
    };

    render() {
        const {deckName} = this.state;
        const deck = this.props.decks[deckName];
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>
                <Text>{deck && deck.questions.length} cards</Text>
                <TouchableOpacity onPress={() => navigate('Quiz', {deckName, deck})} style={styles.button}>
                    <Text>Start a Quiz</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigate('AddCard', {deckName})} style={styles.button}>
                    <Text>Create New Question</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        margin: 20,
        padding: 10,
        width: 200,
    }
});


mapStateToProps = ({decks}) => ({decks});

export default connect(mapStateToProps)(Deck)

