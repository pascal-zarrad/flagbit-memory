import Packet, {Packets} from "./Packet";

/**
 * A packet that is send by clients after they received the LostGamePacket,
 * to share their own statistics
 */
export default class ShareStatisticsPacket extends Packet {

    /**
     * The username of this client
     */
    public user: string;

    /**
     * The turns this client has done, before he lost
     */
    public turns: number;

    /**
     * The time this client has required before he has lost the game
     */
    public timeRequired: number;

    constructor(gameID: string, clientID: string, clients: string[], user: string, turns: number, timeRequired: number) {
        super(gameID, clientID, Packets.SHARE_STATISTICS, clients);
        this.user = user;
        this.turns = turns;
        this.timeRequired = timeRequired;
    }
}