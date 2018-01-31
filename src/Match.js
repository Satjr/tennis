import Arbiter from './Arbiter';

export default class Match extends Arbiter {
    /**
     * Handles the match score state update when a player wins a game
     * @param {Player instance} p1 
     * @param {Player instance} p2 
     */
    constructor(p1, p2, $DOMConf) {
        super($DOMConf);
        this.player1 = p1;
        this.player2 = p2;
    }

    /**
     * Determines which player won the point
     * @param {Integer [optional]} p1r 
     * @param {Integer [optional]} p2r 
     */
    playGame(p1r = this.player1.play(), p2r = this.player2.play()) {
        if (p1r > p2r) {
            this.updateGameState(this.player1, this.player2);
        } else {
            this.updateGameState(this.player2, this.player1);
        }
    }

    /**
     * Handles the different states of the game through the match
     * @param {Player instance} winner 
     * @param {Player instance} looser 
     */
    updateGameState(winner, looser) {
        switch (winner.gamePhase) {
            case "matchpoint":
                this.updateSetScore(winner, looser);
                break;
            case "disavantage":
                this.setEqualityState(winner, looser);
                break;
            case "equality":
                winner.gamePhase = "matchpoint";
                looser.gamePhase = "disavantage";
                this.displayAdvantage(winner.name);
                break;
            default:
                winner.gameScore++;

                if (this.gameScorePanel[winner.gameScore] === 40) {
                    if(looser.gamePhase === "matchpoint") {
                        this.setEqualityState(winner, looser);
                    } else {
                        winner.gamePhase = "matchpoint"                    
                    }
                }
                this.displayGameScore();
                break;
        }
    }

    /**
     * Sets equality state for both players
     * @param {Player instance} winner 
     * @param {Player instance} looser 
     */
    setEqualityState(winner, looser) {
        winner.gamePhase = "equality";
        looser.gamePhase = "equality";
        this.displayAdvantage(null);
    }

    /**
     * Reset score and equality status when a game is won.
     */
    resetGame() {
        this.player1.gameScore = 0;
        this.player2.gameScore = 0;
        this.player1.gamePhase = "default";
        this.player2.gamePhase = "default";

        this.clearAdvantageStatus();
    }

    /**
     * Adds a point for the winner in his set score
     * @param {Player instance} winner 
     * @param {Player instance} looser 
     */
    updateSetScore(winner, looser) {
        winner.setScore++;

        this.resetGame();
        this.displayGameScore();
        this.displaySetScore();
        this.detectWinner(winner, looser);
    }

    /**
     * Determines if the current score results to a victory condition
     * @param {Player instance} winner 
     * @param {Player instance} looser 
     */
    detectWinner(winner, looser) {
        let v = this.victoryConditions;
        let ws = winner.setScore;
        let easyVictory = (ws >= v.standard && looser.setScore < v.againstStrongOponent);
        let toughVictory = ws === v.absolute;

        if(easyVictory || toughVictory) {
            this.declareWinner(winner.name);
            this.$DOMConf.game.removeEventListener('click', this.playGame);
        } 
    }

    /**** DISPLAY ****/
    init() {
        this.displayGameScore();
        this.displaySetScore();

        this.$DOMConf.game.addEventListener('click', () => {
            this.playGame();
        });
    }
}
