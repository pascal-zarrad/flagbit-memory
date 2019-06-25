import {SocketManager} from "./SocketManager";
import StartGamePacket from "./packets/StartGamePacket";
import StartGamePacketHandler from "./handlers/StartGamePacketHandler";
import {SignalMPPacketHandler} from "./handlers/SignalMPPacketHandler";
import ShareClientsPacketHandler from "./handlers/ShareClientsPacketHandler";
import LostGamePacket from "./packets/LostGamePacket";
import LostGamePacketHandler from "./handlers/LostGamePacketHandler";
import StatisticsManager from "./statistics/StatisticsManager";
import ShareStatisticsPacketHandler from "./handlers/ShareStatisticsPacketHandler";
import {Game, Statistics, User} from "./statistics/Statistics";
import ShareStatisticsPacket from "./packets/ShareStatisticsPacket";

/**
 * Shapes the _game field of the GameManager
 * by providing type annotations to its values.
 */
export interface CurrentGame {
    difficulty: string | null,
    startTime: Date | null,
    endTime: Date | null,
    turns: number,
    started: boolean,
    won: boolean,
    lost: boolean,
    locked: boolean
}

/**
 * Manages the logic of the game.
 * Also is responsible for the initialization of the SocketManager and StatisticsManager
 * to provide multi player and statistics.
 */
export default class GameManager {

    /**
     * The SocketManager that handles the multi player of the game
     */
    private readonly _socketManager: SocketManager;

    /**
     * The statistics manager that handles the processing of the high score
     * and data collection
     */
    private readonly _statsManager: StatisticsManager = new StatisticsManager();

    private readonly _status: any;

    private readonly _timeout: number | null;

    constructor() {
        this._socketManager = new SocketManager();
        this._statsManager.gameManager = this;
        this._registerHandlers();
        this._deck = [];
        this._status = {};
        this._timeout = null;
        this._game = {
            difficulty: null,
            startTime: null,
            endTime: null,
            turns: 0,
            started: false,
            won: false,
            lost: false,
            locked: false
        };
        this._openCards = [-1, -1];
    }

    /**
     * Stores the running game
     */
    private _game: CurrentGame;

    get game(): CurrentGame {
        return this._game;
    }

    set game(game: CurrentGame) {
        this._game = game;
    }

    /**
     * The name that the current player does have
     */
    private _user: string = "";

    get user(): string {
        return this._user;
    }

    /**
     * An array that contains the cards that the player has currently opened
     */
    private _openCards: number[];

    get openCards(): number[] {
        return this._openCards;
    }

    set openCards(openCards: number[]) {
        this._openCards = openCards;
    }

    get status(): any {
        return this._status;
    }

    private _deck: any[];

    get deck() {
        return this._deck;
    }

    set deck(deck: any[]) {
        this._deck = deck;
    }

    get timeout() {
        return this._timeout;
    }

    get statsManager(): StatisticsManager {
        return this._statsManager;
    }

    // noinspection JSMethodCanBeStatic
    get features() {
        return 'full';
    }

    public get socketManager(): SocketManager {
        return this._socketManager;
    }

    /**
     * Initializes the _game and creates a new _deck with the given difficulty
     *
     * @param difficulty
     * @param user
     */
    startGame(difficulty: string, user: string) {
        if (this._game.started) {
            return;
        }
        this.statsManager.requestHighScores();
        // Set game difficulty
        this._game.difficulty = difficulty;
        // Reset start parameters
        this._game.startTime = new Date();
        this._game.endTime = null;
        this._game.won = false;
        this._game.lost = false;
        this._game.locked = false;
        this._game.turns = 0;
        this._user = user;
        this._socketManager.regenerateClientID();
        this.statsManager.currentStatistics = new Statistics([new Game([], "", <string>this.game.difficulty)]);
        if (typeof this._socketManager.currentGameID === "undefined") {
            this._shuffleDeck();
            this._socketManager.regenerateGameID();
            if (this._socketManager.isConnectionValid()) {
                this._socketManager.sendPacket(new StartGamePacket(typeof this._socketManager.currentGameID === "undefined" ? "" : this._socketManager.currentGameID, this._socketManager.ownClientID, [], this._deck, this._game.difficulty));
            }
        }
        if (typeof this._deck === "undefined" || this._deck.length < 1) {
            this._shuffleDeck();
        }
        this._game.started = true;
        return true;
    }

