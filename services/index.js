import {AsyncStorage,localStorage} from 'react-native'

const key = '@Udacicards:decks';

/**
 * return Promise for all of the decks along with their titles, questions, and answers
 *
 * @returns {*|Promise}
 */
export function getDecks() {
    return new Promise(
        (resolve,reject) => {
            AsyncStorage.getItem(key)
                .then((decks) => {
                    console.log('got decks!',decks)
                    return resolve(decks)
                }, (err) => {
                    console.log('oops', err)
                    return reject(err)
                })
        })
}


/**
 *
 * accept a single id (same as deck name) argument
 * return the deck associated with that id
 *
 * @param id
 * @returns {Promise<any>}
 */
function getDeck(id) {
    return new Promise(
        (resolve, reject) => {
            AsyncStorage.getItem(key).then(
                (value) => {
                    console.log('value', value)
                    const data = JSON.parse(value) || {};
                    return resolve(data[id])
                }, (err) => {
                    console.log('oops', err)
                    return reject(err)
                }
            )
        }
    )
}


/**
 * take in a single title argument and add it to the decks
 * initially with no cards
 *
 * @param deckName
 */
export function addDeck(deckName) {
    return new Promise((resolve, reject) => {
            console.log('services addDeck', deckName);
            AsyncStorage.getItem(key).then( // Get whole deck
                (value) => {
                    let data = JSON.parse(value) || {};
                    if (!data[deckName]) { // verify deck is new; id is same as title
                        data[deckName] = {title: deckName, questions: []}; // new empty deck
                        AsyncStorage.setItem(key, JSON.stringify(data))
                            .then(
                                () => {
                                    // console.log('set item', err);
                                    getDeck(deckName).then((deck) => {
                                            console.log('getDeck', deck);
                                            return resolve(deck);
                                        }
                                    )
                                }
                            )
                    }
                },
                (reason) => {
                    console.log('error from storage is', reason)
                    return reject(reason)
                }
            );
        }
    )

};


/**
 * take in two arguments, title and card, and will add
 * the card to the list of questions for the deck with
 * the associated title.
 *
 * Resolves with updated deck
 *
 * @param deckName
 * @param card
 */
export function addCardToDeck(deckName, card) {
    return new Promise((resolve, reject) => {
            console.log('services addCardToDeck');
            AsyncStorage.getItem(key).then( // Get whole deck first
                (value) => {
                    let data = JSON.parse(value) || {};
                    // console.log(`Looking for ${deckName} in`, data)
                    if (!data[deckName]) { //  Verify deck exists
                        return reject(`Deck ${deckName} does not exit; create first`)
                    }
                    console.log('adding card...')
                    data[deckName].questions.push(card); //add card to deck
                    AsyncStorage.setItem(key, JSON.stringify(data))  // ..then save deck to storage
                        .then(
                            () => {
                                // console.log('set item', err);
                                getDeck(deckName).then((deck) => {
                                        console.log('getDeck', deck);
                                        return resolve(deck);
                                    }
                                )
                            }
                        )
                },
                (reason) => {
                    console.log('error from storage is', reason)
                    return reject(reason)
                }
            );
        }
    )

}

