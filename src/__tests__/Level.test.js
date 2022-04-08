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
        const lvl = new Level(canvas, context, 5, 1);
        expect(lvl).toBeTruthy();
    });

    test("Has correct jump height after initialization",() =>{
        const lvl = new Level(canvas, context, 5, 1);
        expect(lvl.getJumpHeight()).toBe(5);
    });

    test("Has correct starting speed after initialization",() =>{
        const lvl = new Level(canvas, context, 5, 1);
        expect(lvl.getStartSpeed()).toBe(1);
    });


});

describe("Level functionality", () => {
    let canvas
    let context;
    beforeEach(() => {
        canvas = document.createElement("canvas");
        context = canvas.getContext("2d");
    });

    test("Gives acceptable new height for the next platform", () => {
        const lvl = new Level(canvas, context, 5, 1);
        for(let i = 0; i < 1000; i++) {
            const nextHeight = lvl.getNextPlatformHeight();
        
            expect(nextHeight).toBeLessThan(canvas.height);
            expect(nextHeight).toBeGreaterThan(canvas.height/2 - lvl.getJumpHeight());
        }
    });

    //currently I defined "okay" as a value starting from character width to 1/4 of canvas.width
    test("Gives acceptable width for the next platform", () => {
        const lvl = new Level(canvas, context, 5, 1);
        const nextWidth = lvl.getNextWidth();
        expect(nextWidth).toBeLessThan(canvas.width/4);
        expect(nextWidth).toBeGreaterThanOrEqual(60); //current character width
        
    })

    
    //Position should be such that at least from one point of a current platform
    // the next platform can be reached
    test("Gives acceptable new x-position for the next platform", () => {
        const lvl = new Level(canvas, context, 5, 1);
        

    });
})
