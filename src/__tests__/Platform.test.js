import Platform from "../game/Level/Platform";

describe("Tests about Platform's existence", () => {
    let platform;
    let canvas;
    beforeEach(() => {
        canvas = document.createElement("canvas");
        canvas.width = 700;
        canvas.height = 500;
        platform = new Platform(100, 80, 0, canvas);
    });

    test("Is there a platform", () => {
        expect(platform).toBeTruthy();
    });

    test("Does Platform compute its size correctly", () => {
        expect(platform.getY()).toBe(500-100); // canvas.height - platform's height from bottom
        expect(platform.getWidth()).toBe(80);
        expect(platform.getX()).toBe(0); //left most
    });

    test("Does draw work?", () => {
        expect(platform.draw());
    });
});