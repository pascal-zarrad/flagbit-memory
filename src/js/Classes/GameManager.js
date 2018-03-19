define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var GameManager = /** @class */ (function () {
        function GameManager() {
            this._deck = [];
            this._status = { choice: [] };
            this._timeout = null;
            this._game = { startTime: null, endTime: null, turns: 0, started: false, won: false, lost: false, locked: false };
        }
        Object.defineProperty(GameManager.prototype, "deck", {
            get: function () {
                return this._deck;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameManager.prototype, "game", {
            get: function () {
                return this._game;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameManager.prototype, "timeout", {
            get: function () {
                return this._timeout;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameManager.prototype, "status", {
            get: function () {
                return this._status;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Initializes the _game and creates a new _deck with the given difficulty
         *
         * @param difficulty
         * @param user
         */
        GameManager.prototype.startGame = function (difficulty, user) {
            var _this = this;
            this._game = {
                difficulty: difficulty,
                startTime: new Date(),
                endTime: null,
                won: false,
                lost: false,
                started: true,
                locked: false,
                turns: 0
            };
            if (difficulty === 'hard')
                this._timeout = setTimeout(function () { _this._looseGame(); }, 60000);
            this._shuffleDeck();
            return true;
        };
        /**
         * Creates a new deck with the  difficulty of _game
         * @private
         */
        GameManager.prototype._shuffleDeck = function () {
            this._deck = [];
            var size = this._game.difficulty === 'easy' ? 16 : 36, multiplier = (size / 2) - 1;
            for (var i = 0; i < size; i++) {
                var rand = this._getRandomNumber(multiplier);
                this._deck.push({ id: i, image: rand, show: false });
            }
        };
        /**
         * Creates a new random number which occurs at maximum twice in _deck
         *
         * @param max
         * @private
         */
        GameManager.prototype._getRandomNumber = function (max) {
            var tries = 0;
            loop: while (tries < 100) {
                var rand = Math.round(Math.random() * max), count = 0;
                tries++;
                for (var i = 0; i < this._deck.length; i++) {
                    if (this._deck[i].image === rand) {
                        count++;
                        if (count === 2)
                            continue loop;
                    }
                }
                return rand;
            }
            alert('Unable to generate random number');
            throw 'Random too many retries: ' + tries;
        };
        /**
         * Is triggered when the user clicks on a card
         * Shows the card and hides other cards if necessary
         *
         * @param id
         */
        GameManager.prototype.showCard = function (id) {
            if (this._deck[id].show)
                return;
            this._game.turns++;
            this._deck[id].show = true;
            if (this._status.choice.length === 0) {
                this._status.choice = [id];
            }
            else if (this._status.choice.length === 1) {
                var cardId = this._status.choice[0];
                this._status.choice.push(id);
                if (this._deck[cardId].image === this._deck[id].image) {
                    this._status.choice = [];
                }
            }
            else {
                for (var i in this._status.choice) {
                    var cardId = this._status.choice[i];
                    this._deck[cardId].show = false;
                }
                this._status.choice = [id];
            }
            this._checkIfGameFinished();
        };
        /**
         *
         */
        GameManager.prototype.resetGame = function () {
            this._deck = [];
            this._game = { startTime: null, endTime: null, turns: 0, started: false, won: false, lost: false, locked: false };
        };
        /**
         * Checks if the game is finished and acts accordingly
         *
         * @returns {boolean}
         */
        GameManager.prototype._checkIfGameFinished = function () {
            var allCardsVisible = true;
            for (var i = 0; i < this._deck.length; i++) {
                if (this._deck[i].show === false)
                    allCardsVisible = false;
            }
            if (allCardsVisible) {
                this._winGame();
            }
            else if (this._game.difficulty === 'hard' && this._game.turns >= 90) {
                this._looseGame();
            }
        };
        /**
         *
         * @private
         */
        GameManager.prototype._winGame = function () {
            if (this._game.lost)
                return;
            this._endGame();
            this._game.won = true;
        };
        /**
         *
         * @private
         */
        GameManager.prototype._looseGame = function () {
            if (this._game.won)
                return;
            this._endGame();
            this._game.lost = true;
        };
        /**
         *
         * @private
         */
        GameManager.prototype._endGame = function () {
            if (this._timeout)
                clearTimeout(this._timeout);
            this._game.endTime = new Date();
        };
        return GameManager;
    }());
    exports.default = GameManager;
});
