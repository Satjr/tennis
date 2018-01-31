export default class Arbiter {
    /**
     * The Arbiter gives information to the crowd about the result of the game
     * The Arbiter defines the rules of the game (gameScorePanel, victoryConditions)
     * This class is here to externalize logic and DOM manipulation
     * Most of what this class does is to insert text into html
     */
    constructor($DOMConf) {
        this.gameScorePanel = [0, 15, 30, 40];
        this.victoryConditions = {
            standard: 6,
            againstStrongOponent: 5,
            absolute: 7
        }
        this.$DOMConf = $DOMConf;
    }

    /**
     * Replace game score value with the new one
     */
    displayGameScore() {
        this.$DOMConf.gs1.innerHTML = this.gameScorePanel[this.player1.gameScore];
        this.$DOMConf.gs2.innerHTML = this.gameScorePanel[this.player2.gameScore];
    }

    /**
     * Replace set score value with the new one
     */
    displaySetScore() {
        this.$DOMConf.sc1.innerHTML = this.player1.setScore;
        this.$DOMConf.sc2.innerHTML = this.player2.setScore;
    }

    /**
     * Display advantage status
     * @param {string} name 
     */
    displayAdvantage(name) {
        this.$DOMConf.info.innerHTML = name ? `Avantage ${name}` : `Egalité`;
    }

    /**
     * Display winner's name
     * Removes the possibility to play another game
     * @param {string} name 
     */
    declareWinner(name) {
        let buttons = this.$DOMConf.buttons;

        this.$DOMConf.info.innerHTML = `The winner is ${name}`;
        
        for(let i = 0; i < buttons.length; i++) {
            buttons[i].disabled = true;
        }
    }

    /**
     * Removes advantage status
     */
    clearAdvantageStatus() {
        this.$DOMConf.info.innerHTML = '';
    }
}
