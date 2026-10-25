import { MENU } from '../data/site';

export default function Menu({ show, stagger, activeName, onPreview, onLeave, onOpen }) {
    return (
        <nav className={show ? 'opts show' : 'opts'} aria-label="Main navigation">
            {MENU.map((item, i) => (
                <a
                    key={item.name}
                    className={item.name === activeName ? 'opt active' : 'opt'}
                    href={item.href}
                    style={stagger ? { transitionDelay: i * 90 + 'ms' } : undefined}
                    onMouseEnter={() => onPreview(item.name)}
                    onFocus={() => onPreview(item.name)}
                    onMouseLeave={onLeave}
                    onBlur={onLeave}
                    onClick={e => {
                        e.preventDefault();
                        onOpen(item.name);
                    }}
                >
                    {item.name}
                </a>
            ))}
        </nav>
    );
}
