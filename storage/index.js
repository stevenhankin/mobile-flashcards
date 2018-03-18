import {AsyncStorage} from 'react-native'

const key = 'Udacicards-state';

export const loadState = () => {
    return new Promise(
        (resolve, reject) => {
            try {
                AsyncStorage.getItem(key)
                    .then((serializedState) => {
                            if (serializedState === null) {
                                return resolve(undefined);
                            }
                            const state = JSON.parse(serializedState);
                            return resolve(state);
                        }
                    );
            } catch (err) {
                console.error(err);
                return reject(undefined);
            }
        }
    )
};


export const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        AsyncStorage.setItem(key, serializedState);
    } catch (err) {
        console.error(err);
    }
};

