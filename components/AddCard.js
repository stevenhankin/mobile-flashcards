import React from 'react'
import {Text, View, TextInput, TouchableOpacity, StyleSheet} from 'react-native'
import {addDeck} from "../actions";
import {connect} from "react-redux";

class AddCard extends React.Component {

    constructor() {
        super();
        this.state = {
            question: '',
            answer: ''
        }
    }

    static navigationOptions = ({navigation}) => {
        // const {deckName} = navigation.state.params;
        return {
            /* Title for this Navigated screen */
            title: 'Add Card',
        }
    };

    addCard = () => {
        // TODO
        console.log('addQuestion')
    };

    render() {
        // const {navigate} = this.props.navigation;
        // const {params} = this.props.navigation.state;
        // const {deckName} = params;
        // const {deck} = params;
        return (
            <View style={styles.container}>
                <Text>Question</Text>
                <TextInput
                    placeholder='Question'
                    style={styles.input}
                    onChangeText={(question) => {
                        this.setState({question})
                    }}
                    value={this.state.question}
                />
                <Text>Answer</Text>
                <TextInput
                    placeholder='Answer'
                    style={styles.input}
                    onChangeText={(answer) => {
                        this.setState({answer})
                    }}
                    value={this.state.answer}
                />
                <TouchableOpacity onPress={this.addCard} style={styles.button}>
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


mapStateToProps = ({decks}) => ({decks});

export default connect(mapStateToProps, {})(AddCard)
