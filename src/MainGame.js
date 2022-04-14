import React, { useRef, useEffect, useState } from 'react';
import Game from './game';

const MainGame = props => {
    const canvasRef = useRef(null);
    const [game, setGame] = useState(null);

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

            window.addEventListener("death-event", e => {
                setIsGameRunning(false);
                setCurrentMenu("death");
            });
        }
    }, []);

    const startGame = () => {
        setIsGameRunning(true);
        game.start();
    }


    // eri käyttöliittymän osat komponenteiks?
    // kansioon ui
    return (
        <div id="main-game">
            {!isGameRunning &&
            <div id="ui">
                {currentMenu === "main" && <div id="main-menu">
                    <button onClick={() => startGame()}>Start Game</button>
                    <button onClick={() => alert("Kesken...")}>High Scores</button>
                </div>}
                {currentMenu === "death" && <div id="death-menu">
                    <h2>hups...</h2>
                    <button onClick={() => startGame()}>Restart Game</button>
                </div>}
            </div>
            }
            <canvas data-testid="canvas" ref={canvasRef} width = {props.width} height = {props.height} />
        </div>
    );
}

export default MainGame;