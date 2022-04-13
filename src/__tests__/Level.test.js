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

    test("Has correct speed after setting a new speed", () => {
        lvl.setSpeed(20);
        expect(lvl.getSpeed()).toBe(20);
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
            
        
            expect(nextHeight).toBeLessThan((100) + 0.8 * level.getJumpHeight());
            expect(nextHeight).toBeGreaterThan(0); // first platform's height
        }
    });

    //currently I defined "okay" as a value starting from character width to 1/4 of canvas.width
    test("Gives acceptable width for the next platform", () => {
        const nextWidth = lvl.getNextWidth();
        expect(nextWidth).toBeLessThan(canvas.width/4);
        expect(nextWidth).toBeGreaterThanOrEqual(60); //current character width
        
    });

    test("Returns correct possible jump distance", () => {
        // when jumpHeight is 5, speed is 1 and g is 0.2 and initial height is 100 and last height is 0
        const tToTop = Math.sqrt((2 * (100 + 5))/ 0.2) // starting height is 100, end is 5
        const tToBottom = Math.sqrt((2*(100+5 - 0))/ 0.2); // startheight is 105, end is 0
        expect(lvl.getJumpDistance(100,0)).toBe(lvl.getSpeed() * 24 * (tToTop + tToBottom)); // 24 is fps used in test
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

    
    //Position should be such that at least from one point of a current platform
    // the next platform can be reached
    test("Gives acceptable new x-position for the next platform", () => {
        
        //next xPosition of a Platform relative to the position before
        // used starting height = 100 and next height = 0
        const xPos = lvl.getNextXPosition(100,0);
        expect(xPos).toBeGreaterThanOrEqual(160); // Next platform can start from the old one's ending point
        expect(xPos).toBeLessThan(160 + lvl.getJumpDistance(100, 0)); // 160 is the starting width
        //console.log(xPos + " and max " +  (160 + lvl.getJumpDistance()));
    }); 

    test("Draw doesn't fail miserably", () => {

        lvl.draw();

    })

    test("Platforms move correctly in x-direction", () => {
        const platforms = lvl.getPlatforms();
        const xPosBefore = platforms.map(platform => platform.getX());
        lvl.movePlatformsInX(5);
        for(let i = 0; i < platforms.length; i++) {
            expect(platforms[i].getX()).toBe(xPosBefore[i]-lvl.getSpeed());
        }
    });

    test("Remove platform if its off the screen", () => {
        lvl.createPlatforms();
        const platforms = lvl.getPlatforms();
        const firstPlatform = platforms[0];
        // first platform is 160px wide so this gets it out of the canvas
        for(let i = 0; i < 162; i++) {
            lvl.movePlatformsInX();
        } 
        lvl.removeOldPlatforms();
        expect(platforms.find(p => p == firstPlatform)).not.toBeTruthy();
    });

    test("Is coordinate in some platform's range in x direction", () => {
        //is in range
        const index = lvl.isInPlatformsRange(5);
        expect(index).toBe(0);
        //not in range
        const index2 = lvl.isInPlatformsRange(170);
        expect(index2).toBeNull();

    });

    test("Is y coordinate on a platform", () => {
        //is on a platform
        const isOnPlatform = lvl.isOnAPlatform(canvas.height-100,0);
        expect(isOnPlatform).toBe(true);
        
        //not on a platform
        const isNotOnPlatform = lvl.isOnAPlatform(canvas.height-200,0);
        expect(isNotOnPlatform).toBeFalsy();

        //is too low so not on a platform
        const alsoNotOnPlatform = lvl.isOnAPlatform(canvas.height-94,0);
        expect(alsoNotOnPlatform).toBeFalsy();
    });

    test("Should stop falling", () => {
        const shouldStop = lvl.shouldStopFalling(50, canvas.height - 100);
        expect(shouldStop).toBeTruthy();

        const shouldNotStop = lvl.shouldStopFalling(50, canvas.height - 200);
        expect(shouldNotStop).toBeFalsy();

        const shouldNotStop2 = lvl.shouldStopFalling(200, canvas.height - 50);
        expect(shouldNotStop2).toBeFalsy();
    });

    test("Is above a platform", () => {
        expect(lvl.isAboveAPlatform(50, canvas.height - 200)).toBeTruthy();
        expect(lvl.isAboveAPlatform(50, canvas.height - 50)).toBeFalsy();
        
    });
})
