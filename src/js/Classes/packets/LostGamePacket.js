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
define(["require", "exports", "./Packet"], function (require, exports, Packet_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    Packet_1 = __importDefault(Packet_1);
    /**
     * A packet that indicates that the players that are
     * in the scope of this packet (gameID & client[])
     * have lost the game.
     */
    var LostGamePacket = /** @class */ (function (_super) {
        __extends(LostGamePacket, _super);
        function LostGamePacket(gameID, clientID, clients) {
            return _super.call(this, gameID, clientID, Packet_1.Packets.LOST_GAME, clients) || this;
        }
        return LostGamePacket;
    }(Packet_1.default));
    exports.default = LostGamePacket;
});
