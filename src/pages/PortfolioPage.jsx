import { DEMOS } from '../data/demos';

function MockSite() {
    return (
        <>
            <i className="b h" />
            <i className="b l" />
            <i className="b l s" />
            <div className="g2">
                <i className="b card" />
                <i className="b card" />
            </div>
            <i className="b btn" />
        </>
    );
}

function MockApp() {
    return (
        <>
            <div className="g3">
                <i className="b f" />
                <i className="b f" />
                <i className="b f" />
            </div>
            <i className="b rule" />
            {[0, 1, 2].map(i => (
                <div className="kv" key={i}>
                    <i className="b k" />
                    <i className="b" />
                </div>
            ))}
        </>
    );
}

function Row({ rev = false, empty = false, mock, children }) {
    return (
        <div className={rev ? 'frow rev' : 'frow'}>
            <div className={empty ? 'mock empty' : 'mock'}>
                <div className="mbar">
                    <i />
                    <i />
                    <i />
                </div>
                <div className="mbody">{mock}</div>
            </div>
            <div className="ftxt">{children}</div>
        </div>
    );
}

export default function PortfolioPage({ onGo }) {
    return (
        <>
            <h2>Two demos. Client work comes next.</h2>
            <p>
                We are a new team with no client projects yet. These two demos show how we build. They use fictional
                businesses and people, and they are not client work.
            </p>
            {DEMOS.map((demo, i) => (
                <Row key={demo.n} rev={i % 2 === 1} mock={demo.kind === 'site' ? <MockSite /> : <MockApp />}>
                    <span className="num">{demo.n}</span>
                    <h3>{demo.name}</h3>
                    <p>{demo.text}</p>
                    <div className="tags">
                        <em className="soon">Demo</em>
                        {demo.url ? (
                            <a className="cta" href={demo.url} target="_blank" rel="noopener noreferrer">
                                View live demo
                            </a>
                        ) : (
                            <em className="soon">Coming soon</em>
                        )}
                    </div>
                </Row>
            ))}
            <Row empty mock={<div className="plus">+</div>}>
                <span className="num">03</span>
                <h3>Yours could be next</h3>
                <p>Our first two projects are free. Tell us what you want to build.</p>
                <button className="cta" type="button" onClick={() => onGo('Contact Us')}>
                    Apply for a free slot
                </button>
            </Row>
        </>
    );
}
