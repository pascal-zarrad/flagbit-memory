/*

    Configuration of the Flagbit Memory client

    Change the below values of the CLIENT_CONFIG constant to fit your needs.
    To change the configuration of the websocket server, refer to config.server.js

    IMPORTANT:
    You have to recompile the project using 'npm run build' to enable the changed values.

 */
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * The configuration itself.
     * Change the values below to fit your needs!
     */
    var CLIENT_CONFIG = {
        AJAX_URL: "http://localhost:8081/stats",
        WEBSOCKET: "ws://localhost:8080"
    };
    /**
     * Export the config to make it available in other classes.
     */
    exports.default = CLIENT_CONFIG;
});
