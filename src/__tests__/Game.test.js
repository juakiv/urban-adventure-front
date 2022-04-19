import { wait } from '@testing-library/user-event/dist/utils';
import Game from '../game';


describe("Gameloop working correctly", () => {
  let canvas;
  let context;
  let game;
  beforeEach(() => {
    canvas = document.createElement("canvas");
    context = canvas.getContext("2d");
    game = new Game(canvas, context);
  })

  test('it can initiate game instance', () => {
    expect(game).toBeTruthy();
    expect(game).not.toBeNull();
    expect(game).toBeInstanceOf(Game);
  });
  
  

});
