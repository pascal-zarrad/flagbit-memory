var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
define(["require", "exports", "./Statistics", "../../config.client"], function (require, exports, Statistics_1, config_client_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    config_client_1 = __importDefault(config_client_1);
    var StatisticsManager = /** @class */ (function () {
        function StatisticsManager() {
            var _this = this;
            this._currentStatistics = undefined;
            this._gameManager = undefined;
            this._highscoreStatistics = new Statistics_1.Statistics([
                new Statistics_1.Game([new Statistics_1.User("Not available", 0, 0, true)], "Not available", "easy"),
                new Statistics_1.Game([new Statistics_1.User("Not available", 0, 0, true)], "Not available", "normal"),
                new Statistics_1.Game([new Statistics_1.User("Not available", 0, 0, true)], "Not available", "hard")
            ]);
            /**
             * Handles received AJAX responses on requests
             *
             * @private
             */
            this._ajaxResponseHandler = function () {
                if (_this._ajax.readyState === XMLHttpRequest.DONE) {
                    switch (_this._ajax.status) {
                        case 200:
                            console.log("Statistics: Received statistics, processing them...");
                            _this.processReceivedStatistics(_this._ajax.responseText);
                            break;
                        case 201:
                            console.log("Statistics: Received HTTP-Response code 201. A Statistics add operation was successful!");
                            break;
                        case 400:
                            var responseError = JSON.parse(_this._ajax.responseText);
                            if (!responseError) {
                                console.error("Statistics: An error occurred when processing a response containing an error!");
                            }
                            else {
                                console.error("Statistics: An error occurred while processing a statistics request. Error code: " + responseError.errorCode + " - " + responseError.errorMessage);
                            }
                            break;
                        default:
                            break; // Do nothing, ignore response
                    }
                }
            };
            this._ajax = new XMLHttpRequest();
            this._ajax.onreadystatechange = this._ajaxResponseHandler;
            this.requestHighScores();
        }
        Object.defineProperty(StatisticsManager.prototype, "currentStatistics", {
            get: function () {
                return this._currentStatistics;
            },
            set: function (value) {
                this._currentStatistics = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StatisticsManager.prototype, "gameManager", {
            get: function () {
                return this._gameManager;
            },
            set: function (value) {
                this._gameManager = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StatisticsManager.prototype, "highscoreStatistics", {
            get: function () {
                return this._highscoreStatistics;
            },
            enumerable: true,
            configurable: true
        });
        // ---- Statistics serialization
        /**
         * Send statistics of a game to the statistics REST API
         *
         * @param statistics
         */
        StatisticsManager.prototype.sendStatistics = function (statistics) {
            var statsData = this._serializeStatistics(statistics);
            if (!statsData) {
                console.error("Statistics: Failed to serialize statistics to prepare them for send!");
                return false;
            }
            var ajaxURL = config_client_1.default.AJAX_URL + "/add";
            console.log(ajaxURL);
            this._ajax.open('POST', ajaxURL);
            this._ajax.send(statsData);
            console.log("Statistics: Send add request!");
            return true;
        };
        /**
         * Requests the HighScores from the Statistics REST API.
         */
        StatisticsManager.prototype.requestHighScores = function () {
            console.log("Statistics: Requesting highscores...");
            var ajaxURL = config_client_1.default.AJAX_URL + "/highscores";
            this._ajax.open("GET", ajaxURL);
            this._ajax.send();
            console.log("Statistics: Requested highscores!");
        };
        // ---- Send and receive statistics
        /**
         * Processes a received statistics element
         *
         * @param response
         */
        StatisticsManager.prototype.processReceivedStatistics = function (response) {
            var statistics = this._deserializeStatistics(response);
            if (!statistics) {
                console.error("Statistics: Failed to process received statistics!");
                return;
            }
            statistics = statistics;
            this._highscoreStatistics = statistics;
        };
        /**
         * Serializes a Statistics object into a JSON string and then encodes it into Base64.
         * The Base64-string can be applied as a GET-parameter to an URL.
         * A false as return value indicates a failed serialization.
         *
         * @param statistics
         * @private
         * @returns string | boolean
         */
        StatisticsManager.prototype._serializeStatistics = function (statistics) {
            var statisticsJSON = JSON.stringify(statistics);
            if (!statisticsJSON) {
                return false;
            }
            return statisticsJSON;
        };
        /**
         * Deserialize a JSON string to get a Object with which can be worked.
         * A false as return value indicates a failed deserialization
         *
         * @param statisticsJSON
         */
        StatisticsManager.prototype._deserializeStatistics = function (statisticsJSON) {
            var statistics = JSON.parse(statisticsJSON);
            if (!statistics) {
                return false;
            }
            else {
                return statistics;
            }
        };
        return StatisticsManager;
    }());
    exports.default = StatisticsManager;
});
