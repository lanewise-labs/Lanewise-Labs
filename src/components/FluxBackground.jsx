import { useEffect, useRef } from 'react';
import FluxLines from '../lib/FluxLines';

export default function FluxBackground() {
    const boxRef = useRef(null);

    useEffect(() => {
        const flux = new FluxLines(boxRef.current, {
            colors: ['#2447F5', '#00E0FF', '#E8F2F7'],
            speed: 0.35,
            scale: 1.8,
            glow: 1.8,
            rimWidth: 0.2,
            lineWidth: 1,
            flowDirection: 'down',
            opacity: 0.75,
            mouseInteraction: true,
            clickSwirl: true,
            dpr: Math.min(window.devicePixelRatio || 1, 1.5)
        });

        return () => flux.destroy();
    }, []);

    return <div className="flux" ref={boxRef} aria-hidden="true" />;
}
