import Character from "../game/Character";

describe("character tests", () => {
  let character;

  beforeEach(() => {
    character = new Character();
  })

  test("it can jump", () => {
    expect(character.getIsJumping()).toBeFalsy();

    character.jump();
    
    expect(character.getIsJumping()).toBeTruthy();
  });
});