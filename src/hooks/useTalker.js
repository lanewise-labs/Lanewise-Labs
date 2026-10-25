import { useState, useRef, useCallback, useEffect } from 'react';
import { sleep } from '../lib/timing';

let lineCounter = 0;

export default function useTalker() {
    const [lines, setLines] = useState([]);
    const [activeId, setActiveId] = useState(null);
    const [talking, setTalking] = useState(false);
    const talkId = useRef(0);
    const said = useRef('');
    const replyId = useRef(null);
    const clearTimer = useRef(0);

    useEffect(
        () => () => {
            talkId.current++;
            clearTimeout(clearTimer.current);
        },
        []
    );

    const typeInto = useCallback(async (id, text) => {
        const mine = ++talkId.current;

        setActiveId(id);
        setTalking(true);

        for (let i = 1; i <= text.length; i++) {
            if (mine !== talkId.current) return;
            setLines(prev => prev.map(line => (line.id === id ? { ...line, count: i } : line)));
            await sleep(',.?'.includes(text[i - 1]) ? 170 : 38);
        }

        if (mine === talkId.current) setTalking(false);
    }, []);

    const say = useCallback(
        async text => {
            const id = ++lineCounter;

            setLines(prev => [...prev, { id, text, count: 0 }]);
            await typeInto(id, text);
        },
        [typeInto]
    );

    const speak = useCallback(
        text => {
            clearTimeout(clearTimer.current);
            if (text === said.current) return;

            said.current = text;

            if (replyId.current === null) {
                const id = ++lineCounter;

                replyId.current = id;
                setLines(prev => [...prev, { id, text, count: 0 }]);
                typeInto(id, text);
                return;
            }

            const id = replyId.current;

            setLines(prev => prev.map(line => (line.id === id ? { ...line, text, count: 0 } : line)));
            typeInto(id, text);
        },
        [typeInto]
    );

    const clearReply = useCallback(() => {
        talkId.current++;
        said.current = '';
        setTalking(false);

        const id = replyId.current;

        replyId.current = null;
        if (id === null) return;

        setLines(prev => prev.filter(line => line.id !== id));
        setActiveId(current => (current === id ? 'last' : current));
    }, []);

    const scheduleClear = useCallback(
        (ms, canClear) => {
            clearTimeout(clearTimer.current);
            clearTimer.current = setTimeout(() => {
                if (canClear()) clearReply();
            }, ms);
        },
        [clearReply]
    );

    const showStatic = useCallback(texts => {
        setLines(texts.map(text => ({ id: ++lineCounter, text, count: text.length })));
    }, []);

    let caretId = activeId;
    if (activeId === 'last') caretId = lines.length ? lines[lines.length - 1].id : null;

    return { lines, caretId, talking, say, speak, clearReply, scheduleClear, showStatic };
}
