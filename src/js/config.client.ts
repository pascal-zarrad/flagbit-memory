/*

    Configuration of the Flagbit Memory client

    Change the below values of the CLIENT_CONFIG constant to fit your needs.
    To change the configuration of the websocket server, refer to config.server.js

    IMPORTANT:
    You have to recompile the project using 'npm run build' to enable the changed values.

 */

/**
 * Defines the variables that are available for configuration.
 */
interface CLIENT_CONFIGURATION {
    AJAX_URL: string,
    WEBSOCKET: string
}

/**
 * The configuration itself.
 * Change the values below to fit your needs!
 */
const CLIENT_CONFIG: CLIENT_CONFIGURATION = {
    AJAX_URL: "http://localhost:8081/stats",
    WEBSOCKET: "ws://localhost:8080"
};

/**
 * Export the config to make it available in other classes.
 */
export default CLIENT_CONFIG;