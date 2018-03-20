export default class GameManager {

    private _deck: any[];
    private _game: any;
    private _status: any;
    private _timeout: number|null;

    
    get deck() {
        return this._deck;
    }

    set deck(deck: any[]) {
        this._deck = deck;
    }

    get game() {
        return this._game;
    }

    set game(game: any) {
        this._game = game;
    }

    get timeout() {
        return this._timeout;
    }

    get status() {
        return this._status;
    }

    constructor() {
        this._deck = [];
        this._status = {};
        this._timeout = null;
        this._game = {difficulty: null, startTime: null, endTime: null, turns: 0, started: false, won: false, lost: false, locked: false}
    }

    /**
     * Initializes the _game and creates a new _deck with the given difficulty
     *
     * @param difficulty
     * @param user
     */
    startGame(difficulty: string, user: string) {
        this._game.startTime = new Date();
        this._game.started= true;
        this._deck = [];
        let durchlaeufe = 36;
        if(difficulty == "easy"){
            durchlaeufe = 16;
        }
        
        if(difficulty == "hard"){
                               
            this._timeout= setTimeout(() =>{
                this._game.lost = true;
            }, 70000);
        }
        this._game.difficulty = difficulty;
        for(let x = 0; x<durchlaeufe;++x){
            let card = {id: x, image: this._getRandomNumber(durchlaeufe/2-1), show: false}
            this._deck.push(card);
        }
        return true;
        
    }

    /**
     * Creates a new random number which occurs at maximum twice in _deck
     *
     * @param max
     * @private
     */
    _getRandomNumber(max: number) {
    }

    /**
     * Is triggered when the user clicks on a card
     * Shows the card and hides other cards if necessary
     *
     * @param id
     */
    showCard(id: number) {
    }

    /**
     *
     */
    resetGame() {
    }
}