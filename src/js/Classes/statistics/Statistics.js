define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Statistics = /** @class */ (function () {
        function Statistics(game) {
            this.game = game;
        }
        return Statistics;
    }());
    exports.Statistics = Statistics;
    var Game = /** @class */ (function () {
        function Game(users, winner, difficulty) {
            this.users = users;
            this.winner = winner;
            this.difficulty = difficulty;
        }
        return Game;
    }());
    exports.Game = Game;
    var User = /** @class */ (function () {
        function User(username, timeRequired, turns, winner) {
            this.username = username;
            this.timeRequired = timeRequired;
            this.turns = turns;
            this.winner = winner;
        }
        return User;
    }());
    exports.User = User;
    var ResponseError = /** @class */ (function () {
        function ResponseError(errorCode, errorMessage) {
            this.errorCode = errorCode;
            this.errorMessage = errorMessage;
        }
        return ResponseError;
    }());
    exports.ResponseError = ResponseError;
});
