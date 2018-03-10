import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {receiveDecks} from '../actions'

class DeckList extends React.Component {
    static navigationOptions = {
        /* Title for this Navigated screen */
        title: 'Deck List',
    };


    render() {
        const {navigate} = this.props.navigation;
        const {decks} = this.props;
        const deckArr = Object.keys(decks)
        return (
            <View style={styles.container}>
                {deckArr.map((val) => <TouchableOpacity style={styles.button}
                                                        key={val}><Text>{val}</Text></TouchableOpacity>)}
            </View>
        );
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

mapStateToProps = (decks) => {
    return {decks}
};

export default connect(mapStateToProps, {receiveDecks})(DeckList)