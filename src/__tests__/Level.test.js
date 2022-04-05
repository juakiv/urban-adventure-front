import Level from "../game/Level";

//
describe("Does Level instance exist correctly",() => {
    let canvas
    let context;
    beforeEach(() => {
        canvas = document.createElement("canvas");
        context = canvas.getContext("2d");
    });

    test("Is there a Level", () => {
        const lvl = new Level(canvas, context, 5);
        expect(lvl).toBeTruthy();
    });

    test("Has correct jump height after initialization",() =>{
        const lvl = new Level(canvas, context, 5);
        expect(lvl.getJumpHeight()).toBe(5);
    });


});
