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

## Tips
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
