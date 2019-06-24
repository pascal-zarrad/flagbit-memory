define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CLIENT_CONFIG = {
        AJAX_URL: "http://localhost:8081/stats",
        WEBSOCKET: "ws://localhost:8080"
    };
    exports.default = CLIENT_CONFIG;
});
