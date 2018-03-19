import GameManager from './GameManager';


describe('GameManager.startGame', () => {

    let ctrl: GameManager;

    beforeEach(() => {
        ctrl = new GameManager();
        ctrl._getRandomNumber = function() {return 1;};
    });

    it('("easy") should set game.difficulty to easy', () => {
        ctrl.startGame('easy', 'user');
        let game = ctrl.game;

        expect(ctrl.game.difficulty).toBe('easy');
    });

    it('("easy") should set game.startTime as date', () => {
        ctrl.startGame('easy', 'user');
        expect(ctrl.game.startTime instanceof Date).toBe(true);
    });

    it('("easy") should set game.endTime to null', () => {
        ctrl.startGame('easy', 'user');
        expect(ctrl.game.endTime).toBe(null);
    });

    it('("easy") should set game.won to false', () => {
        ctrl.startGame('easy', 'user');
        expect(ctrl.game.won).toBe(false);
    });
    it('("easy") should set game.lost to false', () => {
        ctrl.startGame('easy', 'user');
        expect(ctrl.game.lost).toBe(false);
    });
    it('("easy") should set game.started to true', () => {
        ctrl.startGame('easy', 'user');
        expect(ctrl.game.started).toBe(true);
    });
    it('("easy") should set game.locked to false', () => {
        ctrl.startGame('easy', 'user');
        expect(ctrl.game.locked).toBe(false);
    });
    it('("easy") should set game.turns to 0', () => {
        ctrl.startGame('easy', 'user');
        expect(ctrl.game.turns).toBe(0);
    });

    it('("easy") should create a new deck', () => {
        let oldDeck = ctrl.deck;
        ctrl.startGame('easy', 'user');
        expect(ctrl.deck).not.toBe(oldDeck);
    });
    it('("easy") should create a deck with 16 cards', () => {
        ctrl.startGame('easy', 'user');
        expect(ctrl.deck.length).toBe(16);
    });
    it('("normal") should create a deck with 36 cards', () => {
        ctrl.startGame('normal', 'user');
        expect(ctrl.deck.length).toBe(36);
    });
    it('("hard") should create a deck with 36 cards', () => {
        ctrl.startGame('hard', 'user');
        expect(ctrl.deck.length).toBe(36);
    });
    it('("hard") should set a timeout', () => {
        ctrl.startGame('hard', 'user');
        expect(ctrl.timeout).not.toBe(null);
    });

    it('cards in deck should match card specification: {id: int, image: int, show: bool}', () => {
        ctrl.startGame('easy', 'user');

        expect(ctrl.deck[0]).toEqual({id: 0, image:1, show: false});
    });
    it('all cards in deck should match card specification: {id: int, image: int, show: bool}', () => {
        ctrl.startGame('easy', 'user');
        let deck = ctrl.deck;

        for(let i=0; i<deck.length; i++) {
            expect(ctrl.deck[i]).toEqual({id: i, image:1, show: false});
        }
    });
});

describe('GameManager.showCard', () => {

    let ctrl: GameManager;

    beforeEach(() => {
        ctrl = new GameManager();

        ctrl.game = {
            difficulty: 'easy',
            startTime : new Date(),
            endTime   : null,
            won       : false,
            lost      : false,
            started   : true,
            locked    : false,
            turns     : 0
        };

        let deck = [];
        for(let i =0; i<16; i++) {
            let image = i < 8 ? i:i-8;
            deck.push({id: i, image: image, show: false})
        }

        ctrl.deck = deck;
    });

    it('should count a turn if called', () => {
        ctrl.showCard(1);

        expect(ctrl.game.turns).toBe(1);
    });
    it('should count a turn everytime if called', () => {
        ctrl.showCard(1);
        ctrl.showCard(2);
        ctrl.showCard(3);

        expect(ctrl.game.turns).toBe(3);
    });
    it('should not count a turn if card already open', () => {
        ctrl.showCard(1);
        ctrl.showCard(1);

        expect(ctrl.game.turns).toBe(1);
    });
    it('(1) should show card one', () => {
        let deck = ctrl.deck;
        ctrl.showCard(1);

        expect(deck[1].show).toBe(true);
    });
    it('should show card one and two if called with "1" and "2"', () => {
        let deck = ctrl.deck;
        ctrl.showCard(1);
        ctrl.showCard(2);

        expect(deck[1].show).toBe(true);
        expect(deck[2].show).toBe(true);
    });
    it('should show card three and hide one and two if called with "1", "2" and "3"', () => {
        let deck = ctrl.deck;
        ctrl.showCard(1);
        ctrl.showCard(2);
        ctrl.showCard(3);

        expect(deck[1].show).toBe(false);
        expect(deck[2].show).toBe(false);
        expect(deck[3].show).toBe(true);
    });
    it('should show card one, two and nine if called with "1", "9" and "2"', () => {
        let deck = ctrl.deck;
        ctrl.showCard(1);
        ctrl.showCard(9);
        ctrl.showCard(2);

        expect(deck[1].show).toBe(true);
        expect(deck[9].show).toBe(true);
        expect(deck[2].show).toBe(true);
    });
    it('should not open card if locked', () => {
        let game = ctrl.game;
        game.locked = true;
        let deck = ctrl.deck;
        ctrl.showCard(1);

        expect(deck[1].show).toBe(false);
    });
    it('should mark game as won if all cards are open', () => {
        for(let i=0; i<8; i++) {
            ctrl.showCard(i);
            ctrl.showCard(i+8);
        }

        expect(ctrl.game.won).toBe(true);
    });
    it('should fill endTime if finished', () => {
        for(let i=0; i<8; i++) {
            ctrl.showCard(i);
            ctrl.showCard(i+8);
        }

        expect(ctrl.game.endTime instanceof Date).toBe(true);
    });
    it('should not loose game if mode is hard and 90 turns are not exceeded', () => {
        let game = ctrl.game;
        game.difficulty = 'hard';
        game.turns = 89;
        ctrl.showCard(1);

        expect(ctrl.game.lost).toBe(true);
    });
    it('should loose game if mode is hard and 90 turns are exceeded', () => {
        let game = ctrl.game;
        game.difficulty = 'hard';
        game.turns = 90;
        ctrl.showCard(1);

        expect(ctrl.game.lost).toBe(true);
    });
    it('should not win game if already lost', () => {
        let game = ctrl.game;
        game.lost = true;
        for(let i=0; i<8; i++) {
            ctrl.showCard(i);
            ctrl.showCard(i+8);
        }

        expect(ctrl.game.won).toBe(false);
    });
    it('should not loose game if already won', () => {
        let game = ctrl.game;
        game.difficulty = 'hard';
        game.won = true;
        game.turns = 90;
        ctrl.showCard(1);

        expect(ctrl.game.lost).toBe(false);
    });
});

