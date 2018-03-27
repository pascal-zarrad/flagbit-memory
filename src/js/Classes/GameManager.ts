export default class GameManager {

    private _deck: any[];
    private _game: any;
    private _status: any;
    private _timeout: number|null;

    // noinspection JSMethodCanBeStatic
    get features() {
        return 'full';
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
        this._status = {choice: []};
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

        if (difficulty === 'hard') this._timeout = setTimeout(() => { this._looseGame() }, 60000);
        this._shuffleDeck();
        return true;
    }

    /**
     * Creates a new deck with the difficulty of _game
     * @private
     */
    _shuffleDeck() {
        this._deck = [];
        let size       = this._game.difficulty === 'easy' ? 16:36,
            multiplier = (size / 2) - 1;

        for (let i = 0; i < size; i++) {
            let rand = this._getRandomNumber(multiplier);

            this._deck.push({id: i, image: rand, show: false});
        }
    }

    /**
     * Creates a new random number which occurs at maximum twice in _deck
     *
     * @param max
     * @private
     */
    _getRandomNumber(max: number) {
        let tries = 0;
        loop: while (tries < 256) {
            let rand  = Math.round(Math.random() * max),
                count = 0;
            tries++;

            for (let i = 0; i < this._deck.length; i++) {
                if (this._deck[i].image === rand) {
                    count++;
                    if (count === 2) continue loop;
                }
            }

            return rand;
        }
        alert('Unable to generate random number');
        throw 'Random too many retries: ' + tries;
    }

    /**
     * Is triggered when the user clicks on a card
     * Shows the card and hides other cards if necessary
     *
     * @param id
     */
    showCard(id: number) {
        if (this._deck[id].show || this.game.locked) return;
        this._game.turns++;
        let card = this._deck[id];

        if (this._status.choice.length === 2) {
            let [card1, card2] = this._status.choice;
            if(card1.image !== card2.image) {
                card1.show = false;
                card2.show = false;
            }
            this._status.choice = [];
        }

        card.show = true;
        this._status.choice.push(card);

        this._checkIfGameFinished()
    }

    /**
     *
     */
    resetGame() {
        this._deck = [];
        this._status = {choice: []};
        this._game = {difficulty: null, startTime: null, endTime: null, turns: 0, started: false, won: false, lost: false, locked: false};
    }

    /**
     * Checks if the game is finished and acts accordingly
     *
     * @returns {boolean}
     */
    _checkIfGameFinished() {
        let allCardsVisible = true;
        for (let i = 0; i < this._deck.length; i++) {
            if (this._deck[i].show === false) {
                allCardsVisible = false;
                break;
            }
        }
        if (allCardsVisible) {
            this._winGame();
        } else if (this._game.difficulty === 'hard' && this._game.turns > 90) {
            this._looseGame();
        }
    }

    /**
     *
     * @private
     */
    _winGame() {
        if (this._game.lost) return;
        this._endGame();
        this._game.won = true;
    }

    /**
     *
     * @private
     */
    _looseGame() {
        if (this._game.won) return;
        this._endGame();
        this._game.lost = true;
    }

    /**
     *
     * @private
     */
    _endGame() {
        if (this._timeout) clearTimeout(this._timeout);
        this._game.endTime = new Date();
    }
}