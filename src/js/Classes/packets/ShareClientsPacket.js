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
    var ShareClientsPacket = /** @class */ (function (_super) {
        __extends(ShareClientsPacket, _super);

        function ShareClientsPacket(gameID, clientID, clients, clientUser) {
            var _this = _super.call(this, gameID, clientID, Packet_1.Packets.SHARE_CLIENTS, clients) || this;
            _this.clientsUser = clientUser;
            return _this;
        }

        return ShareClientsPacket;
    }(Packet_1.default));
    exports.default = ShareClientsPacket;
});
