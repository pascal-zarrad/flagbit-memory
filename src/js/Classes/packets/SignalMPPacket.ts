import Packet, {Packets} from "./Packet";

/**
 * Signals that the client is going to participate in thr game that has been broad casted
 * using a StartGamePacket
 */
export default class SignalMPPacket extends Packet {

    /**
     * The id of the client that should receive/handle this packet
     */
    public receiver: string;

    /**
     * The name of this client
     */
    public user: string;

    constructor(gameID: string, clientID: string, clients: string[], receiver: string, user: string) {
        super(gameID, clientID, Packets.SIGNAL_MP, clients);
        this.receiver = receiver;
        this.user = user;
    }

}