export default class GameManager {

    private _deck: any[];
    private _game: any;
    private _status: any;
    private _timeout: number|null;

    // noinspection JSMethodCanBeStatic
    get features() {
        return 'minimal';
    }

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

    constructor() {
        this._deck = [];
        this._status = [];
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
        this._game.difficulty = difficulty;
        this._game.startTime = new Date();
        this._game.started = true;
        this._deck = [];
        for (var i = 0; i < 16; i++) {
         let card = {id: i, image: 1, show: false}
         let random = this._getRandomNumber(7);
         this._deck.push( card ); 
         this._deck[i].image = random
    
        }
        return true; 
    }

    /**
     * Creates a new deck with the difficulty of _game
     * @private
     */
    _shuffleDeck() {
    }

    /**;
     * Creates a new random number which occurs at maximum twice in _deck
     *
     * @param max
     * @private
     * @returns number
     *
     */
    _getRandomNumber(max: number): number {
        let randomNumber = Math.round(Math.random()*max);
    //    randomNumber bereits 2x vorhanden, neu würfeln?
        
        let i = 0
        this._deck.forEach(function(Element){
            
        if (Element.image == randomNumber) {
            i++
        
        }
        }
    )   
        if ( i == 2) return this._getRandomNumber(max);
                return randomNumber
    }

    /**
     * Is triggered when the user clicks on a card
     * Shows the card and hides other cards if necessary
     *
     * @param id
     */
    showCard(id: number) {
         let card = this._deck [id];
    if (this._game.locked != true) {
        
    
        if(card.show == false){
            this._game.turns++
            card.show = true; 
            if (this._status.length == 2 ){
                if (this._status [0].image != this._status [1].image) {
                    this._status [0].show = false
                    this._status [1].show = false
                }
                this._status.pop()
                this._status.pop()
                
            } 
            this._status.push ( card )


            let r = 0

            this._deck.forEach(function(element){
                if (element.show == true) {

                }
            
                else { r++

                }
            })


            if ( r == 0) {
                this._game.won = true;
                this._game.endTime = new Date ()
            }
        }
    }
    }
    /**
     *
     */
    resetGame() {
    }
}