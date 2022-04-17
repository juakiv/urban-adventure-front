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
    character.update(); //toimii ilman arvoja, sillä undefined käy falsesta

    expect(character.getPosY()).toBeLessThan(400);
  });

  test("it doesn't jump through objects", () => {
    for(let i = 0; i < 100; i++) {
      //putoamista
      character.update(false, null);
    }
    
    //nyt jos annetaan korkeus, jolla platformin yläpinta on, niin hahmon pitäisi asettua siihen, jos olisi pitänyt pysähtyä (true)
    character.update(true, 450);
    expect(character.getPosY()).toBe(450 - 120); // vähennetään hahmon korkeus

  })
});