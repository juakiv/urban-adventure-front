import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import MainGame from '../MainGame';
import WS from "jest-websocket-mock";

describe("it renders correct content", () => {
    let server;
    beforeEach(() => {
        // create a WS instance, listening on port 1234 on localhost
        server = new WS("ws://localhost:3001");
    });

    afterEach(() => {
        WS.clean();
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

    test("it renders game start button correctly after connection is made", async () => {
    
        render(<MainGame/>);
        
        
        const connecting = screen.getByText(/Connecting/);
        expect(connecting).toBeInTheDocument();

        await server.connected;
        
        const gameStart = screen.getByTestId("game-start");
        expect(gameStart).toBeInTheDocument();     
        
    });

    test("it renders scoreboard correctly when clicked (and back)", async() => {
        render(<MainGame/>);
        await server.connected;
        server.send(
            JSON.stringify({"messageType" : "scores",
            "scores" : [{"name" : "Testi" , "score" : 100 , "index" : 1}]
        })
        );
        fireEvent.click(screen.getByText(/High Scores/));
        
        const oneCell = screen.getByText(/Name/);
        
        expect(oneCell).toBeInTheDocument();

        fireEvent.click(screen.getByText(/Back/));

        const connecting = screen.getByText(/Start Game/);
        expect(connecting).toBeInTheDocument();
    });

    test("it starts", async() => {
        render(<MainGame/>);
        await server.connected;
        
        fireEvent.click(screen.getByText(/Start Game/));
        const showsScore = screen.getByText(/Score:/);

        expect(showsScore).toBeInTheDocument();

    });

    
});