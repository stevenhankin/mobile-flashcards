# Udacicards

This app is a mobile application (Android or iOS - or both) that allows users to study collections of flashcards.
The app will allow users to create different categories of flashcards called "decks", add flashcards to those decks, then take quizzes on those decks.


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

Note that this project has been tested on an iMac, with and iOS Simulator (from XCode)


### Host Prerequisites

* Git - To clone the code repository
* NodeJS - To supply the NPM module, version 8 or later
* Yarn - More reliable alternative to NPM (although NPM can also be used)

### Additional device requirements
* Mac/OSX - Install XCode to get the iOS Simulator
* Android - Install Expo via Google Play Store
* iPhone - Install Expo via App Store

### Installing

The following will install and start the server application

```
git clone https://github.com/stevenhankin/mobile-flashcards.git
cd mobile-flashcards
yarn install
yarn start
```

Now you can use a simulator (if installed on your host) or connect to
a device such as an Android or iPhone, following the on-screen
instructions from Expo

## Project Layout

### File structure
```
    App.js              (application root)
        /actions        (redux actions)
        /components     (views)
        /reducers       (redux reducer)
        /storage        (device local storage api)
        /utils          (navigation, notifications and styles)
```

### State structure
```
{
    decks: {
        byId: {
            <id1> : {
                deckTitle: <title>
                numCards: <#cards>
                cards: [
                    <card1>: {
                        question: <question>
                        answer: <answer>
                    },
                    <card2>: {
                        question: <question>
                        answer: <answer>
                    }
                ]
            }
        }
        allIds: [<deckId1>,<deckId2>,..]
    }
}
```

## Contributing

Please read [CONTRIBUTING.md](https://github.com/stevenhankin/mobile-flashcards) for details on our code of conduct, and the process for submitting pull requests to us.

## Authors

* **Steve Hankin** - *Initial work* - [stevenhankin](https://github.com/stevenhankin)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Thanks to Udacity [React Nanodegree Course](https://classroom.udacity.com/nanodegrees/nd019/syllabus/core-curriculum) 
* README Template taken from [here](https://gist.github.com/PurpleBooth/109311bb0361f32d87a2)

This project was bootstrapped with [Create React Native App](https://github.com/react-community/create-react-native-app).
