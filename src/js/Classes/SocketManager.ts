import Packet from "./packets/Packet";
import PacketHandler from "./handlers/PacketHandler";
import {ClientUser} from "./packets/ShareClientsPacket";
import CLIENT_CONFIG from "../config.client";

/**
 * Manages the connection between the multi player websocket server and
 * this client.
 *
 * The protocol used by the websocket is based on JSon.
 * The games are managed decentralized by the clients.
 * The server only broadcasts the packets, that it receives.
 */
export class SocketManager {

    /**
     * The websocket that is used for the communication
     */
    private readonly _ws: WebSocket;

    /**
     * An array that contains all necessary packet handlers
     * required to process a multi player game
     */
    private _handlers: PacketHandler[] = [];

    constructor() {
        // Assign client id
        this._ownClientID = SocketManager._generateID();
        // Open WebSocket
        this._ws = new WebSocket(CLIENT_CONFIG.WEBSOCKET);
        // Listen for messages
        this._ws.onmessage = this._onWebSocketMessageReceived;
    }

    /**
     * The client id of this client
     */
    private _ownClientID: string;

    public get ownClientID(): string {
        return this._ownClientID;
    }

    /**
     * An array that contains the clients of the current game
     */
    private _clients: string[] = [];

    public get clients(): string[] {
        return this._clients;
    }

    // -------- Packet functions

    public set clients(values: string[]) {
        this._clients = values;
    }

    /**
     * An array that contains the current ClientUsers
     */
    private _clientUser: ClientUser[] = [];

    // -------- WebSocket functions

    get clientUser(): ClientUser[] {
        return this._clientUser;
    }

    // -------- Packet handling

    set clientUser(value: ClientUser[]) {
        this._clientUser = value;
    }

    /**
     * The id of the current game
     */
    private _currentGameID: string | undefined = undefined;

    public get currentGameID(): string | undefined {
        return this._currentGameID;
    }

    // -------- ID functions

    public set currentGameID(value: string | undefined) {
        this._currentGameID = value;
    }

    public get ws(): WebSocket {
        return this._ws;
    }

    /**
     * Serializes the given data into the JSON format, to be send over a websocket
     *
     * @param packet
     * @private
     */
    private static _serializePacket(packet: Packet): string {
        return JSON.stringify(packet);
    }

    /**
     * Deserialize a packet to work with its data
     *
     * @param packetData
     * @private
     */
    private static _deserializePacket(packetData: string): Packet {
        return <Packet>JSON.parse(packetData);
    }

    /**
     * Generates a random id with up to 9 digits.
     * Even if the id's vary in length, the only point
     * of them is to be unique.
     * The possibility of generating ID's that other players or games already
     * own is low.
     *
     * @returns string
     *
     * @private
     */
    private static _generateID(): string {
        return String(Math.round(Math.random() * 999999999));
    }

    /**
     * Checks if the connection to the WebSocket Server is OPEN
     *
     * @public
     */
    public isConnectionValid(): boolean {
        return this._ws.readyState === WebSocket.OPEN;
    }

    /**
     * Registers a new packet handler
     *
     * @param packetHandler
     * @public
     */
    public registerPacketHandler(packetHandler: PacketHandler): void {
        this._handlers.push(packetHandler);
    }

    /**
     * Sends the given packet.
     *
     * @param packet
     * @returns false, if the WebSocket is not open
     * @public
     */
    public sendPacket(packet: Packet): boolean {
        if (this.isConnectionValid()) {
            this._ws.send(SocketManager._serializePacket(packet));
            return true;
        } else {
            return false;
        }
    }

    /**
     * Ends the current network session
     */
    public endNetworkGame() {
        this._currentGameID = undefined;
        this.regenerateClientID();
    }

    /**
     * Regenerates the SocketManager#gameID using the default SocketManager#_generateID() function
     *
     * @private
     */
    public regenerateGameID() {
        this._currentGameID = SocketManager._generateID();
    }

    /**
     * Regenerates the client's id.
     */
    public regenerateClientID(): void {
        this._ownClientID = SocketManager._generateID();
        this.clients.push(this._ownClientID);
    }

    /**
     * Add a client to the clients of this game
     *
     * @param clientToAdd
     * @public
     */
    public addClient(clientToAdd: string) {
        this.clients.push(clientToAdd);
    }

    /**
     * Handles all incoming packets and passes them to their registered handlers
     *
     * @param messageEvent
     * @private
     */
    private _onWebSocketMessageReceived = (messageEvent: MessageEvent): void => {
        try {
            let packet: Packet = SocketManager._deserializePacket(messageEvent.data);
            this._handlers.forEach((packetHandler: PacketHandler) => {
                if (packetHandler.packetID === packet.packetID) {
                    if (packetHandler.handleOnlyTargeted && this._currentGameID === packet.gameID) {
                        packetHandler.handle(packet);
                    } else if (!packetHandler.handleOnlyTargeted) {
                        packetHandler.handle(packet);
                    } // else ignore packet. Does not target us.
                }
            });
        } catch (error) {
            console.error("Received broken packet. Ignoring it! Error: " + error);
        }
    };
}