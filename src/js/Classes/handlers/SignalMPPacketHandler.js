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
define(["require", "exports", "./PacketHandler", "../packets/Packet", "../packets/ShareClientsPacket"], function (require, exports, PacketHandler_1, Packet_1, ShareClientsPacket_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    PacketHandler_1 = __importDefault(PacketHandler_1);
    ShareClientsPacket_1 = __importDefault(ShareClientsPacket_1);
    var SignalMPPacketHandler = /** @class */ (function (_super) {
        __extends(SignalMPPacketHandler, _super);
        function SignalMPPacketHandler(gameManager) {
            return _super.call(this, Packet_1.Packets.SIGNAL_MP, true, gameManager) || this;
        }
        SignalMPPacketHandler.prototype.handle = function (packet) {
            var signalMPPacket = packet;
            if (this.gameManager.socketManager.ownClientID === signalMPPacket.receiver) {
                this.gameManager.socketManager.addClient(signalMPPacket.clientID);
                this.gameManager.socketManager.clientUser.push({
                    client: signalMPPacket.clientID,
                    user: signalMPPacket.user
                });
                this.gameManager.socketManager.sendPacket(new ShareClientsPacket_1.default(packet.gameID, this.gameManager.socketManager.ownClientID, this.gameManager.socketManager.clients, this.gameManager.socketManager.clientUser));
            }
        };
        return SignalMPPacketHandler;
    }(PacketHandler_1.default));
    exports.SignalMPPacketHandler = SignalMPPacketHandler;
});
