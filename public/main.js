"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
    var gameScorePanel = [0, 15, 30, 40];

    var Player = function () {
        function Player(gameScore, setScore, gamePhase, name) {
            _classCallCheck(this, Player);

            this._gameScore = gameScore;
            this._setScore = setScore;
            this._gamePhase = gamePhase;

            this.name = name;
        }

        _createClass(Player, [{
            key: "play",
            value: function play() {
                return Math.random();
            }
        }, {
            key: "gameScore",
            get: function get() {
                return this._gameScore;
            },
            set: function set(newGameScore) {
                this._gameScore = newGameScore;
            }
        }, {
            key: "setScore",
            get: function get() {
                return this._setScore;
            },
            set: function set(newSetScore) {
                this._setScore = newSetScore;
            }
        }, {
            key: "gamePhase",
            get: function get() {
                return this._gamePhase;
            },
            set: function set(newGamePhase) {
                this._gamePhase = newGamePhase;
            }
        }]);

        return Player;
    }();

    /**** GAME POINTS LOGIC ****/

    /**
     * Determines which player won the point
     * @param {Click event} e 
     * @param {Integer [optional]} p1r 
     * @param {Integer [optional]} p2r 
     */


    var playGame = function playGame(e) {
        var p1r = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : player1.play();
        var p2r = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : player2.play();

        if (p1r > p2r) {
            updateGameState(player1, player2);
        } else {
            updateGameState(player2, player1);
        }
    };

    /**
     * Handles the different states of the game through the match
     * @param {Player instance} winner 
     * @param {Player instance} looser 
     */
    var updateGameState = function updateGameState(winner, looser) {
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
                    if (looser.gamePhase === "matchpoint") {
                        setEqualityState(winner, looser);
                    } else {
                        winner.gamePhase = "matchpoint";
                    }
                }
                displayGameScore();
                break;
        }
    };

    /**
     * Sets equality state for both players
     * @param {Player instance} winner 
     * @param {Player instance} looser 
     */
    var setEqualityState = function setEqualityState(winner, looser) {
        winner.gamePhase = "equality";
        looser.gamePhase = "equality";
        displayAdvantage(null);
    };

    /**
     * Reset score and equality status when a game is won.
     */
    var resetGame = function resetGame() {
        player1.gameScore = 0;
        player2.gameScore = 0;
        player1.gamePhase = "default";
        player2.gamePhase = "default";

        document.getElementById("info").innerHTML = '';
    };

    /**** SETS POINT LOGIC ****/

    /**
     * Adds a point for the winner in his set score
     * @param {Player instance} winner 
     * @param {Player instance} looser 
     */
    var updateSetScore = function updateSetScore(winner, looser) {
        winner.setScore++;

        resetGame();
        displayGameScore();
        displaySetScore();
        detectWinner(winner, looser);
    };

    var detectWinner = function detectWinner(winner, looser) {
        if (winner.setScore >= 6 && looser.setScore < 5 || winner.setScore === 7) {
            var buttons = document.getElementsByTagName("BUTTON");

            document.getElementById("info").innerHTML = "The winner is " + winner.name;
            document.getElementById("next-game").removeEventListener('click', playGame);

            for (var i = 0; i <= buttons.length; i++) {
                buttons[i].disabled = true;
            }
        }
    };

    /**** DISPLAY ****/

    var displayGameScore = function displayGameScore() {
        document.getElementById("game-score-1").innerHTML = gameScorePanel[player1.gameScore];
        document.getElementById("game-score-2").innerHTML = gameScorePanel[player2.gameScore];
    };

    var displaySetScore = function displaySetScore() {
        document.getElementById("set-score-1").innerHTML = player1.setScore;
        document.getElementById("set-score-2").innerHTML = player2.setScore;
    };

    var displayAdvantage = function displayAdvantage(name) {
        document.getElementById("info").innerHTML = name ? "Avantage " + name : "Egalit\xE9";
    };

    /**** INITIALIZATION *****/

    var player1 = new Player(0, 0, 'default', 'Sampras', true);
    var player2 = new Player(0, 0, 'default', 'Agaci', false);

    displayGameScore();
    displaySetScore();

    document.getElementById("next-game").addEventListener('click', playGame);

    /**** TOOLS FOR UI TESTING ****/

    document.getElementById("cheat-1").addEventListener('click', function (e) {
        playGame(e, 1, 0);
    });

    document.getElementById("cheat-2").addEventListener('click', function (e) {
        playGame(e, 0, 1);
    });
})();
