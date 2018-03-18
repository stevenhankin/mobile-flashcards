import React from 'react'
import {Text, View, TextInput, TouchableOpacity, StyleSheet} from 'react-native'
import {connect} from "react-redux";
import {addCardToDeck} from '../actions'

class AddCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            question: '',
            answer: '',
            deckName: props.navigation.state.params.selectedDeck,
        }
    }

    static navigationOptions = ({navigation}) => {
        console.log('params',JSON.stringify(navigation.state.params))
        const {selectedDeck} = navigation.state.params;
        return {
            /* Title for this Navigated screen */
            title: `Add Card to ${selectedDeck}`,
        }
    };


    render() {
        return (
            <View style={styles.container}>
                <Text>Question</Text>
                <TextInput
                    placeholder='Question'
                    style={styles.input}
                    onChangeText={(question) => {
                        this.setState({question})
                    }}
                    value={this.state.question}/>
                <Text>Answer</Text>
                <TextInput
                    placeholder='Answer'
                    style={styles.input}
                    onChangeText={(answer) => {
                        this.setState({answer})
                    }}
                    value={this.state.answer}/>
                <TouchableOpacity
                    onPress={()=>this.props.addCardToDeck(this.state.deckName, {question: this.state.question, answer: this.state.answer})}
                    style={styles.button}>
                    <Text>Add Card</Text>
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
    },
    input: {
        height: 40, width: 200, borderColor: 'gray', borderWidth: 1
    }
});


// mapStateToProps = ({decks}) => ({decks});

export default connect(null, {addCardToDeck})(AddCard)
