import { useState } from 'react';
import { SERVICES } from '../data/services';
import LogoMark from '../components/LogoMark';
import Rows from '../components/Rows';

function ServiceItem({ service }) {
    return (
        <section className="item">
            <span className="num">{service.n}</span>
            <h3>{service.name}</h3>
            <p className="sub">{service.sub}</p>
            <p>{service.text}</p>
            <Rows list={service.list} />
        </section>
    );
}

export default function ServicesPage() {
    const [selected, setSelected] = useState(0);

    return (
        <>
            <h2>Services</h2>
            <p className="sub">Three things we build. Pick a node to see how each one works.</p>
            <div className="orbit">
                <span className="orbit-ring" />
                <span className="orbit-ring r2" />
                <div className="arm in" style={{ '--a': '0deg' }}><i className="dot" /></div>
                <div className="arm in" style={{ '--a': '180deg' }}><i className="dot" /></div>
                {SERVICES.map((service, i) => (
                    <div className="arm" style={{ '--a': i * 120 + 'deg' }} key={service.n}>
                        <i className="spoke" />
                        <button
                            className={i === selected ? 'node on' : 'node'}
                            type="button"
                            aria-pressed={i === selected}
                            onClick={() => setSelected(i)}
                        >
                            <b>{service.n}</b>
                            {service.tag}
                        </button>
                    </div>
                ))}
                <div className="hub"><LogoMark decorative /></div>
            </div>
            <div aria-live="polite">
                <ServiceItem service={SERVICES[selected]} />
            </div>
        </>
    );
}
