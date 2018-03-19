import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Animated} from 'react-native';
import {connect} from 'react-redux';
import {receiveDecks} from '../actions'
import {getAllDecks} from '../reducers'
import styles from '../utils/styles'

class DeckList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            faders: {}
        };
    }

    static navigationOptions = {
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
     * @param newProps
     */
    setupFaders = (newProps) => {
        const faders = getAllDecks(newProps.decks)
            .map((deck) => (
                {
                    deckId: deck.deckTitle,
                    opacityAnim: new Animated.Value(1)
                })
            )
            .reduce((acc, val) => {
                acc[val.deckId] = val;
                return acc;
            }, {});
        this.setState({faders})
    };


    /**
     * The selected deck will remain visible as the other
     * decks fade out, before a navigation to the
     * next appropriate screen (either to the deck view
     * or Add Card screen if it's a new deck)
     *
     * @param selectedDeck
     * @param numCards
     */
    fadeDecksAndNavigate = (selectedDeck, numCards) => {
        const {navigate} = this.props.navigation;
        /*
        Aim is to transition once the fading effect of the other cards has almost completed
         */
        setTimeout(
            () =>
                numCards > 0 ?
                    navigate('Deck', {selectedDeck})
                    : navigate('AddCard', {selectedDeck}),
            400);
        getAllDecks(this.props.decks)
            .map((deck) => deck.deckTitle)
            .filter(deckTitle => deckTitle !== selectedDeck) // Only want to fade-out the unselected decks
            .map(
                (deckTitle) => {
                    const deckFader = this.state.faders[deckTitle];
                    Animated.timing(             // Animate
                        deckFader.opacityAnim,
                        {
                            toValue: 0,         // Transition to opaque..
                            duration: 500,      // ..during 1 second
                        }
                    ).start(                    // Start animation now
                        () => {
                            //  and after a short delay...make the faded deck visible again
                            setTimeout(() => deckFader.opacityAnim.setValue(1), 500)
                        }
                    );
                }
            )
    };


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

    render() {
        const decks = getAllDecks(this.props.decks);
        return (
            <View style={styles.container}>
                {decks.length === 0 ?
                    <View style={styles.messageView}>
                        <Text style={styles.messageText}>You have no decks created yet!</Text>
                        <Text>Click on the "New Deck" tab to create some...</Text>
                    </View>
                    :
                    decks.map(
                        (deck) =>
                            <Animated.View key={deck.deckTitle} style={{opacity: this.getOpacityAnim(deck.deckTitle)}}>
                                <TouchableOpacity style={styles.button}
                                                  onPress={() => this.fadeDecksAndNavigate(deck.deckTitle, deck.numCards)
                                                  }>
                                    <Text style={styles.emphasis}>{deck.deckTitle}</Text>
                                    <Text>{deck.numCards} card{deck.numCards===1?'':'s'}</Text>
                                </TouchableOpacity>
                            </Animated.View>
                    )}

            </View>

        );
    }

}


mapStateToProps = ({decks}) => ({decks});

export default connect(mapStateToProps, {receiveDecks})(DeckList)
