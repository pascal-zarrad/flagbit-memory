import Packet from "../packets/Packet";
import GameManager from "../GameManager";

/**
 * A abstract packet handler that provides the structure of a packet handler
 */
export default abstract class PacketHandler {

    private readonly _packetID: number;
    /**
     * Defines if the handler should handle ALL incoming packets of a specific type
     * (even if SocketManager#_currentGameID is undefined),
     * or if he should filter packets not targeting the current SocketManager#_currentGameID
     */
    private readonly _handleOnlyTargeted: boolean;
    private readonly _gameManager: GameManager;

    protected constructor(packetID: number, handleOnlyTargeted: boolean, gameManager: GameManager) {
        this._packetID = packetID;
        this._handleOnlyTargeted = handleOnlyTargeted;
        this._gameManager = gameManager;
    }

    public get packetID(): number {
        return this._packetID;
    }

    public get handleOnlyTargeted(): boolean {
        return this._handleOnlyTargeted;
    }

    public get gameManager(): GameManager {
        return this._gameManager;
    }

    /**
     * Handles an incoming packet.
     *
     * @param packet
     */
    public abstract handle<T extends Packet>(packet: T): void;

}