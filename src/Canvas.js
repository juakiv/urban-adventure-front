import React, {useRef, useEffect } from 'react';

const Canvas = props => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        
        if(context != null) {
            context.fillStyle = '#000000';
            context.fillRect(0,0, context.canvas.width,
            context.canvas.height)
        }
        
    }, []);

    return <canvas title="canvas" ref={canvasRef} width = {props.width} height = {props.height} />
}

export default Canvas;