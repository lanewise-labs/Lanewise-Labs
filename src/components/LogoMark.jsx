export default function LogoMark({ decorative = false }) {
    const a11y = decorative
        ? { 'aria-hidden': 'true' }
        : { role: 'img', 'aria-label': 'Lanewise Labs logo' };

    return (
        <svg viewBox="0 0 80 88" {...a11y}>
            <path d="M10 0V52A26 26 0 0 0 36 78H78" fill="none" stroke="#E8F2F7" strokeWidth="16" />
            <path d="M32 0V44A12 12 0 0 0 44 56H78" fill="none" stroke="#00E0FF" strokeWidth="16" />
        </svg>
    );
}
