import {Game, ResponseError, Statistics, User} from "./Statistics";
import GameManager from "../GameManager";
import CLIENT_CONFIG from "../../config.client";

/**
 * Manages the statistics of the game.
 * Requests the current high scores over AJAX.
 * If the client has won the game, the statistics manager is used to send
 * the statistics to using AJAX.
 * The host to which the requests are sent, is defined in the config.client.ts,
 * that is located in the sources root directory.
 */
export default class StatisticsManager {

    constructor() {
        this.requestHighScores();
    }

    /**
     * The statistics of the last completed game, if this client has won
     */
    private _currentStatistics: Statistics | undefined = undefined;

    get currentStatistics(): Statistics | undefined {
        return this._currentStatistics;
    }

    set currentStatistics(value: Statistics | undefined) {
        this._currentStatistics = value;
    }

    /**
     * The GameManager that owns this StatisticsManager
     */
    private _gameManager: GameManager | undefined = undefined;

    get gameManager(): GameManager | undefined {
        return this._gameManager;
    }

    set gameManager(value: GameManager | undefined) {
        this._gameManager = value;
    }

    /**
     * The statistics that are displayed in the high score leader board
     */
    private _highscoreStatistics: Statistics = new Statistics([
        new Game([new User("Not available", 0, 0, true)], "Not available", "easy"),
        new Game([new User("Not available", 0, 0, true)], "Not available", "normal"),
        new Game([new User("Not available", 0, 0, true)], "Not available", "hard")
    ]);

    get highscoreStatistics(): Statistics {
        return this._highscoreStatistics;
    }

    /**
     * Serializes a Statistics object into a JSON string and then encodes it into Base64.
     * The Base64-string can be applied as a GET-parameter to an URL.
     * A false as return value indicates a failed serialization.
     *
     * @param statistics
     * @private
     * @returns string | boolean
     */
    private static _serializeStatistics(statistics: Statistics): string | boolean {
        let statisticsJSON = JSON.stringify(statistics);
        if (!statisticsJSON) {
            return false;
        }
        return statisticsJSON;

    }

    /**
     * Deserialize a JSON string to get a Object with which can be worked.
     * A false as return value indicates a failed deserialization
     *
     * @param statisticsJSON
     */
    private static _deserializeStatistics(statisticsJSON: string): Statistics | boolean {
        let statistics = <Statistics>JSON.parse(statisticsJSON);
        if (!statistics) {
            return false;
        } else {
            return statistics;
        }
    }

    /**
     * Send statistics of a game to the statistics REST API
     *
     * @param statistics
     */
    public sendStatistics(statistics: Statistics): boolean {
        let statsData = StatisticsManager._serializeStatistics(statistics);
        if (!statsData) {
            console.error("Statistics: Failed to serialize statistics to prepare them for send!");
            return false;
        }
        let ajaxURL = CLIENT_CONFIG.AJAX_URL + "/add";
        let ajax: XMLHttpRequest = new XMLHttpRequest();
        ajax.onreadystatechange = () => {
            if (ajax.readyState === XMLHttpRequest.DONE) {
                switch (ajax.status) {
                    case 201:
                        console.log("Statistics: Received HTTP-Response code 201. A Statistics add operation was successful!");
                        break;
                    case 400:
                        let responseError: ResponseError = <ResponseError>JSON.parse(ajax.responseText);
                        if (!responseError) {
                            console.error("Statistics: An error occurred when processing a response containing an error!");
                        } else {
                            console.error("Statistics: An error occurred while processing a statistics request. Error code: " + responseError.errorCode + " - " + responseError.errorMessage);
                        }
                        break;
                    default:
                        break; // Do nothing, ignore response
                }
            }
        };
        ajax.open('POST', ajaxURL);
        ajax.send(statsData);
        console.log("Statistics: Send add request!");
        return true;
    }

    /**
     * Requests the HighScores from the Statistics REST API.
     */
    public requestHighScores() {
        console.log("Statistics: Requesting highscores...");
        let ajaxURL = CLIENT_CONFIG.AJAX_URL + "/highscores";
        let ajax = new XMLHttpRequest();
        ajax.onreadystatechange = () => {
            if (ajax.readyState === XMLHttpRequest.DONE) {
                switch (ajax.status) {
                    case 200:
                        console.log("Statistics: Received statistics, processing them...");
                        this.processReceivedStatistics(ajax.responseText);
                        break;
                    case 400:
                        let responseError: ResponseError = <ResponseError>JSON.parse(ajax.responseText);
                        if (!responseError) {
                            console.error("Statistics: An error occurred when processing a response containing an error!");
                        } else {
                            console.error("Statistics: An error occurred while processing a statistics request. Error code: " + responseError.errorCode + " - " + responseError.errorMessage);
                        }
                        break;
                    default:
                        break; // Do nothing, ignore response
                }
            }
        };
        ajax.open("GET", ajaxURL);
        ajax.send();
        console.log("Statistics: Requested highscores!");
    }

    /**
     * Processes a received statistics element
     *
     * @param response
     */
    public processReceivedStatistics(response: string) {
        let statistics = StatisticsManager._deserializeStatistics(response);
        if (!statistics) {
            console.error("Statistics: Failed to process received statistics!");
            return;
        }
        statistics = <Statistics>statistics;
        this._highscoreStatistics = statistics;
    }

}