    /**
     * Creates a new deck with the difficulty of _game
     * @private
     */
    _shuffleDeck() {
        let iMax: number = 16;
        switch (this._game.difficulty) {
            case 'hard':
                iMax = 36;
                break;
            case 'normal':
                iMax = 36;
                break;
            default:
                iMax = 16;
                break;
        }
        this.deck = [];
        for (let i: number = 0; i < iMax; i++) {
            this._deck.push({id: i, image: this._getRandomNumber((iMax / 2 - 1)), show: false});
        }
    }

    /**
     * Creates a new random number which occurs at maximum twice in _deck
     *
     * @param max
     * @private
     */
    _getRandomNumber(max: number) {
        let randomNumber: number = -1;
        do {
            randomNumber = Math.round(Math.random() * max);
        } while (!this._preventThirdSibling(randomNumber));
        return randomNumber;
    }

    /**
     * Prevent the generation of a third sibling of an image in the deck
     *
     * @param image
     *
     * @private
     */
    _preventThirdSibling(image: number): boolean {
        return this._deck.filter((currentValue) => currentValue.image === image).reduce((acc, currentValue) => acc += 1, 0) < 2;
    }

    /**
     * Get the card from the deck with the given id
     *
     * @param id
     *
     * @private
     */
    _getCardByID(id: number) {
        let results: any[] = this._deck.filter((currentValue) => currentValue.id === id);
        return results[0] === undefined ? null : results[0];
    }

    /**
     * Checks if the player has won the game by inspecting the show status of all cards in the deck
     *
     * @private
     */
    _checkWin() {
        for (let i = 0; i < this._deck.length; i++) {
            if (this._deck[i].show === false) {
                return false;
            }
        }
        return true;
    }

    /**
     * Is triggered when the user clicks on a card
     * Shows the card and hides other cards if necessary
     *
     * @param id
     */
    showCard(id: number) {
        let card = this._getCardByID(id);
        // Check if the clicked card is already shown or open
        if (this._openCards[0] !== id && this._openCards[1] !== id && card.show === false) {
            switch (true) {
                // When two wrong cards are open and a third one is being opened, close the wrong ones and open the third one
                case this._openCards[0] !== -1 && this._openCards[1] !== -1:
                    this._deck[this._openCards[0]].show = false;
                    this._deck[this._openCards[1]].show = false;
                    this._openCards[0] = id;
                    this._openCards[1] = -1;
                    this._game.turns++;
                    this._deck[id].show = true;
                    break;
                // When one card is opened, open the new card
                case this._openCards[0] !== -1:
                    this._openCards[1] = id;
                    this._deck[id].show = true;
                    this._game.turns++;
                    let card2 = this._getCardByID(this._openCards[0]);
                    if (card2 !== null && card2.image === card.image) {
                        this._openCards[0] = -1;
                        this._openCards[1] = -1;
                    }
                    break;
                // When no card is open, open the card
                default:
                    this._openCards[0] = id;
                    this._deck[id].show = true;
                    this._game.turns++;
                    break;
            }
        }
        if (this.game.difficulty === 'hard' && this._game.turns >= 90) {
            this.lostGame();
        }
        // Check if the user has got all cards and trigger the game won scenario
        if (this._checkWin()) {
            this._game.won = true;
            this._game.endTime = new Date();
            let time = this.getTimeRequiredInSeconds();
            if (typeof time === "boolean") {
                return; // Return. Winner can't calculate stats, so continuing with statistics collection makes no sense
            }
            if (this.game.difficulty === null) {
                return; // Difficulty not set, can't calculate stats. Some problem like in time.
            }
            let winnerUser = new User(this.user, <number>time, this.game.turns, true);
            if ('undefined' !== typeof this.statsManager.currentStatistics) {
                this.statsManager.currentStatistics.game[0].winner = winnerUser.username;
                this.statsManager.currentStatistics.game[0].difficulty = this.game.difficulty;
                this.statsManager.currentStatistics.game[0].users.push(winnerUser);
            }
            // Send statistics
            // Sending them 0.5 seconds after Game finish.
            // It should never take more than 0.5 seconds to answer with their stats for online clients
            setTimeout(() => {
                if (typeof this._statsManager.currentStatistics !== "undefined") {
                    this._statsManager.sendStatistics(<Statistics>this.statsManager.currentStatistics);
                }
            }, 500);
            if (this._socketManager.isConnectionValid()) {
                this._socketManager.sendPacket(new LostGamePacket((typeof this._socketManager.currentGameID !== "undefined" ? this._socketManager.currentGameID : ""), this._socketManager.ownClientID, this._socketManager.clients));
            }
        }
    }

