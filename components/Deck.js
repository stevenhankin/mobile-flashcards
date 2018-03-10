import React from 'react'
import {Text, View} from 'react-native'

class Deck extends React.Component {

    render() {
        const {deckName} = this.props.navigation.state.params;
        return (
            <View>
                <Text>{deckName}</Text>
            </View>
        )
    }
}

export default Deck