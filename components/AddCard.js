import React from 'react'
import {Text, View, TextInput, TouchableOpacity, StyleSheet} from 'react-native'
import {connect} from "react-redux";
import {addCard} from '../actions'
import styles from '../utils/styles'

class AddCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            question: '',
            answer: '',
        }
    }

    static navigationOptions = ({navigation}) => {
        return {
            title: `Add Card to ${navigation.state.params.selectedDeck}`
        }
    };


    render() {
        const deckName = this.props.navigation.state.params.selectedDeck;
        return (
            <View style={styles.container}>
                <Text style={styles.messageText}>Question</Text>
                <TextInput
                    placeholder='Question'
                    style={styles.input}
                    onChangeText={(question) => {
                        this.setState({question})
                    }}
                    value={this.state.question}/>
                <Text style={styles.messageText}>Answer</Text>
                <TextInput
                    placeholder='Answer'
                    style={styles.input}
                    onChangeText={(answer) => {
                        this.setState({answer})
                    }}
                    value={this.state.answer}/>
                <TouchableOpacity
                    onPress={() => this.props.addCard(deckName, this.state.question, this.state.answer)}
                    style={styles.button}>
                    <Text>Add Card</Text>
                </TouchableOpacity>
            </View>
        )
    }
}


export default connect(null, {addCard})(AddCard)
