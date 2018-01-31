export default class Player {
    constructor(gameScore, setScore, gamePhase, name) {
        this._gameScore = gameScore;
        this._setScore = setScore;
        this._gamePhase = gamePhase;

        this.name = name;
    }

    get gameScore() {
        return this._gameScore;
    }

    set gameScore(newGameScore) {
        this._gameScore = newGameScore;
    }

    get setScore() {
        return this._setScore;
    }

    set setScore(newSetScore) {
        this._setScore = newSetScore;
    }

    get gamePhase() {
        return this._gamePhase;
    }

    set gamePhase(newGamePhase) {
        this._gamePhase = newGamePhase;
    }

    play() {
        return Math.random();
    }
}
