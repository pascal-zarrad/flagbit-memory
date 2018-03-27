# The MEMORY-Project

> The aim of the project is to implement the Memory card game in the browser using JavaScript.

In Memory, cards with pictures are laid out on the square playing field upside down.
Each card is available exactly two times. Each player can open two cards in one move.
If the cards show the same image, they remain face-up. Otherwise, you will be turned around again.
The aim of the game is to find all pairs of cards as quickly as possible.

The graphical interface of the game has already been implemented in the project folder.
The actual logic of the game should be implemented in the file src/js/Classes/GameManager.ts.
This has been done satisfactorily if all test cases are run successfully.
The tests can be executed with the command "npm run test".

## Setup
1. Run `docker-compose up -d`
2. Run `npm install`

## Requirements
- Requrires `docker`, `docker-compose` and `npm` to be installed

## Commands
 - `npm run test` runs tests
 - `npm run watch` builds the application and watches for changes
 - `npm run build` builds the whole application

## Specifications
The game uses a virtual deck, which is an array of cards.
Each cards has an id, an image and a status variable (show) which determines if the card is visible.
```javascript
let card = {id: 1, image: 1, show: false}

let deck = [
    {id: 1, image: 1, show: false},
    {id: 2, image: 2, show: false},
    {id: 3, image: 2, show: true},
    {id: 4, image: 1, show: false}
]
```

## Tests
You can run a single test with `fit` instead of `it`:
```javascript
// runs all tests
it('should do something', () => {
    // test
});


// runs only this test
fit('should do something', () => {
    // test
});
```


You can run a single suite with `fdescribe` instead of `describe`:
```javascript
// runs all suites
describe('GameManager', () => {
    // tests
});


// runs only this suite
fdescribe('GameManager', () => {
    // tests
});
```


## Help
- [MDN](https://developer.mozilla.org/de/) provides a lot of information on JavaScript
- [SelfHTML](https://wiki.selfhtml.org/wiki/JavaScript) is good for beginners
- [W3C Schools](https://www.w3schools.com/js/default.asp) has a lot of tutorials
- [Javascript Cheat Sheet](https://github.com/mbeaudru/modern-js-cheatsheet/blob/master/README.md)