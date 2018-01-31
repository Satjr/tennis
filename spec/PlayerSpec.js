import Player from '../src/Player'

describe('Player', function () {
    const player1 = new Player(0, 1, 'default', 'Sampras');

    it('parameters are in the right order', function () {
      expect(player1.gameScore).toEqual(0);
      expect(player1.setScore).toEqual(1);
      expect(player1.gamePhase).toEqual('default');
      expect(player1.name).toEqual('Sampras');
    });

    it('Setters are working properly', function () {
      player1.gameScore = 'foo';
      player1.setScore = 'bar';
      player1.gamePhase = 'baz';

      expect(player1.gameScore).toEqual('foo');
      expect(player1.setScore).toEqual('bar');
      expect(player1.gamePhase).toEqual('baz');
    });

    it('play should return a number between 0 and 1', function () {
      let playerPerformance = player1.play();

      expect(playerPerformance).toBeGreaterThan(0);
      expect(playerPerformance).toBeLessThan(1);
      expect(typeof playerPerformance).toBe('number');
    });
  });
  