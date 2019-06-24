define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Packet = /** @class */ (function () {
        function Packet(gameID, clientID, packetID, clients) {
            this.gameID = gameID;
            this.clientID = clientID;
            this.packetID = packetID;
            this.clients = clients;
        }
        return Packet;
    }());
    exports.default = Packet;
    /**
     * The different available packets and their ID.
     */
    var Packets;
    (function (Packets) {
        Packets[Packets["SIGNAL_MP"] = 0] = "SIGNAL_MP";
        Packets[Packets["SHARE_CLIENTS"] = 1] = "SHARE_CLIENTS";
        Packets[Packets["START_GAME"] = 2] = "START_GAME";
        Packets[Packets["LOST_GAME"] = 3] = "LOST_GAME";
        Packets[Packets["SHARE_STATISTICS"] = 4] = "SHARE_STATISTICS";
    })(Packets = exports.Packets || (exports.Packets = {}));
});
