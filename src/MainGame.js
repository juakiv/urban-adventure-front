import React, { useRef, useEffect, useState } from 'react';
import Game from './game';

/**
 * Komponentti, joka seuraa pelin tilaa ja esittää käyttäjälle tilan mukaisen tiedon
 * On yhteydessä palvelimeen
 */
const MainGame = props => {
    const canvasRef = useRef(null);

    const [socket, setSocket] = useState(null);
    const [connecting, setConnecting] = useState(true);
    const [pingPong, setPingPong] = useState(null);
    const [reconnect, setReconnect] = useState(null);
    const [reconnectCounter, setReconnectCounter] = useState(0);

    const [game, setGame] = useState(null);
    const [score, setScore] = useState(null);
    const [username, setUsername] = useState("");
    const [isNameValid, setIsNameValid] = useState(false);

    const [scores, setScores] = useState([]);
    const [scoresLoading, setScoresLoading] = useState(true);

    const [isGameRunning, setIsGameRunning] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [currentMenu, setCurrentMenu] = useState("main");

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        const ws = new WebSocket(`${process.env.NODE_ENV === 'production' ? "wss://urban-adventure-game.herokuapp.com" : "ws://localhost:3001"}`);
        if(ws) setSocket(ws);

        if(context != null) {
            setGame(new Game(canvas, context));

            window.addEventListener("death-event", () => {
                setIsGameRunning(false);
                setIsPaused(false);
                setCurrentMenu("death");
            });
        }
    }, [reconnect]);

    useEffect(() => {
        if(!socket) return false;

        // yhteyden avautuessa
        socket.addEventListener("open", _e => {
            setReconnectCounter(0);
            if(socket.readyState === WebSocket.OPEN) {
                setConnecting(false);

                if(!pingPong) {
                    let pingPongInterval = setInterval(() => {
                        socket.send(JSON.stringify({type: "ping"}));
                    }, 10000);
                    setPingPong(pingPongInterval);
                }
            }
        });

        // kuunnellaan websocket-viestejä
        socket.addEventListener("message", e => {
            let message = JSON.parse(e.data);
            if(message["messageType"] === "scores") {
                setScores(message["scores"]);
                setScoresLoading(false);
            }
        });
        
        // koitetaan yhdistää uudelleen 5 kertaa,
        // jos yhteys katkeaa
        socket.addEventListener("close", _e => {
            setConnecting(true);
            setSocket(null);

            clearInterval(pingPong);
            setPingPong(null);
            
            if(reconnectCounter < 5) {
                setReconnectCounter(counter => counter + 1);
                setReconnect(new Date());
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [socket]);

    /**
     * Nimimerkin syöttämiseen käytetty käsittelyfunktio
     */
    const handleNameChange = e => {
        setUsername(e.target.value);
    }

    /**
     * Käsittelee syötetyt arvot ja lähettää kelvollisen nimimerkin tapauksessa palvelimelle
     */
    const submitHandling = () => {
        if(!username.match(/\w+/)) {
            alert("Kelvoton nimi");
            return;
        }

        let userdata = JSON.stringify({type: "addScore", username, score});
        socket.send(userdata);
        setIsNameValid(true); 
    }

    /**
     * Aiempien tulosten haku ja siirtyminen pisteiden tarkasteluun
     */
    const requestLoadScores = () => {
        socket.send(JSON.stringify({type: "showScores"}));
        setCurrentMenu("scores");
    }

    /**
     * Aloittaa pelin
     */
    const startGame = () => {
        setIsGameRunning(true);
        game.start();
        game.setScoreFunction(setScore);
        setIsNameValid(false);
    }

    /**
     * Siirtää pelin tauolle
     */
    const pauseGame = () => {
        game.pause();
        setIsPaused(true);
    }

    /**
     * Jatkaa peliä tauolta
     */
    const resumeGame = () => {
        game.resume();
        setIsPaused(false);
    }


    // eri käyttöliittymän osat komponenteiks?
    // kansioon ui
    return (
        <div id="main-game" data-testid="main-game">
            {!isGameRunning ?
            <div id="ui" data-testid="ui">
                {connecting && <div id="main-menu">
                    <h2>Connecting to the server...</h2>
                </div>}
                {!connecting && currentMenu === "main" && <div id="main-menu">
                    <img src="/logo.png" alt="" />
                    <button data-testid="game-start" onClick={() => startGame()}>Start Game</button>
                    <button onClick={() => requestLoadScores()}>High Scores</button>
                </div>}
                {!connecting && currentMenu === "scores" && <div id="scoreboard-menu">
                    <img src="/scores.png" alt="" />

                    {scoresLoading ? <h2>Loading Scores...</h2> :
                    <div id="scoreboard">
                        <div id="scoreboard-head">
                            <div className="scoreboard-cell" style={{maxWidth: 40}}>#</div>
                            <div className="scoreboard-cell">Name</div>
                            <div className="scoreboard-cell" style={{maxWidth: 100}}>Score</div>
                        </div>
                        <div id="scoreboard-body">

                            {scores.map(e =>
                            <div className="scoreboard-row" key={e.index}>
                                <div className="scoreboard-cell" style={{maxWidth: 40}}>{e.index}</div>
                                <div className="scoreboard-cell">{e.name}</div>
                                <div className="scoreboard-cell" style={{maxWidth: 100}}>{e.score}</div>
                            </div>
                            )}
                        </div>
                    </div>}
                    <button onClick={() => {setScoresLoading(true); setCurrentMenu("main")}}>Back</button>
                </div>}
                {!connecting && currentMenu === "death" && <div id="death-menu">
                    <img src="/oops.png" alt="" />
                    <div id="score">Score: {score}</div>
                    {!isNameValid && score > 0 ? 
                    <>
                        <h2>Submit your score</h2>
                        <div id="scoreinput-group">
                            <input placeholder="Enter nickname..." type="text" name="username" onChange={handleNameChange} />
                            <button onClick={() => submitHandling()}>
                                Submit
                            </button>            
                        </div>
                    </>
                    : <button onClick={() => requestLoadScores()} style={{marginBottom: 20}}>Show High Scores</button>}
                    
            
                    <button onClick={() => startGame()}>Restart Game</button>
                </div>}
            </div>
            :
            <>
                <div id="score" data-testid="score">Score: {score}</div>
                <div id="pause" onClick={() => pauseGame()}></div>
                {isPaused &&<div id="pause-menu">
                    <h2>Paused.</h2>
                    <div id="resume" onClick={() => resumeGame()}></div>
                </div>}
            </>
            }
            <canvas data-testid="canvas" ref={canvasRef} width = {props.width} height = {props.height} />
        </div>
    );
}

export default MainGame;