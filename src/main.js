import Player from './Player';
import Match from './Match';
    
(function() {
    const p1 = new Player(0, 0, 'default', 'Sampras');
    const p2 = new Player(0, 0, 'default', 'Agassi');

    const $DOMConf = {
       gs1: document.getElementById("game-score-1"),
       gs2: document.getElementById("game-score-2"),
       sc1: document.getElementById("set-score-1"),
       sc2: document.getElementById("set-score-2"),
       info: document.getElementById("info"),
       buttons: document.getElementsByTagName("BUTTON"),
       game: document.getElementsById('next-game')
    }

    const match = new Match(p1, p2, $DOMConf);

    match.init();

    /**** TOOLS FOR UI TESTING ****/
    document.getElementById("cheat-1").addEventListener('click', (e) => {
        match.playGame(1, 0);
    });

    document.getElementById("cheat-2").addEventListener('click', (e) => {
        match.playGame(0, 1);
    });
})();
    