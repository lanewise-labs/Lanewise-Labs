import { WORD, FLYER_INDEXES } from '../data/site';

export default function Title({ chars, charRefs }) {
    return (
        <h1 className="title" aria-label={WORD}>
            {[...WORD].map((letter, i) => {
                const isFlyer = FLYER_INDEXES.includes(i);
                const fades = chars.gone && !isFlyer;
                const className = ['ch', i < chars.shown && 'on', fades && 'gone'].filter(Boolean).join(' ');
                const style = {};

                if (fades) style.transitionDelay = i * 30 + 'ms';
                if (chars.flying && isFlyer) style.visibility = 'hidden';
                if (chars.hidden) style.display = 'none';

                return (
                    <span
                        key={i}
                        className={className}
                        style={style}
                        aria-hidden="true"
                        ref={el => {
                            charRefs.current[i] = el;
                        }}
                    >
                        {letter === ' ' ? '\u00a0' : letter}
                    </span>
                );
            })}
        </h1>
    );
}
