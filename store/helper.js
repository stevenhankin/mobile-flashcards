import {AsyncStorage} from 'react-native'

/**
 * return all of the decks along with their titles, questions, and answers
 */
getDecks = () => {
    return AsyncStorage.getItem('@Udacicards:decks').then(
        (result) => {
            //TODO
        }
    )
}

/**
 * take in a single id argument and return the deck associated
 * with that id
 *
 * @param id
 */
getDeck = (id) => {
    //TODO
}


/**
 * take in a single title argument and add it to the decks
 *
 * @param title
 */
saveDeckTitle = (title) => {
    //TODO
}


/**
 * take in two arguments, title and card, and will add
 * the card to the list of questions for the deck with
 * the associated title.
 *
 * @param title
 * @param card
 */
addCardToDeck = (title, card) => {
    //TODO
}

