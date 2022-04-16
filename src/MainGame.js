import React, { useRef, useEffect, useState } from 'react';
import Game from './game';

const MainGame = props => {
    const canvasRef = useRef(null);

    const [socket, setSocket] = useState(null);
    const [connecting, setConnecting] = useState(true);

    const [game, setGame] = useState(null);
    const [score, setScore] = useState(null);
    const [username, setUsername] = useState("");
    const [isNameValid, setIsNameValid] = useState(false);

    const [scores, setScores] = useState([]);
    const [scoresLoading, setScoresLoading] = useState(true);

    const [isGameRunning, setIsGameRunning] = useState(false);
    const [currentMenu, setCurrentMenu] = useState("main");

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        const ws = new WebSocket(`ws://${process.env.NODE_ENV === 'production' ? "urban-adventure-game.herokuapp.com" : "localhost:3001"}`);
        setSocket(ws);

        ws.addEventListener("open", e => {
            setConnecting(false);
        });

        ws.addEventListener("message", e => {
            let message = JSON.parse(e.data);
            if(message["messageType"] === "scores") {
                setScores(message["scores"]);
                setScoresLoading(false);
            }
        });

        if(context != null) {
            context.fillStyle = '#000000';
            context.fillRect(0,0, context.canvas.width,
                context.canvas.height);
            setGame(new Game(canvas, context));

            window.addEventListener("death-event", () => {
                setIsGameRunning(false);
                setCurrentMenu("death");
            });
        }
    }, []);


    const handleNameChange = e => {
        setUsername(e.target.value);
    }

    const submitHandling = () => {
        if(!username.match(/\w+/)) {
            alert("Kelvoton nimi");
            return;
        }

        let userdata = JSON.stringify({type: "addScore", username, score});
        socket.send(userdata);
        setIsNameValid(true); 
    }

    const requestLoadScores = () => {
        socket.send(JSON.stringify({type: "showScores"}));
        setCurrentMenu("scores");
    }


    const startGame = () => {
        setIsGameRunning(true);
        game.start();
        game.setScoreFunction(setScore);
        setIsNameValid(false);
    }


    // eri käyttöliittymän osat komponenteiks?
    // kansioon ui
    return (
        <div id="main-game">
            {!isGameRunning ?
            <div id="ui">
                {connecting && <div id="main-menu">
                    <h2>Connecting to the server...</h2>
                </div>}
                {!connecting && currentMenu === "main" && <div id="main-menu">
                    <img src="/logo.png" alt="" />
                    <button onClick={() => startGame()}>Start Game</button>
                    <button onClick={() => requestLoadScores()}>High Scores</button>
                </div>}
                {!connecting && currentMenu === "scores" && <div id="scoreboard-menu">
                    <img src="/scores.png" alt="" />

                    {scoresLoading ? <h2>Loading Scores...</h2> :
                    <div id="scoreboard">
                        <div id="scoreboard-head">
                            <div class="scoreboard-cell" style={{maxWidth: 40}}>#</div>
                            <div class="scoreboard-cell">Name</div>
                            <div class="scoreboard-cell" style={{maxWidth: 100}}>Score</div>
                        </div>
                        <div id="scoreboard-body">

                            {scores.map(e =>
                            <div class="scoreboard-row" key={e.index}>
                                <div class="scoreboard-cell" style={{maxWidth: 40}}>{e.index}</div>
                                <div class="scoreboard-cell">{e.name}</div>
                                <div class="scoreboard-cell" style={{maxWidth: 100}}>{e.score}</div>
                            </div>
                            )}
                        </div>
                    </div>}
                    <button onClick={() => {setScoresLoading(true); setCurrentMenu("main")}}>Back</button>
                </div>}
                {!connecting && currentMenu === "death" && <div id="death-menu">
                    <img src="/oops.png" alt="" />
                    <h2>Score: {score}</h2>
                    {!isNameValid && score > 0 ? 
                    <>
                        <label>
                            Input your username:
                            <input type="text" name="username" onChange={handleNameChange} />
                        </label>
                    
                        <button onClick={() => submitHandling()}>
                            Submit
                        </button>
                    </>
                    : <button onClick={() => requestLoadScores()}>Show High Scores</button>}
                    
            
                    <button onClick={() => startGame()}>Restart Game</button>
                </div>}
            </div>
            :
            <div id="score">Score: {score}</div>
            }
            <canvas data-testid="canvas" ref={canvasRef} width = {props.width} height = {props.height} />
        </div>
    );
}

export default MainGame;