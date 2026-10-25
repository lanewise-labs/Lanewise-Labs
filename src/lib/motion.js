let burstCounter = 0;

export const sceneScale = () =>
    Math.max(0.5, Math.min(1.4, Math.min(window.innerWidth, window.innerHeight) / 800));

export const FLY_OPTIONS = { duration: 2300, easing: 'linear', fill: 'forwards' };

export function flyFrames(rect, sceneEl, dir, cyan) {
    const k = sceneScale();
    const dx = sceneEl.clientWidth / 2 - (rect.left + rect.width / 2);
    const dy = sceneEl.clientHeight / 2 - (rect.top + rect.height / 2);
    const move = (x, y, rot, scale) =>
        `translate(${dx + x * k}px,${dy + y * k}px) rotate(${rot}deg) scale(${scale})`;
    const color = cyan ? '#00E0FF' : '#E8F2F7';

    return [
        { offset: 0, transform: 'translate(0px,0px) rotate(0deg) scale(1)', color: '#E8F2F7', easing: 'cubic-bezier(.3,0,.2,1)' },
        { offset: 0.3, transform: move(dir * 240, dir * 150, dir * 140, 1.7), color, easing: 'cubic-bezier(.4,0,.4,1)' },
        { offset: 0.62, transform: move(dir * 260, -dir * 120, dir * 300, 1.9), color, easing: 'cubic-bezier(.7,0,.9,.4)' },
        { offset: 1, transform: move(0, 0, dir * 360, 1.3), color }
    ];
}

export function makeBurst() {
    const k = sceneScale();
    const colors = ['#00E0FF', '#E8F2F7', '#2447F5', '#00E0FF'];
    const items = [{ className: 'flash' }, { className: 'ring' }];

    for (let i = 0; i < 30; i++) {
        const angle = Math.random() * Math.PI * 2;
        const distance = (100 + Math.random() * 240) * k;
        const size = 4 + Math.random() * 8;

        items.push({
            className: 'p',
            style: {
                '--x': `${Math.cos(angle) * distance}px`,
                '--y': `${Math.sin(angle) * distance}px`,
                '--t': `${600 + Math.random() * 500}ms`,
                width: `${size}px`,
                height: `${size}px`,
                margin: `${-size / 2}px 0 0 ${-size / 2}px`,
                background: colors[i % 4]
            }
        });
    }

    return items.map(item => ({ ...item, id: ++burstCounter }));
}
