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
define(["require", "exports", "./PacketHandler", "../packets/Packet", "../statistics/Statistics"], function (require, exports, PacketHandler_1, Packet_1, Statistics_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    PacketHandler_1 = __importDefault(PacketHandler_1);
    /**
     * Handles ShareStatisticsPackets
     */
    var ShareStatisticsPacketHandler = /** @class */ (function (_super) {
        __extends(ShareStatisticsPacketHandler, _super);

        function ShareStatisticsPacketHandler(gameManager) {
            return _super.call(this, Packet_1.Packets.SHARE_STATISTICS, true, gameManager) || this;
        }

        ShareStatisticsPacketHandler.prototype.handle = function (packet) {
            if (this.gameManager.socketManager.currentGameID === packet.gameID) {
                var shareStatisticsPacket = packet;
                if (typeof this.gameManager.statsManager.currentStatistics !== "undefined") {
                    var time = shareStatisticsPacket.timeRequired;
                    this.gameManager.statsManager.currentStatistics.game[0].users.push(new Statistics_1.User(shareStatisticsPacket.user, time, shareStatisticsPacket.turns, false));
                }
            }
        };
        return ShareStatisticsPacketHandler;
    }(PacketHandler_1.default));
    exports.default = ShareStatisticsPacketHandler;
});
