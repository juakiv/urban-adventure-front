import React, { useRef, useEffect, useState } from 'react';
import Game from './game';

const MainGame = props => {
    const canvasRef = useRef(null);
    const [game, setGame] = useState(null);
    const [score, setScore] = useState(null);
    const [username, setUsername] = useState("");
    const [isNameValid, setIsNameValid] = useState(false);

    const [isGameRunning, setIsGameRunning] = useState(false);
    const [currentMenu, setCurrentMenu] = useState("main");

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        
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

    function submitHandling() {
        if(!username.match(/\w+/)) {
            alert("kelvoton nimi");
            return;
        }
        
        const socket = new WebSocket(`ws://${process.env.NODE_ENV === 'production' ? "urban-adventure-game.herokuapp.com" : "localhost:3001"}`);
        socket.onopen = function(e) {
            let userdata = JSON.stringify({ 
                            "username" : username,
                             "score" : score
                            });
            socket.send(userdata);
            socket.close();
            setIsNameValid(true);
        } 
        
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
                {currentMenu === "main" && <div id="main-menu">
                    <img src="/logo.png" alt="" />
                    <button onClick={() => startGame()}>Start Game</button>
                    <button onClick={() => alert("Kesken...")}>High Scores</button>
                </div>}
                {currentMenu === "death" && <div id="death-menu">
                    <img src="/oops.png" alt="" />
                    <h2>Score: {score}</h2>
                    {(!isNameValid) ? 
                        <div>
                        <label>
                            Input your username:
                            <input type="text" name="username" onChange={handleNameChange} />
                        </label>
                    
                        <button onClick={submitHandling}>
                            Submit
                        </button>
                    </div>
                    :
                    <label>
                        TO HIGHSCORE BUTTON ... THINGS YET TO DO!
                    </label>
                    }
                    
            
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