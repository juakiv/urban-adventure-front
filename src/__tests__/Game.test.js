import Game from '../game';

test('it can initiate game instance', () => {
  let canvas = document.createElement("canvas");
  let context = canvas.getContext("2d");
  const game = new Game(canvas, context);

  expect(game).toBeTruthy();
  expect(game).not.toBeNull();
  expect(game).toBeInstanceOf(Game);
});