export class Statistics {

    public game: Game[];


    constructor(game: Game[]) {
        this.game = game;
    }

}

export class Game {

    public users: User[];

    public winner: string;

    public difficulty: string;

    constructor(users: User[], winner: string, difficulty: string) {
        this.users = users;
        this.winner = winner;
        this.difficulty = difficulty;
    }

}

export class User {

    public username: string;

    public timeRequired: number;

    public turns: number;

    public winner: boolean;

    constructor(username: string, timeRequired: number, turns: number, winner: boolean) {
        this.username = username;
        this.timeRequired = timeRequired;
        this.turns = turns;
        this.winner = winner;
    }

}

export class ResponseError {

    public errorCode: number;

    public errorMessage: string;

    constructor(errorCode: number, errorMessage: string) {
        this.errorCode = errorCode;
        this.errorMessage = errorMessage;
    }

}