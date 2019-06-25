import PacketHandler from "./PacketHandler";
import GameManager from "../GameManager";
import Packet, {Packets} from "../packets/Packet";

/**
 * Handles LostGamePackets
 */
export default class LostGamePacketHandler extends PacketHandler {

    constructor(gameManager: GameManager) {
        super(Packets.LOST_GAME, true, gameManager);
    }

    public handle<T extends Packet>(packet: T): void {
        if (!this.gameManager.game.lost) {
            this.gameManager.lostGame();
        }
    }

}