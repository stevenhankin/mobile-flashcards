import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Animated} from 'react-native';
import {connect} from 'react-redux';
import {receiveDecks} from '../actions'

class DeckList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            faders: {}
        }
    }

    static navigationOptions = {
        /* Title for this Navigated screen */
        title: 'Decks',
    };

    /**
     * Once props arrive from Redux, we can setup the faders for the animation.
     * New Props are received when a new deck is created and hence need a new fader.
     *
     * @param newProps
     */
    componentWillReceiveProps(newProps) {
        newProps.decks && this.setupFaders(newProps)
    }

    /**
     * Create a state object (faders) that holds a separate
     * animation value per deck, so that multiple
     * decks can be faded simultaneously
     *
     * @param props
     */
    setupFaders = (props) => {
        const faders = Object.getOwnPropertyNames(props.decks)
            .reduce((acc, val) => {
                const deckObj = {};
                deckObj[val] = {opacityAnim: new Animated.Value(1)};
                return Object.assign({}, acc, deckObj)
            }, {});
        this.setState({faders})
    };


    render() {
        const decks = this.props.decks ||{};
        console.log('decks',decks)
        const deckKeys = Object.getOwnPropertyNames(decks);
        console.log('deckKeys',deckKeys)
        return (
            <View style={styles.container}>
                {this.displayEachDeck(deckKeys, decks)}
            </View>
        );
    }


    /**
     * The selected deck will remain visible as the other
     * decks will fade out, before a navigation to the
     * next appropriate screen (either to the deck view
     * or Add Card screen if it's a new deck)
     *
     * @param selectedDeck
     * @param numCards
     */
    fadeDecksAndNavigate = (selectedDeck, numCards) => {
        const {navigate} = this.props.navigation;
        const {decks} = this.props;
        /*
        Aim is to transition once the fading effect of the other cards has almost completed
         */
        setTimeout(
            () =>
                numCards > 0 ?
                    navigate('Deck', {selectedDeck, deck: decks[selectedDeck]})
                    : navigate('AddCard', {selectedDeck}),
            800);
        Object.getOwnPropertyNames(this.state.faders)
            .filter(faderName => faderName !== selectedDeck) // Only want to fade-out the unselected decks
            .map(
                (deckName) => {
                    const deckFader = this.state.faders[deckName];
                    Animated.timing(                  // Animate
                        deckFader.opacityAnim,
                        {
                            toValue: 0,                  // Transition to opaque..
                            duration: 1000,              // ..during 1 second
                        }
                    ).start(
                        () => {
                            /*
                            After a short delay...make the faded deck visible again
                             */
                            setTimeout(() => this.state.faders[deckName].opacityAnim.setValue(1), 500)
                        }
                    );
                }
            )
    };

    /**
     * Display each deck as a (animate-able) view
     *
     * @param deckKeys
     * @param decks
     * @returns {Object|*|{}|Uint8Array|any[]|Int32Array}
     */
    displayEachDeck(deckKeys, decks) {
        console.log('deckKeys',JSON.stringify(deckKeys))
        return deckKeys.map((deckName) => {
            console.log('deckName',deckName)
            console.log('decks',JSON.stringify(decks))
            const deck = decks[deckName];
            const numCards = deck.questions && deck.questions.length;
            return (
                <Animated.View key={deckName} style={{opacity: this.getOpacityAnim(deckName)}}>
                    <TouchableOpacity style={styles.button}
                                      onPress={() => this.fadeDecksAndNavigate(deckName, numCards)
                                      }>
                        <Text>{deckName}</Text>
                        <Text>{numCards} cards</Text>
                    </TouchableOpacity></Animated.View>)
        });
    }

    /**
     * Return the animated opacity if available
     * otherwise default to 1 (visible)
     *
     * @param deckName
     * @returns {Animated.Value|number}
     */
    getOpacityAnim(deckName) {
        const fader = this.state.faders[deckName];
        return (fader && fader.opacityAnim) || 1;
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

export default connect(mapStateToProps, {receiveDecks})(DeckList)
