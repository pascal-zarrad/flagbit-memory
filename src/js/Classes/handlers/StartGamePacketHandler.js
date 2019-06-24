var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({__proto__: []} instanceof Array && function (d, b) {
            d.__proto__ = b;
        }) ||
        function (d, b) {
            for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        };
    return function (d, b) {
        extendStatics(d, b);

        function __() {
            this.constructor = d;
        }

        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : {"default": mod};
};
define(["require", "exports", "./PacketHandler", "../packets/Packet", "../packets/SignalMPPacket"], function (require, exports, PacketHandler_1, Packet_1, SignalMPPacket_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    PacketHandler_1 = __importDefault(PacketHandler_1);
    SignalMPPacket_1 = __importDefault(SignalMPPacket_1);
    var StartGamePacketHandler = /** @class */ (function (_super) {
        __extends(StartGamePacketHandler, _super);

        function StartGamePacketHandler(gameManager) {
            return _super.call(this, Packet_1.Packets.START_GAME, false, gameManager) || this;
        }

        StartGamePacketHandler.prototype.handle = function (packet) {
            if (typeof this.gameManager.socketManager.currentGameID === "undefined" && !this.gameManager.game.started) {
                var userNameField = document.getElementById('game-user');
                if (userNameField == null) {
                    return;
                }
                if (userNameField.value.length < 3) {
                    return;
                }
                var startGamePacket = packet;
                // Set gameID
                this.gameManager.socketManager.currentGameID = packet.gameID;
                // Regenerate clientID
                this.gameManager.socketManager.regenerateClientID();
                // Set deck
                if (typeof startGamePacket.deck !== "undefined") {
                    this.gameManager.deck = startGamePacket.deck;
                }
                // Signal the host that this client joined the match
                this.gameManager.socketManager.sendPacket(new SignalMPPacket_1.default(startGamePacket.gameID, this.gameManager.socketManager.ownClientID, [], startGamePacket.clientID, this.gameManager.user));
                // Simulate start button click, to start game without user interaction
                var button = document.getElementsByTagName("button")[0];
                if (typeof button !== "undefined") {
                    button.click();
                }
                this.gameManager.game.difficulty = startGamePacket.difficulty;
            }
        };
        return StartGamePacketHandler;
    }(PacketHandler_1.default));
    exports.default = StartGamePacketHandler;
});
