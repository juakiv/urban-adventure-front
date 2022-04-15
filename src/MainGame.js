import React, { useRef, useEffect, useState } from 'react';
import Game from './game';

const MainGame = props => {
    const canvasRef = useRef(null);
    const [game, setGame] = useState(null);
    const [score, setScore] = useState(null);

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


    const startGame = () => {
        setIsGameRunning(true);
        game.start();
        game.setScoreFunction(setScore);
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
                    <h2>tähän tulee lomake nimelle yms vielä</h2>
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