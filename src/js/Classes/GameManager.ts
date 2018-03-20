export default class GameManager {

    private _deck: any[];
    private _game: any;
    private _status: any[];
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
    _getRandomNumber(max: number):number {
    

        let zahlen:any[] = [];

        for( let z = 0; z<this._deck.length; z ++){
            zahlen.push(this._deck[z].image);
        }

        let zufallzahl = Math.round(Math.random()*max);
        

        function checkDuplicate(zahl:number) {
            return zahl == zufallzahl;
        }

        let length = zahlen.filter(checkDuplicate).length;
        if(length == 2){
        
            return this._getRandomNumber(max)

        }
                 
         return zufallzahl;

    }

    /**
     * Is triggered when the user clicks on a card
     * Shows the card and hides other cards if necessary
     *
     * @param id
     */
    showCard(id: number) {

        if (this._deck[id].show || this._game.lost || this._game.locked){
            return;
        }
        this._deck[id].show = true;
        this._game.turns += 1;
        if (this._status.length == 2){
            if (this._status[0].image != this._status[1].image){            
                this._status[0].show = false;
                this._status[1].show = false;
            }   
            this._status=[];
        }
        this._status.push(this._deck[id]);

        let ende = 0;
        for (let i = 0; i < this._deck.length; i++){
            if (this._deck[i].show == false){
                ende = ende + 1;
            } 
        }
        if (ende == 0){
            this._game.won = true;
            if (this._timeout != null){
                clearTimeout(this._timeout);
            }
         this._game.endTime = new Date();
        }
        if (this._game.difficulty == "hard" && this._game.turns > 90 && this._game.won == false){
            this._game.lost = true;
        }
    }

    /**
     *
     */
    resetGame() {
    }
}