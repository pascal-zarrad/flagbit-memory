/**
 * An abstract packet that provides the most basic information
 * that is required to process a packet
 */
export default abstract class Packet {

    /**
     * The id of the game the packet belongs to
     */
    public gameID: string;

    /**
     * The ID of the client that has send this packet.
     * ClientID could be retrieved from clients[], but it wouldn't be clear which ID is from the packet sender.
     */
    public clientID: string;

    /**
     * The ID of the packet
     */
    public packetID: Packets;

    /**
     * The ID's of the clients that should process this packet
     */
    public clients: string[];

    protected constructor(gameID: string, clientID: string, packetID: Packets, clients: string[]) {
        this.gameID = gameID;
        this.clientID = clientID;
        this.packetID = packetID;
        this.clients = clients;
    }
}

/**
 * The different available packets and their ID.
 */
export enum Packets {
    SIGNAL_MP,
    SHARE_CLIENTS,
    START_GAME,
    LOST_GAME,
    SHARE_STATISTICS
}