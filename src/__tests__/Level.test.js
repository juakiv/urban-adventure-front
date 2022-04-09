import { cleanup } from "@testing-library/react";
import Level from "../game/Level";

//
describe("Does Level instance exist correctly",() => {
    let canvas;
    let context;
    let lvl;
    beforeEach(() => {
        canvas = document.createElement("canvas");
        context = canvas.getContext("2d");
        lvl = new Level(canvas, context, 5, 1, 0.2);
    });



    test("Is there a Level", () => {
        expect(lvl).toBeTruthy();
    });

    test("Has correct jump height after initialization",() =>{
        expect(lvl.getJumpHeight()).toBe(5);
    });

    test("Has correct starting speed after initialization and gravitational acceleration",() =>{
        expect(lvl.getSpeed()).toBe(1);
        expect(lvl.getG()).toBe(0.2);
    });



});

describe("Level functionality", () => {
    let canvas
    let context;
    let lvl;
    beforeEach(() => {
        canvas = document.createElement("canvas");
        context = canvas.getContext("2d");
        lvl = new Level(canvas, context, 5, 1, 0.2);
    }); 

    test("Gives acceptable new height for the next platform", () => {
        
        for(let i = 0; i < 1000; i++) {
            const level = new Level(canvas, context, 5, 1, 0.2);
            const nextHeight = level.getNextPlatformHeight();
            
        
            expect(nextHeight).toBeLessThan(canvas.height);
            expect(nextHeight).toBeGreaterThan((canvas.height - 100) - 0.8 * level.getJumpHeight()); // first platform's height
        }
    });

    //currently I defined "okay" as a value starting from character width to 1/4 of canvas.width
    test("Gives acceptable width for the next platform", () => {
        const nextWidth = lvl.getNextWidth();
        expect(nextWidth).toBeLessThan(canvas.width/4);
        expect(nextWidth).toBeGreaterThanOrEqual(60); //current character width
        
    });

    test("Returns correct possible jump distance", () => {
        // when jumpHeight is 5, speed is 1 and g is 0.2
        expect(lvl.getJumpDistance()).toBe(1 * Math.sqrt((2 * 5)/ 0.2));
    });

    test("Test that Platforms currently in screen are created and the are in order according to their x-value", () => {
        lvl.createPlatforms();
        let last = null;
        const platforms = lvl.getPlatforms();
        for(let i = 0; i < platforms.length; i++) {
            if ((last != null) && (i != (platforms.length -1) )) {
                expect(platforms[i].getX()).toBeGreaterThan(last);
                expect(platforms[i].getX()).toBeLessThan(canvas.width);
            }
            
            if(i == platforms.length - 1) {
                expect(platforms[i].getX()).toBeGreaterThan(canvas.width);
            }
            
            last = platforms[i].getX();

        }
        
    });

    /*
    //Position should be such that at least from one point of a current platform
    // the next platform can be reached
    test("Gives acceptable new x-position for the next platform", () => {
        const lvl = new Level(canvas, context, 5, 1);
        
        //next xPosition of a Platform relative to the position before
        const xPos = lvl.getNextXPosition();
        expect(xPos).toBeGreaterThanOrEqual(0);
        expect(xPos).toBeLessThan(lvl.getJumpDistance());
        expect(xPos).toBeGreaterThanOrEqual(0); // Next platform can start from the old one's ending point
    }); */
})
