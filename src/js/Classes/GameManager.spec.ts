import GameManager from './GameManager';


describe('GameManager.startGame', () => {

    let ctrl: GameManager;

    beforeEach(() => {
        ctrl = new GameManager();
        ctrl._getRandomNumber = function() {return 1;};
    });

    it('("easy") should return a boolean', () => {
        let result = ctrl.startGame('easy', 'user');
        expect(typeof result).toBe('boolean');
    });

    it('("easy") should return true if the game was started', () => {
        let result = ctrl.startGame('easy', 'user');
        if(typeof result === 'boolean') {
            expect(result).toBe(true);
        }
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

    it('card.image should use _getRandomNumber()', () => {
        let random = Math.round(Math.random()*7);
        ctrl._getRandomNumber = (max: number) => {
            return random;
        };
        ctrl.startGame('easy', 'user');

        expect(ctrl.deck[0].image).toEqual(random);
    });
});



describe('GameManager._getRandomNumber', () => {
    let ctrl: GameManager;

    beforeEach(() => {
        ctrl = new GameManager();
    });

    it('should return a number', () => {
        expect(typeof ctrl._getRandomNumber(7)).toBe('number');
    });

    it('should return a whole number', () => {
        let result = ctrl._getRandomNumber(7);

        if(typeof result === 'number') {
            expect(result % 1 != 0).toBe(false);
        }
    });

    it('should always return a number smaller than max', () => {
        let isGreater = false;
        for(let i =0; i<256; i++) {
            let result = ctrl._getRandomNumber(7);
            if(typeof result === 'number') {
                if(result > 7) isGreater = true;
            } else {
                isGreater = true;
            }
        }
        expect(isGreater).toBe(false);
    });

    it('should always return a number greater or equal to zero', () => {
        let isSmaller = false;
        for(let i =0; i<256; i++) {
            let result = ctrl._getRandomNumber(7);
            if(typeof result === 'number') {
                if(result < 0) isSmaller = true;
            } else {
                isSmaller = true;
            }
        }
        expect(isSmaller).toBe(false);
    });

    it('should guarantee a valid deck', () => {

        let deck = [];
        for(let i =0; i<15; i++) {
            let image = i < 8 ? i:i-8;
            deck.push({id: i, image: image, show: false})
        }
        ctrl.deck = deck;

        let result = ctrl._getRandomNumber(7);
        if(typeof result === 'number') {
            expect(result).toBe(7);
        }
    });

    it('should return every number exactly twice in a deck', () => {

        let deck = ctrl.deck;
        for(let i =0; i<16; i++) {
            deck.push({id: i, image: ctrl._getRandomNumber(7), show: false})
        }

        for(let i =0; i<8; i++) {
            let occurrences = 0;
            for(let j =0; j<deck.length; j++) {
                if(deck[j].image === i) occurrences++;
            }
            expect(occurrences).toBe(2);
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
});



describe('GameManager.resetGame', () => {
    let ctrl: GameManager;

    beforeEach(() => {
        ctrl = new GameManager();

        ctrl.game = {
            difficulty: 'easy',
            startTime : new Date(),
            endTime   : new Date(),
            won       : true,
            lost      : false,
            started   : true,
            locked    : false,
            turns     : 32
        };

        let deck = [];
        for(let i =0; i<16; i++) {
            let image = i < 8 ? i:i-8;
            deck.push({id: i, image: image, show: false})
        }

        ctrl.deck = deck;
    });

    it('should clear the deck', () => {
        ctrl.resetGame();

        expect(ctrl.deck.length).toBe(0);
    });

    it('should reset the game', () => {
        ctrl.resetGame();

        expect(ctrl.game).toEqual({difficulty: null, startTime: null, endTime: null, turns: 0, started: false, won: false, lost: false, locked: false});
    });
});