import PacketHandler from "./PacketHandler";
import Packet, {Packets} from "../packets/Packet";
import GameManager from "../GameManager";
import SignalMPPacket from "../packets/SignalMPPacket";
import ShareClientsPacket from "../packets/ShareClientsPacket";

/**
 * Handles SignalMPPackets
 */
export class SignalMPPacketHandler extends PacketHandler {

    constructor(gameManager: GameManager) {
        super(Packets.SIGNAL_MP, true, gameManager);
    }

    public handle<T extends Packet>(packet: T): void {
        let signalMPPacket: SignalMPPacket = <SignalMPPacket><any>packet;
        if (this.gameManager.socketManager.ownClientID === signalMPPacket.receiver) {
            this.gameManager.socketManager.addClient(signalMPPacket.clientID);
            this.gameManager.socketManager.clientUser.push({
                client: signalMPPacket.clientID,
                user: signalMPPacket.user
            });
            this.gameManager.socketManager.sendPacket(new ShareClientsPacket(packet.gameID, this.gameManager.socketManager.ownClientID, this.gameManager.socketManager.clients, this.gameManager.socketManager.clientUser));
        }
    }

}