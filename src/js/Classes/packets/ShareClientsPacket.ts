import Packet, {Packets} from "./Packet";

/**
 * A packet used to share the known clients of the host with all player participating in
 * the current game.
 */
export default class ShareClientsPacket extends Packet {

    /**
     * An array that contains all clients and their username that the host does know
     */
    public clientsUser: ClientUser[];

    constructor(gameID: string, clientID: string, clients: string[], clientUser: ClientUser[]) {
        super(gameID, clientID, Packets.SHARE_CLIENTS, clients);
        this.clientsUser = clientUser;
    }

}

/**
 * A interface that represents a pair of a client and his username
 */
export interface ClientUser {
    client: string,
    user: string
}