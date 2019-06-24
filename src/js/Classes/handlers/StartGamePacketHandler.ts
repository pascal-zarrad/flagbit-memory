import PacketHandler from "./PacketHandler";
import StartGamePacket from "../packets/StartGamePacket";
import Packet, {Packets} from "../packets/Packet";
import GameManager from "../GameManager";
import SignalMPPacket from "../packets/SignalMPPacket";

/**
 * Handles StartGamePackets
 */
export default class StartGamePacketHandler extends PacketHandler {

    constructor(gameManager: GameManager) {
        super(Packets.START_GAME, false, gameManager);
    }

    public handle<T extends Packet>(packet: T): void {
        if (typeof this.gameManager.socketManager.currentGameID === "undefined" && !this.gameManager.game.started) {
            let userNameField = document.getElementById('game-user');
            if (userNameField == null) {
                return;
            }
            if ((<HTMLInputElement>userNameField).value.length < 3) {
                return;
            }
            let startGamePacket: StartGamePacket = <StartGamePacket><any>packet;
            // Set gameID
            this.gameManager.socketManager.currentGameID = packet.gameID;
            // Regenerate clientID
            this.gameManager.socketManager.regenerateClientID();
            // Set deck
            if (typeof startGamePacket.deck !== "undefined") {
                this.gameManager.deck = startGamePacket.deck;
            }
            // Signal the host that this client joined the match
            this.gameManager.socketManager.sendPacket(new SignalMPPacket(startGamePacket.gameID, this.gameManager.socketManager.ownClientID, [], startGamePacket.clientID, this.gameManager.user));
            // Simulate start button click, to start game without user interaction
            let button: HTMLElement | undefined = document.getElementsByTagName("button")[0];
            if (typeof button !== "undefined") {
                (<HTMLButtonElement>button).click();
            }
            this.gameManager.game.difficulty = startGamePacket.difficulty;
        }
    }

}