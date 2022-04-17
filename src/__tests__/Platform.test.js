import Platform from "../game/Level/Platform";

describe("Tests about Platform's existence", () => {
    let platform;
    let canvas;
    // jokaiselle Platformin testille tarvitsee canvasin ja Platformin alustuksen
    beforeEach(() => {
        canvas = document.createElement("canvas");
        canvas.width = 700;
        canvas.height = 500;
        platform = new Platform(100, 80, 0, canvas, canvas.getContext("2d"));
    });

    test("Is there a platform", () => {
        expect(platform).toBeTruthy();
    });

    // testataan, että piirtämiseen käytetyt arvot ovat odotetun laiset
    test("Does Platform compute its size correctly", () => {
        expect(platform.getY()).toBe(500-100); // canvas.height - platform's height from bottom
        expect(platform.getWidth()).toBe(80);
        expect(platform.getX()).toBe(0); //left most
    });

    //... ei aiheuta virhettä, näkee suorana ruudulla lopputuloksen
    test("Does draw work?", () => {
        expect(platform.draw());
    });

    // Platformin sijainti päivittyy halutusti moveInX() kutsumalla
    test("Platform is moved correctly",() => {
        const beforeMoving = platform.getX();
        platform.moveInX(5); //moves platform to left
        const afterMoving = platform.getX();
        expect(afterMoving).toBe(beforeMoving-5);
    });
});