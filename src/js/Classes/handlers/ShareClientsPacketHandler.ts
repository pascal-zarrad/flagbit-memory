import PacketHandler from "./PacketHandler";
import Packet, {Packets} from "../packets/Packet";
import GameManager from "../GameManager";
import ShareClientsPacket from "../packets/ShareClientsPacket";

/**
 * Hanles ShareClientsPacket's
 */
export default class ShareClientsPacketHandler extends PacketHandler {

    constructor(gameManager: GameManager) {
        super(Packets.SHARE_CLIENTS, true, gameManager);
    }

    public handle<T extends Packet>(packet: T): void {
        let shareClientsPacket: ShareClientsPacket = <ShareClientsPacket><any>packet;
        this.gameManager.socketManager.clients = packet.clients;
        this.gameManager.socketManager.clientUser = shareClientsPacket.clientsUser;
    }

}