    /**
     * Called when the player has lost the game
     */
    lostGame() {
        this._game.lost = true;
        this._game.endTime = new Date();
        let time = this.getTimeRequiredInSeconds();
        if (typeof time === "boolean") {
            return;
        }
        this.openCards[0] = -1;
        this.openCards[1] = -1;
        this.socketManager.sendPacket(new ShareStatisticsPacket(typeof this.socketManager.currentGameID === "undefined" ? "" : this.socketManager.currentGameID, this.socketManager.ownClientID, this.socketManager.clients, this.user, this.game.turns, <number>time));
        if (this._game.difficulty === 'hard') {
            if (typeof this.statsManager.currentStatistics !== 'undefined' && (this.socketManager.clients.length - this.statsManager.currentStatistics.game[0].users.length) <= 1) {
                this._game.endTime = new Date();
                let time = this.getTimeRequiredInSeconds();
                if (typeof time === "boolean") {
                    return; // Return. Winner can't calculate stats, so continuing with statistics collection makes no sense
                }
                let lastLooser = new User(this.user, <number>time, this.game.turns, false);
                this.statsManager.currentStatistics.game[0].winner = '';
                this.statsManager.currentStatistics.game[0].difficulty = this._game.difficulty;
                this.statsManager.currentStatistics.game[0].users.push(lastLooser);
                this._statsManager.sendStatistics(<Statistics>this.statsManager.currentStatistics); // As it seems that all users have lost, this client sends the statistics.
            }
        }
        this._socketManager.endNetworkGame();
    }

    /**
     * Reset the game
     */
    resetGame() {
        this.statsManager.requestHighScores();
        this._deck = [];
        this._game = {
            difficulty: null,
            startTime: null,
            endTime: null,
            turns: 0,
            started: false,
            won: false,
            lost: false,
            locked: false
        };
        this._socketManager.endNetworkGame();
    }

    /**
     * Calculates the time the user has required to complete the memory.
     */
    getTimeRequiredInSeconds(): number | boolean {
        if (this.game.endTime !== null && this.game.startTime !== null) {
            return Math.abs((this.game.endTime.getTime() - this.game.startTime.getTime()) / 1000);
        } else {
            return false;
        }
    }

    /**
     * Registers all required PacketHandlers
     *
     * @private
     */
    private _registerHandlers(): void {
        // Register handler to handle the game start
        this._socketManager.registerPacketHandler(new StartGamePacketHandler(this));
        // Register handler to handle SignalMP Packets, that signal a player in the current match
        this._socketManager.registerPacketHandler(new SignalMPPacketHandler(this));
        // Register handler to handle the share of all clients of the match
        this._socketManager.registerPacketHandler(new ShareClientsPacketHandler(this));
        // Register handler to handle a lost game
        this._socketManager.registerPacketHandler(new LostGamePacketHandler(this));
        // Register handler to handle the income of statistics
        this._socketManager.registerPacketHandler(new ShareStatisticsPacketHandler(this));
    }
}