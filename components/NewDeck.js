import React from 'react'
import {Text, TextInput, View, TouchableOpacity, StyleSheet} from 'react-native'
import {connect} from "react-redux";
import {addDeck} from "../actions";

class NewDeck extends React.Component {

    constructor() {
        super()
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
        this.props.addDeck(deckName)
    };

    render() {
        const {navigate} = this.props.navigation;
        const {params} = this.props.navigation.state;
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
                <TouchableOpacity style={styles.button} onPress={this.addDeckAndNavigate}>
                    <Text>Create Deck</Text>
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

export default connect(mapStateToProps, {addDeck})(NewDeck)
