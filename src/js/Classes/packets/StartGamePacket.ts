import Packet, {Packets} from "./Packet";

/**
 * A packet that signals that a game is about to start
 */
export default class StartGamePacket extends Packet {

    /**
     * The deck used by the game
     */
    public deck: any[] | undefined;

    /**
     * The difficulty of the game
     */
    public difficulty: string;

    constructor(gameID: string, clientID: string, clients: string[], deck: any[] | undefined, difficulty: string) {
        super(gameID, clientID, Packets.START_GAME, clients);
        this.deck = deck;
        this.difficulty = difficulty;
    }
}