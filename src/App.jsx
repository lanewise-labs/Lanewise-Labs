import { useState, useRef, useEffect, useCallback } from 'react';
import { flushSync } from 'react-dom';
import { FLYER_INDEXES, WORD } from './data/site';
import { REDUCE_MOTION, WIDE_QUERY } from './lib/env';
import { sleep, CANCELLED } from './lib/timing';
import { FLY_OPTIONS, flyFrames, makeBurst } from './lib/motion';
import useTalker from './hooks/useTalker';
import FluxBackground from './components/FluxBackground';
import Title from './components/Title';
import LogoMark from './components/LogoMark';
import Skeleton from './components/Skeletons';
import Dialog from './components/Dialog';
import Menu from './components/Menu';
import PageView from './components/PageView';
import Promo from './components/Promo';

export default function App() {
    const { lines, caretId, talking, say, speak, clearReply, scheduleClear, showStatic } = useTalker();

    const [chars, setChars] = useState({ shown: 0, gone: false, flying: false, hidden: false });
    const [logoFlags, setLogoFlags] = useState({});
    const [menu, setMenu] = useState({ show: false, stagger: true });
    const [bursts, setBursts] = useState([]);
    const [flyers, setFlyers] = useState([]);
    const [shaking, setShaking] = useState(false);
    const [openName, setOpenName] = useState(null);
    const [pageName, setPageName] = useState(null);
    const [pageToken, setPageToken] = useState(0);
    const [bubble, setBubble] = useState({ name: null, key: 0, on: false });
    const [promoOpen, setPromoOpen] = useState(false);

    const sceneRef = useRef(null);
    const logoRef = useRef(null);
    const overlayRef = useRef(null);
    const noticeRef = useRef(null);
    const wbodyRef = useRef(null);
    const charRefs = useRef([]);
    const flyerRefs = useRef([]);
    const openRef = useRef(null);
    const currentRef = useRef(null);
    const hideTimer = useRef(0);
    const promoPending = useRef(false);

    const flag = useCallback((name, on) => {
        setLogoFlags(flags => ({ ...flags, [name]: on }));
    }, []);

    const hideBubble = useCallback(() => {
        setBubble(b => ({ ...b, on: false }));
    }, []);

    const showPromo = useCallback(async () => {
        if (!REDUCE_MOTION) {
            flag('pulse', true);
            await sleep(600);
            flag('pulse', false);
        }

        promoPending.current = openRef.current !== null;
        if (promoPending.current) return;

        setPromoOpen(true);
    }, [flag]);

    const explode = useCallback(() => {
        setBursts(list => [...list, ...makeBurst()]);
        setShaking(true);
    }, []);

    const preview = name => {
        clearTimeout(hideTimer.current);

        if (name === openRef.current) {
            hideBubble();
            currentRef.current = null;
            speak(`${name} currently showing.`);
            return;
        }

        if (name !== currentRef.current) {
            currentRef.current = name;
            setBubble(b => ({ name, key: b.key + 1, on: true }));
        }

        speak('Showing Preview...');
    };

    const hidePreview = () => {
        clearTimeout(hideTimer.current);
        hideTimer.current = setTimeout(() => {
            if (!currentRef.current) return;

            currentRef.current = null;
            hideBubble();

            if (openRef.current) speak(`${openRef.current} currently showing.`);
            else clearReply();
        }, 300);
    };

    const openPage = name => {
        clearTimeout(hideTimer.current);
        hideBubble();
        currentRef.current = null;
        openRef.current = name;

        setOpenName(name);
        setPageName(name);
        setPageToken(t => t + 1);
        speak(`Opening ${name}...`);
    };

    const closeWin = useCallback(() => {
        const name = openRef.current;
        if (!name) return;

        openRef.current = null;
        setOpenName(null);
        speak(`Closing ${name}...`);
        scheduleClear(2200, () => !openRef.current && !currentRef.current);

        if (promoPending.current) showPromo();
    }, [speak, scheduleClear, showPromo]);

    const goTo = name => {
        openPage(name);
        setPromoOpen(false);
    };

    useEffect(() => {
        const layout = () => {
            const scene = sceneRef.current;
            const w = scene.clientWidth;
            const h = scene.clientHeight;
            const wide = WIDE_QUERY.matches;

            scene.style.setProperty('--lx', (wide ? -w * 0.38 : -w * 0.28) + 'px');
            scene.style.setProperty('--ly', (wide ? 0 : -h * 0.26) + 'px');
        };

        layout();
        window.addEventListener('resize', layout);
        return () => window.removeEventListener('resize', layout);
    }, []);

    useEffect(() => {
        const onKey = e => {
            if (e.key !== 'Escape') return;

            closeWin();
            setPromoOpen(false);
        };

        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [closeWin]);

    useEffect(() => {
        if (pageToken > 0) wbodyRef.current.scrollTop = 0;
    }, [pageToken]);

    useEffect(() => {
        if (!promoOpen) return;

        overlayRef.current.querySelector('.cta').focus();
        if (REDUCE_MOTION) return;

        const a = logoRef.current.getBoundingClientRect();
        const b = noticeRef.current.getBoundingClientRect();
        const dx = a.left + a.width / 2 - (b.left + b.width / 2);
        const dy = a.top + a.height / 2 - (b.top + b.height / 2);

        noticeRef.current.animate(
            [
                { transform: `translate(${dx}px,${dy}px) scale(0.1)`, opacity: 0 },
                { transform: 'none', opacity: 1 }
            ],
            { duration: 600, easing: 'cubic-bezier(.2,.9,.3,1)' }
        );
    }, [promoOpen]);

    useEffect(() => {
        let cancelled = false;

        const wait = async ms => {
            await sleep(ms);
            if (cancelled) throw CANCELLED;
        };

        async function run() {
            if (REDUCE_MOTION) {
                setChars(c => ({ ...c, hidden: true }));
                flag('show', true);
                flag('docked', true);
                showStatic(['Hello, welcome to Lanewise Labs.', 'What do you want to do?']);
                setMenu({ show: true, stagger: false });
                showPromo();
                return;
            }

            await Promise.race([document.fonts.ready, sleep(1500)]);
            await wait(400);

            for (let i = 0; i < WORD.length; i++) {
                setChars(c => ({ ...c, shown: i + 1 }));
                await wait(90);
            }

            await wait(500);
            setChars(c => ({ ...c, gone: true }));

            const rects = FLYER_INDEXES.map(i => charRefs.current[i].getBoundingClientRect());
            const fontSize = getComputedStyle(charRefs.current[0]).fontSize;

            flushSync(() => {
                setFlyers(rects.map((r, i) => ({ id: i, left: r.left, top: r.top, width: r.width, height: r.height, fontSize })));
                setChars(c => ({ ...c, flying: true }));
            });

            const animations = rects.map((r, i) =>
                flyerRefs.current[i].animate(flyFrames(r, sceneRef.current, i === 0 ? -1 : 1, i === 1), FLY_OPTIONS)
            );
            await Promise.all(animations.map(a => a.finished));
            if (cancelled) throw CANCELLED;

            setFlyers([]);
            flag('show', true);
            flag('pop', true);
            explode();
            await wait(700);

            flag('pop', false);
            flag('idle', true);
            await wait(1400);

            flag('docked', true);
            await wait(1200);

            await say('Hello, welcome to Lanewise Labs.');
            await wait(400);
            await say('What do you want to do?');
            await wait(300);

            setMenu(m => ({ ...m, show: true }));
            await wait(900);
            setMenu(m => ({ ...m, stagger: false }));
            await wait(500);

            await showPromo();
        }

        run().catch(error => {
            if (!cancelled) throw error;
        });

        return () => {
            cancelled = true;
        };
    }, [flag, say, showStatic, showPromo, explode]);

    const logoClass = ['logo', ...Object.keys(logoFlags).filter(name => logoFlags[name]), talking && 'talking']
        .filter(Boolean)
        .join(' ');

    return (
        <div className="stage">
            <FluxBackground />
            <div className={shaking ? 'scene shake' : 'scene'} ref={sceneRef}>
                <Title chars={chars} charRefs={charRefs} />

                <div className={logoClass} ref={logoRef}>
                    <LogoMark />
                    <button
                        key={bubble.key}
                        className={bubble.on ? 'bubble on' : 'bubble'}
                        type="button"
                        tabIndex={-1}
                        aria-hidden="true"
                        aria-label="Open preview"
                    >
                        <span className="tag">PREVIEW // LOCKED</span>
                        <span className="sk">
                            <Skeleton name={bubble.name} />
                        </span>
                        <span className="hint">CLICK TO OPEN</span>
                    </button>
                    <div className="shadow" />
                </div>

                <div className="fx">
                    {bursts.map(item => (
                        <div
                            key={item.id}
                            className={item.className}
                            style={item.style}
                            onAnimationEnd={() => setBursts(list => list.filter(b => b.id !== item.id))}
                        />
                    ))}
                </div>

                <div className="panel">
                    <div className="hud">
                        <i />
                        ONLINE // W.I.S.E
                    </div>
                    <Dialog lines={lines} caretId={caretId} />
                    <Menu
                        show={menu.show}
                        stagger={menu.stagger}
                        activeName={openName}
                        onPreview={preview}
                        onLeave={hidePreview}
                        onOpen={openPage}
                    />
                </div>

                <section className={openName ? 'win open' : 'win'} aria-label="Page">
                    <header className="wbar">
                        <span>{pageName ? pageName.toUpperCase() : ''}</span>
                        <button className="wclose" type="button" aria-label="Close page" onClick={closeWin}>
                            X CLOSE
                        </button>
                    </header>
                    <div className="wbody" ref={wbodyRef}>
                        {pageName && (
                            <PageView
                                key={pageName}
                                name={pageName}
                                onGo={goTo}
                                onSend={() => speak('Opening your email app...')}
                            />
                        )}
                    </div>
                </section>

                <Promo
                    open={promoOpen}
                    overlayRef={overlayRef}
                    noticeRef={noticeRef}
                    onGo={goTo}
                    onClose={() => setPromoOpen(false)}
                />

                {flyers.map((f, i) => (
                    <span
                        key={f.id}
                        className="flyer"
                        aria-hidden="true"
                        ref={el => {
                            flyerRefs.current[i] = el;
                        }}
                        style={{
                            left: f.left,
                            top: f.top,
                            width: f.width,
                            height: f.height,
                            lineHeight: f.height + 'px',
                            fontSize: f.fontSize
                        }}
                    >
                        L
                    </span>
                ))}
            </div>
        </div>
    );
}
