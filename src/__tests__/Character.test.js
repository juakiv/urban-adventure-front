import Character from "../game/Character";

describe("character tests", () => {
  let character;
  let canvas, context;
  beforeEach(() => {
    canvas = document.createElement("canvas");
    context = canvas.getContext("2d");
    character = new Character(canvas, context);
  })

  test("it can jump", () => {
    expect(character.getIsJumping()).toBeFalsy();

    character.setIsJumping(true);
    expect(character.getIsJumping()).toBeTruthy();
    character.update();

    expect(character.getPosY()).toBeLessThan(400);
  });
});