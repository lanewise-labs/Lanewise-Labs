export default function Promo({ open, overlayRef, noticeRef, onGo, onClose }) {
    return (
        <div
            className={open ? 'overlay show' : 'overlay'}
            ref={overlayRef}
            onClick={e => {
                if (e.target === e.currentTarget) onClose();
            }}
        >
            <div className="notice" role="dialog" aria-modal="true" aria-labelledby="ntext" ref={noticeRef}>
                <div className="nbar">
                    <span>// NEW CLIENT OFFER</span>
                    <span>STATUS: ACTIVE</span>
                </div>
                <h3 id="ntext">Our first 2 projects are free.</h3>
                <p>In return, we ask for a testimonial and permission to show the project in our portfolio.</p>
                <div className="slots">
                    <span><b>01</b>FREE</span>
                    <span><b>02</b>FREE</span>
                </div>
                <div className="nbtns">
                    <button className="cta" type="button" onClick={() => onGo('Contact Us')}>
                        Apply for a free slot
                    </button>
                    <button className="ghost" type="button" onClick={onClose}>
                        Maybe later
                    </button>
                </div>
            </div>
        </div>
    );
}
