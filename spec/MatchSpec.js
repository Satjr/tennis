import Player from '../src/Player';
import Arbiter from '../src/Arbiter'
import Match from '../src/Match';
import jsdom from 'jsdom';

const { JSDOM } = jsdom;

describe('Match', function () {

    /**
     * Construct DOM for nodejs
     */
    const { document } = (new JSDOM(`
        <div id="game-score-1"></div>
        <div id="set-score-1"></div>
        <div id="game-score-2"></div>
        <div id="set-score-2"></div>
        <div id="info"></div>
        <button id="next-game"></button>
    `
    )).window;

    const $DOMConf = {
        gs1: document.getElementById("game-score-1"),
        gs2: document.getElementById("game-score-2"),
        sc1: document.getElementById("set-score-1"),
        sc2: document.getElementById("set-score-2"),
        info: document.getElementById("info"),
        buttons: document.getElementsByTagName("BUTTON"),
        game: document.getElementById("next-game")
    }

    let p1 = new Player(0, 0, 'standard', 'Sampras');
    let p2 = new Player(0, 0, 'standard', 'Agassi');
    let match = new Match(p1, p2, $DOMConf);

    it('Should extends from Arbiter', function () {
        /**Properties **/
        expect(match.gameScorePanel).toEqual([0, 15, 30, 40]);
        expect(match.victoryConditions).toEqual({
            standard: 6,
            againstStrongOponent: 5,
            absolute: 7
        });
        
        /**Methods **/
        expect(typeof match.displayGameScore).toBe('function');
        expect(typeof match.displaySetScore).toBe('function');
        expect(typeof match.displayAdvantage).toBe('function');
        expect(typeof match.declareWinner).toBe('function');
        expect(typeof match.clearAdvantageStatus).toBe('function');
    });

    it('Should have Player instances as parameters', function () {
        expect(match.player1 instanceof Player).toBeTruthy();
        expect(match.player2 instanceof Player).toBeTruthy();
    });

    describe('Game Scenarios', function () {
        let consecutiveSuccessesToWinGame = match.gameScorePanel.length;

        beforeEach(function () {
            p1 = new Player(0, 0, 'standard', 'Sampras');
            p2 = new Player(0, 0, 'standard', 'Agassi');
            match = new Match(p1, p2, $DOMConf);
        });

        it('should have a score to 0 everywhere at initialization', function () {
            expect(match.gameScorePanel[match.player1.gameScore]).toEqual(0);
            expect(match.gameScorePanel[match.player2.gameScore]).toEqual(0);
            expect(match.player1.setScore).toEqual(0);
            expect(match.player2.setScore).toEqual(0);

        });

        it('White game: As a player who wins every game of a set, my score should respectively be [0, 15, 30, 40] then add a set point', function () {
            //Makes player1 win the first games
            expect(match.gameScorePanel[match.player1.gameScore]).toEqual(0);
            match.playGame(1, 0);
            expect(match.gameScorePanel[match.player1.gameScore]).toEqual(15);
            match.playGame(1, 0);
            expect(match.gameScorePanel[match.player1.gameScore]).toEqual(30);
            match.playGame(1, 0);
            expect(match.gameScorePanel[match.player1.gameScore]).toEqual(40);
            expect(match.player1.gamePhase).toEqual('matchpoint');

            //Give Set point to player1
            match.playGame(1, 0);
            expect(match.player1.setScore).toEqual(1);
        });

        it('equality: if both players have a score of 40, then the status match should be "equality"', function () {
            //Gives a score of 40 to player1
            match.playGame(1, 0);
            match.playGame(1, 0);
            match.playGame(1, 0);

            //Gies a score of 40 to player2
            match.playGame(0, 1);
            match.playGame(0, 1);
            match.playGame(0, 1);

            expect(match.player1.gamePhase).toEqual('equality');
        });

        it('Advantage: When a player win after an equality, the status is "matchpoint"', function () {
            //Gives a score of 40 to player1
            match.playGame(1, 0);
            match.playGame(1, 0);
            match.playGame(1, 0);

            //Gies a score of 40 to player2
            match.playGame(0, 1);
            match.playGame(0, 1);
            match.playGame(0, 1);
            
            //Gives advantage to player1
            match.playGame(1, 0);
            expect(match.player1.gamePhase).toEqual('matchpoint');
        });

        it('Should reset game score after a set point has been won', function () {
           
            match.playGame(1, 0);
            for(let i = 0; i < 4; i++) {
                match.playGame(0, 1);
            } 

            expect(match.player1.gameScore).toEqual(0);
            expect(match.player2.gameScore).toEqual(0);
        });

        describe('Win conditions', function () {
            it('Should be a victory if the looser has 6 points and the looser less than 5 points', function () {
                let count = match.victoryConditions.standard * consecutiveSuccessesToWinGame;

                for(let i = 0; i < count; i++) {
                    match.updateGameState(match.player1, match.player2);
                }                
                expect(document.getElementById("info").textContent).toEqual('The winner is Sampras')
            });

            it('Should not be a victory if the looser has 6 points and the looser 5 points', function () {
                let count = match.victoryConditions.standard * consecutiveSuccessesToWinGame;
                let mincount = 5 * consecutiveSuccessesToWinGame;

                for(let i = 0; i < mincount; i++) {
                    match.updateGameState(match.player2, match.player1);
                }

                for(let i = 0; i < count; i++) {
                    match.updateGameState(match.player1, match.player2);
                }                
                expect(document.getElementById("info").textContent).toEqual('')
            });

            it('Should be a victory if the looser has 6 points and the winner 7 points', function () {
                let count = match.victoryConditions.absolute * consecutiveSuccessesToWinGame;
                let mincount = (match.victoryConditions.absolute - 2) * consecutiveSuccessesToWinGame;

                for(let i = 0; i < mincount; i++) {
                    match.updateGameState(match.player1, match.player2);
                } 

                for(let j = 0; j < count; j++) {
                    match.updateGameState(match.player2, match.player1);
                } 

                expect(document.getElementById("info").textContent).toEqual('The winner is Agassi')
            });
        });
        
    });
}); 
