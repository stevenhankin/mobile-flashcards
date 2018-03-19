import React from 'react'
import {Text, TextInput, View, TouchableOpacity, StyleSheet} from 'react-native'
import {connect} from "react-redux";
import {addDeck} from "../actions";
import styles from '../utils/styles'

class NewDeck extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        }
    }

    static navigationOptions = ({navigation}) => {
        return {
            /* Title for this Navigated screen */
            title: `New Deck`,
        }
    };

    addDeckAndNavigate = () => {
        const deckName = this.state.text;
        this.props.addDeck(deckName);
        this.props.navigation.navigate('Deck', {selectedDeck: deckName})
    };

    render() {
        return (
            <View style={styles.container}>
                <Text>What is the title of your new deck?</Text>
                <TextInput
                    placeholder='Deck Title'
                    style={{height: 40, width: 200, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={(text) => {
                        this.setState({text})
                    }}
                    value={this.state.text}
                />
                <TouchableOpacity style={styles.button} onPress={this.addDeckAndNavigate}
                                  disabled={this.state.text.trim().length === 0}>
                    <Text>Create Deck</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default connect(null, {addDeck})(NewDeck)
