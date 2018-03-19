import GameManager from './GameManager';


describe('GameManager', () => {

    let ctrl: GameManager;

    beforeEach(() => {
        ctrl = new GameManager();
    });

    it('startGame("easy") should set game.difficulty to easy', () => {
        ctrl.startGame('easy', 'user');
        let game = ctrl.game;

        expect(ctrl.game.difficulty).toBe('easy');
    });

    it('startGame("easy") should set game.startTime as date', () => {
        ctrl.startGame('easy', 'user');
        expect(ctrl.game.startTime instanceof Date).toBe(true);
    });

    it('startGame("easy") should set game.endTime to null', () => {
        ctrl.startGame('easy', 'user');
        expect(ctrl.game.endTime).toBe(null);
    });

    it('startGame("easy") should set game.won to false', () => {
        ctrl.startGame('easy', 'user');
        expect(ctrl.game.won).toBe(false);
    });
    it('startGame("easy") should set game.lost to false', () => {
        ctrl.startGame('easy', 'user');
        expect(ctrl.game.lost).toBe(false);
    });
    it('startGame("easy") should set game.started to true', () => {
        ctrl.startGame('easy', 'user');
        expect(ctrl.game.started).toBe(true);
    });
    it('startGame("easy") should set game.locked to false', () => {
        ctrl.startGame('easy', 'user');
        expect(ctrl.game.locked).toBe(false);
    });
    it('startGame("easy") should set game.turns to 0', () => {
        ctrl.startGame('easy', 'user');
        expect(ctrl.game.turns).toBe(0);
    });

    it('startGame("easy") should create a new deck', () => {
        let oldDeck = ctrl.deck;
        ctrl.startGame('easy', 'user');
        expect(ctrl.deck).not.toBe(oldDeck);
    });
    it('startGame("easy") should create a deck with 16 cards', () => {
        ctrl.startGame('easy', 'user');
        expect(ctrl.deck.length).toBe(16);
    });
    it('startGame("normal") should create a deck with 36 cards', () => {
        ctrl.startGame('normal', 'user');
        expect(ctrl.deck.length).toBe(36);
    });
    it('startGame("hard") should create a deck with 36 cards', () => {
        ctrl.startGame('hard', 'user');
        expect(ctrl.deck.length).toBe(36);
    });
    it('startGame("hard") should set a timeout', () => {
        ctrl.startGame('hard', 'user');
        expect(ctrl.timeout).not.toBe(null);
    });

});

