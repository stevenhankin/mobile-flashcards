import React from 'react'
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native'

export default class AddCard extends React.Component {
    static navigationOptions = ({navigation}) => {
        const {deckName} = navigation.state.params;
        // debugger
        return {
            /* Title for this Navigated screen */
            title: `${deckName} Deck`,
        }
    };

    addQuestion = () => {
        // TODO
        console.log('addQuestion')
    };

    render() {
        const {navigate} = this.props.navigation;
        const {params} = this.props.navigation.state;
        const {deckName} = params;
        const {deck} = params;
        return (
            <View style={styles.container}>
                {/*<Text>{deckName}</Text>*/}
                <Text>{deck.questions.length} cards</Text>
                <TouchableOpacity onPress={() => navigate('Quiz', {deckName, deck})} style={styles.button}>
                    <Text>Start Quiz</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.addQuestion} style={styles.button}>
                    <Text>Add Question</Text>
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

