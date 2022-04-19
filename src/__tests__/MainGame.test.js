import { render, screen, waitFor } from '@testing-library/react';
import MainGame from '../MainGame';
import WS from "jest-websocket-mock";

describe("it renders correct content", () => {
    let server;
    beforeAll(() => {
        // create a WS instance, listening on port 1234 on localhost
        server = new WS("ws://localhost:3001");
        //await server.connected; // wait for the server to have established the connection
    });
    
    test("it renders", () => {
        render(<MainGame/>);
        const wrappingDiv = screen.getByTestId("main-game");
        expect(wrappingDiv).toBeInTheDocument();   
    });

    test("it renders correct part when game is not running", () => {
        render(<MainGame/>);
        const ui = screen.getByTestId("ui");
        expect(ui).toBeInTheDocument();
    });

    test("it renders correct part when game is running", async () => {
    
        render(<MainGame/>);
        

        const connecting = screen.getByText(/Connecting/);
        expect(connecting).toBeInTheDocument();

        await server.connected;
        const gameStart = screen.getByTestId("game-start");        
        expect(gameStart).toBeInTheDocument();
        
    });
});