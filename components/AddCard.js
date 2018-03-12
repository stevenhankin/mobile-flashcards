import React from 'react'
import {Text, View, TextInput, TouchableOpacity, StyleSheet} from 'react-native'
import {addCard} from "../actions";
import {connect} from "react-redux";

class AddCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            question: '',
            answer: '',
            deckName: props.navigation.state.params.deckName,
        }
    }

    static navigationOptions = ({navigation}) => {
        // const {deckName} = navigation.state.params;
        return {
            /* Title for this Navigated screen */
            title: 'Add Card',
        }
    };

    /**
     * Dispatch an Add Card action
     * using the passed in deck name
     * and the new question and new answer
     */
    createCard = () => {
        this.props.addCard(this.state.deckName, this.state.question, this.state.answer)
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
                <TouchableOpacity
                    onPress={this.createCard}
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


mapStateToProps = ({decks}) => ({decks});

export default connect(mapStateToProps, {addCard})(AddCard)
