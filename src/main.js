(() => {
    const gameScorePanel = [0, 15, 30, 40];
    
    class Player {
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
    
    /**** GAME POINTS LOGIC ****/
    
    /**
     * Determines which player won the point
     * @param {Click event} e 
     * @param {Integer [optional]} p1r 
     * @param {Integer [optional]} p2r 
     */
    const playGame = (e, p1r = player1.play(), p2r = player2.play()) => {
        if (p1r > p2r) {
            updateGameState(player1, player2);
        } else {
            updateGameState(player2, player1);
        }
    }
    
    /**
     * Handles the different states of the game through the match
     * @param {Player instance} winner 
     * @param {Player instance} looser 
     */
    const updateGameState = (winner, looser) => {
        switch (winner.gamePhase) {
            case "matchpoint":
                updateSetScore(winner, looser);
                break;
            case "disavantage":
                setEqualityState(winner, looser);
                break;
            case "equality":
                winner.gamePhase = "matchpoint";
                looser.gamePhase = "disavantage";
                displayAdvantage(winner.name);
                break;
            default:
                winner.gameScore++;
    
                if (gameScorePanel[winner.gameScore] === 40) {
                    if(looser.gamePhase === "matchpoint") {
                        setEqualityState(winner, looser);
                    } else {
                        winner.gamePhase = "matchpoint"                    
                    }
                }
                displayGameScore();
                break;
        }
    }
    
    /**
     * Sets equality state for both players
     * @param {Player instance} winner 
     * @param {Player instance} looser 
     */
    const setEqualityState = (winner, looser) => {
        winner.gamePhase = "equality";
        looser.gamePhase = "equality";
        displayAdvantage(null);
    }
    
    /**
     * Reset score and equality status when a game is won.
     */
    const resetGame = () => {
        player1.gameScore = 0;
        player2.gameScore = 0;
        player1.gamePhase = "default";
        player2.gamePhase = "default";
    
        document.getElementById("info").innerHTML = '';
    }
    
    /**** SETS POINT LOGIC ****/
    
    /**
     * Adds a point for the winner in his set score
     * @param {Player instance} winner 
     * @param {Player instance} looser 
     */
    const updateSetScore = (winner, looser) => {
        winner.setScore++;
    
        resetGame();
        displayGameScore();
        displaySetScore();
        detectWinner(winner, looser);
    }
    
    const detectWinner = (winner, looser) => {
        if(winner.setScore >= 6 && looser.setScore < 5 || winner.setScore === 7) {
            let buttons = document.getElementsByTagName("BUTTON");

            document.getElementById("info").innerHTML = `The winner is ${winner.name}`;
            document.getElementById("next-game").removeEventListener('click', playGame);

            for(let i = 0; i <= buttons.length; i++) {
                buttons[i].disabled = true;
            }
        } 
    }
    
    /**** DISPLAY ****/
    
    const displayGameScore = () => {
        document.getElementById("game-score-1").innerHTML = gameScorePanel[player1.gameScore];
        document.getElementById("game-score-2").innerHTML = gameScorePanel[player2.gameScore];
    }
    
    const displaySetScore = () => {
        document.getElementById("set-score-1").innerHTML = player1.setScore;
        document.getElementById("set-score-2").innerHTML = player2.setScore;
    }
    
    const displayAdvantage = name => {
        document.getElementById("info").innerHTML = name ? `Avantage ${name}` : `Egalité`;
    }
    
    /**** INITIALIZATION *****/
    
    const player1 = new Player(0, 0, 'default', 'Sampras', true);
    const player2 = new Player(0, 0, 'default', 'Agaci', false);
    
    displayGameScore();
    displaySetScore();
    
    document.getElementById("next-game").addEventListener('click', playGame);
    
    /**** TOOLS FOR UI TESTING ****/
    
    document.getElementById("cheat-1").addEventListener('click', (e) => {
        playGame(e, 1, 0);
    });
    
    document.getElementById("cheat-2").addEventListener('click', (e) => {
        playGame(e, 0, 1);
    });
    
})();