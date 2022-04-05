import Game from '../game';

test('it can initiate game instance', () => {
  const game = new Game();

  expect(game).toBeTruthy();
  expect(game).not.toBeNull();
  expect(game).toBeInstanceOf(Game);
});