define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    /**
     * A abstract packet handler that provides the structure of a packet handler
     */
    var PacketHandler = /** @class */ (function () {
        function PacketHandler(packetID, handleOnlyTargeted, gameManager) {
            this._packetID = packetID;
            this._handleOnlyTargeted = handleOnlyTargeted;
            this._gameManager = gameManager;
        }
        Object.defineProperty(PacketHandler.prototype, "packetID", {
            get: function () {
                return this._packetID;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PacketHandler.prototype, "handleOnlyTargeted", {
            get: function () {
                return this._handleOnlyTargeted;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PacketHandler.prototype, "gameManager", {
            get: function () {
                return this._gameManager;
            },
            enumerable: true,
            configurable: true
        });
        return PacketHandler;
    }());
    exports.default = PacketHandler;
});
