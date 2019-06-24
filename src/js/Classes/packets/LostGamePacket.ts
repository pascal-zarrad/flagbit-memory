import Packet, {Packets} from "./Packet";

/**
 * A packet that indicates that the players that are
 * in the scope of this packet (gameID & client[])
 * have lost the game.
 */
export default class LostGamePacket extends Packet {

    constructor(gameID: string, clientID: string, clients: string[]) {
        super(gameID, clientID, Packets.LOST_GAME, clients);
    }

}