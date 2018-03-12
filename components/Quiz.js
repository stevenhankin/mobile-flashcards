import React from 'react'
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native'

class Quiz extends React.Component {
    static navigationOptions = ({navigation}) => {
        const {deckName} = navigation.state.params;
        return {
            /* Title for this Navigated screen */
            title: `${deckName} Quiz`,
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            questionIdx: 0,
            correct: 0,
            showAnswer: false,
        }
    }

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

    render() {
        const {params} = this.props.navigation.state;
        // const {deckName} = params;
        const {deck} = params;
        const {questions} = deck;
        const cardsLeft = questions.length - this.state.questionIdx;
        const {question, answer} = cardsLeft && questions[this.state.questionIdx];
        return (
            <View style={styles.container}>
                {cardsLeft ?
                    <View>
                        <Text>Question</Text>
                        <Text>{question}</Text>
                        {this.state.showAnswer ?
                            <Text>{answer}</Text>
                            :
                            <TouchableOpacity onPress={() => {
                                this.setState({showAnswer: true})
                            }} style={styles.button}>
                                <Text>Show Answer</Text>
                            </TouchableOpacity>
                        }
                        <TouchableOpacity onPress={this.correct} style={styles.button}>
                            <Text>Correct</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.incorrect} style={styles.button}>
                            <Text>Incorrect</Text>
                        </TouchableOpacity>
                        <Text>{cardsLeft} Cards Left</Text>
                    </View>
                    : <View>
                        <Text>{Math.round(100 * this.state.correct / questions.length)}% correct</Text>
                    </View>
                }
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


export default Quiz