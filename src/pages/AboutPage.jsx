import { useRef, useState } from 'react';
import { TEAM } from '../data/site';
import { TalkIllustration, OwnIllustration, ScopeIllustration } from '../components/Illustrations';

const PRINCIPLES = [
    {
        tab: 'Straight answers',
        Art: TalkIllustration,
        text: 'Web and software only. If your project is outside that, we tell you on the first call and point you elsewhere if we can.'
    },
    {
        tab: 'You own it',
        Art: OwnIllustration,
        text: 'Your files, your accounts, your domain. Every project ends with a handover so you can run it without us.'
    },
    {
        tab: 'Scope in writing',
        Art: ScopeIllustration,
        text: 'Before work starts you get a written scope: what we will build, what we will not, and when. Changes are agreed, not assumed.'
    }
];

export default function AboutPage() {
    const [tab, setTab] = useState(0);
    const tabRefs = useRef([]);

    const select = (i, focus = false) => {
        setTab(i);
        if (focus) tabRefs.current[i].focus();
    };

    const onKeyDown = (e, i) => {
        if (!['ArrowLeft', 'ArrowRight'].includes(e.key)) return;

        const n = PRINCIPLES.length;
        select((i + (e.key === 'ArrowRight' ? 1 : n - 1)) % n, true);
    };

    return (
        <>
            <h2>What we stand for</h2>
            <p className="sub">Three things you can check us on.</p>
            <div className="tabs" role="tablist" aria-label="What we stand for">
                {PRINCIPLES.map((p, i) => (
                    <button
                        key={p.tab}
                        className="tab"
                        role="tab"
                        type="button"
                        id={'tab' + i}
                        aria-controls={'pane' + i}
                        aria-selected={i === tab}
                        tabIndex={i === tab ? 0 : -1}
                        ref={el => {
                            tabRefs.current[i] = el;
                        }}
                        onClick={() => select(i)}
                        onKeyDown={e => onKeyDown(e, i)}
                    >
                        <span>0{i + 1}</span>
                        {p.tab}
                    </button>
                ))}
            </div>
            {PRINCIPLES.map((p, i) => (
                <div className="pane" role="tabpanel" id={'pane' + i} aria-labelledby={'tab' + i} hidden={i !== tab} key={p.tab}>
                    <div className="ill"><p.Art /></div>
                    <h3>{p.tab}</h3>
                    <p>{p.text}</p>
                </div>
            ))}
            <h2>The team</h2>
            <p className="sub">A small team that would rather tell you what it cannot do than promise everything.</p>
            <ul className="team">
                {TEAM.map(member => (
                    <li key={member.init}>
                        <span className="init">{member.init}</span>
                        <div>
                            <b>{member.name}</b>
                            <small>Full-Stack Developer</small>
                        </div>
                    </li>
                ))}
            </ul>
        </>
    );
}
