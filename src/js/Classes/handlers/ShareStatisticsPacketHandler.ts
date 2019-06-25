import PacketHandler from "./PacketHandler";
import Packet, {Packets} from "../packets/Packet";
import GameManager from "../GameManager";
import ShareStatisticsPacket from "../packets/ShareStatisticsPacket";
import {User} from "../statistics/Statistics";

/**
 * Handles ShareStatisticsPackets
 */
export default class ShareStatisticsPacketHandler extends PacketHandler {

    constructor(gameManager: GameManager) {
        super(Packets.SHARE_STATISTICS, true, gameManager);
    }

    handle<T extends Packet>(packet: T): void {
        if (this.gameManager.socketManager.currentGameID === packet.gameID) {
            let shareStatisticsPacket: ShareStatisticsPacket = <ShareStatisticsPacket><any>packet;
            if (typeof this.gameManager.statsManager.currentStatistics !== "undefined") {
                let time = shareStatisticsPacket.timeRequired;
                this.gameManager.statsManager.currentStatistics.game[0].users.push(new User(shareStatisticsPacket.user, <number>time, shareStatisticsPacket.turns, false));
            }
        }
    }
}