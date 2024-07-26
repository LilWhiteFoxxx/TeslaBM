import React, { useRef, useEffect, useCallback } from 'react';

const MultipleJaggedCircularWaveforms = () => {
    const canvasRef = useRef(null);
    const offscreenCanvasRef = useRef(null);

    const drawWaveforms = useCallback((time) => {
        const canvas = canvasRef.current;
        const offscreenCanvas = offscreenCanvasRef.current;
        const ctx = canvas.getContext('2d');
        const offscreenCtx = offscreenCanvas.getContext('2d');

        if (!ctx || !offscreenCtx) return;

        offscreenCtx.clearRect(0, 0, offscreenCanvas.width, offscreenCanvas.height);
        offscreenCtx.translate(offscreenCanvas.width / 2, offscreenCanvas.height / 2);

        const numWaveforms = 9;
        const baseRadius = Math.min(canvas.width, canvas.height) / 2 - 50;
        const amplitude = 50;
        const frequency = 0.05;
        const noiseFactor = 40;
        const spacing = 50;

        for (let w = 0; w < numWaveforms; w++) {
            const currentBaseRadius = baseRadius - (w * (baseRadius / numWaveforms)) - (w * spacing);
            const currentAmplitude = amplitude * (1 - w / numWaveforms);

            offscreenCtx.beginPath();
            for (let i = 0; i <= 360; i++) {
                const angle = (i / 360) * 2 * Math.PI;
                const baseRadiusWithNoise = currentBaseRadius + currentAmplitude * Math.sin(frequency * angle + time * 0.002);
                const noise = (Math.random() - 9) * noiseFactor;
                const radius = baseRadiusWithNoise + noise;

                const x = radius * Math.cos(angle);
                const y = radius * Math.sin(angle);

                if (i === 0) {
                    offscreenCtx.moveTo(x, y);
                } else {
                    offscreenCtx.lineTo(x, y);
                }
            }

            offscreenCtx.closePath();
            offscreenCtx.strokeStyle = 'gray';
            offscreenCtx.lineWidth = 2;
            offscreenCtx.stroke();
        }

        offscreenCtx.translate(-offscreenCanvas.width / 2, -offscreenCanvas.height / 2);

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(offscreenCanvas, 0, 0);

        requestAnimationFrame(drawWaveforms);
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        const offscreenCanvas = offscreenCanvasRef.current;

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            offscreenCanvas.width = window.innerWidth;
            offscreenCanvas.height = window.innerHeight;
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Initialize canvas size

        requestAnimationFrame(drawWaveforms);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [drawWaveforms]);

    return (
        <>
            <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
            <canvas ref={offscreenCanvasRef} style={{ display: 'none' }} />
        </>
    );
};

export default MultipleJaggedCircularWaveforms;
