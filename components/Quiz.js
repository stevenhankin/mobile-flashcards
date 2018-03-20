import React from 'react'
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native'
import {connect} from "react-redux";
import styles from '../utils/styles'
import {clearLocalNotifications, setLocalNotification} from "../utils/notifier";


class Quiz extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            questionIdx: 0,
            correct: 0,
            showAnswer: false,
        }
    }

    static navigationOptions = ({navigation}) => {
        return {
            title: `${navigation.state.params.deckTitle} Quiz`
        }
    };

    correct = () => {
        this.setState({
            correct: this.state.correct + 1,
            questionIdx: this.state.questionIdx + 1,
            showAnswer: false
        })
    };

    incorrect = () => {
        this.setState({
            questionIdx: this.state.questionIdx + 1,
            showAnswer: false
        })
    };


    /**
     * Helper method - display during a deck quiz
     *
     * @param question
     * @param answer
     * @param cardsLeft
     * @returns {*}
     */
    quizQuestion(question, answer, cardsLeft) {

        return <View>
            <Text>Question: {question}</Text>
            {this.state.showAnswer ?
                <Text>Answer: {answer}</Text>
                :
                <TouchableOpacity onPress={() => {
                    this.setState({showAnswer: true})
                }} style={styles.button}>
                    <Text>Show Answer</Text>
                </TouchableOpacity>
            }
            <Text>({cardsLeft} cards remaining..)</Text>
            <TouchableOpacity onPress={this.correct} style={styles.button}>
                <Text>Correct</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.incorrect} style={styles.button}>
                <Text>Incorrect</Text>
            </TouchableOpacity>
        </View>;
    }

    /**
     * Helper method - display for last view at end of quiz
     *
     * @param deck
     * @param navigation
     * @param deckName
     * @returns {*}
     */
    quizEnd(deck, navigation) {

        /*
        Since a quiz has been completed, can reset the reminder
        and scheduler a new one (for 24 hours time)
         */
        clearLocalNotifications()
            .then(setLocalNotification());

        return <View style={styles.messageView}>
            <Text style={styles.messageText}>{Math.round(100 * this.state.correct / deck.numCards)}%
                correct</Text>
            <Text>You have completed this deck</Text>
            <TouchableOpacity style={styles.button}
                              onPress={() =>
                                  this.setState({
                                      correct: 0,
                                      questionIdx: 0,
                                      showAnswer: false
                                  })
                              }>
                <Text>Restart Quiz</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
                <Text>Back to Deck</Text>
            </TouchableOpacity>
        </View>;
    }

    render() {
        const {navigation} = this.props;
        const {params} = navigation.state;
        const {deckId} = params;
        const deck = this.props.decks.byId[deckId];
        const {cards} = deck;
        const cardsLeft = deck.numCards - this.state.questionIdx;
        const {question, answer} = cardsLeft && cards[this.state.questionIdx];
        return (
            <View style={styles.container}>
                {cardsLeft ?
                    this.quizQuestion(question, answer, cardsLeft)
                    :
                    this.quizEnd(deck, navigation)

                }
            </View>
        )
    }

}


mapStateToProps = ({decks}) => ({decks});

export default connect(mapStateToProps)(Quiz)

