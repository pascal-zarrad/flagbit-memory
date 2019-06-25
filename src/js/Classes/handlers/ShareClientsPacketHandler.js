var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
define(["require", "exports", "./PacketHandler", "../packets/Packet"], function (require, exports, PacketHandler_1, Packet_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    PacketHandler_1 = __importDefault(PacketHandler_1);
    /**
     * Hanles ShareClientsPacket's
     */
    var ShareClientsPacketHandler = /** @class */ (function (_super) {
        __extends(ShareClientsPacketHandler, _super);
        function ShareClientsPacketHandler(gameManager) {
            return _super.call(this, Packet_1.Packets.SHARE_CLIENTS, true, gameManager) || this;
        }
        ShareClientsPacketHandler.prototype.handle = function (packet) {
            var shareClientsPacket = packet;
            this.gameManager.socketManager.clients = packet.clients;
            this.gameManager.socketManager.clientUser = shareClientsPacket.clientsUser;
        };
        return ShareClientsPacketHandler;
    }(PacketHandler_1.default));
    exports.default = ShareClientsPacketHandler;
});
