const Rule = () => <i className="b rule" />;

const Kv = () => (
    <div className="kv">
        <i className="b k" />
        <i className="b" />
    </div>
);

const Mock = ({ rev = false }) => (
    <div className={rev ? 'kv rev' : 'kv'}>
        <i className="b mk" />
        <div className="col">
            <i className="b n" />
            <i className="b l" />
            <i className="b l s" />
        </div>
    </div>
);

const Person = () => (
    <div className="kv">
        <i className="b sq" />
        <div className="col">
            <i className="b l" />
            <i className="b l s" />
        </div>
    </div>
);

const Triple = ({ cls = '' }) => (
    <div className="g3">
        {[0, 1, 2].map(i => (
            <i key={i} className={cls ? 'b ' + cls : 'b'} />
        ))}
    </div>
);

export default function Skeleton({ name }) {
    switch (name) {
        case 'Services':
            return (
                <>
                    <i className="b h" />
                    <i className="b circ" />
                    <Triple />
                    <Rule />
                    <i className="b n" />
                    <i className="b l" />
                    <Kv />
                    <Kv />
                </>
            );
        case 'Portfolio':
            return (
                <>
                    <i className="b h" />
                    <i className="b l" />
                    <i className="b l s" />
                    <Rule />
                    <Mock />
                    <Mock rev />
                    <i className="b btn" />
                </>
            );
        case 'Contact Us':
            return (
                <>
                    <i className="b h" />
                    <i className="b l s" />
                    <i className="b f" />
                    <i className="b f" />
                    <i className="b t" />
                    <div className="kv">
                        <i className="b btn" />
                        <i className="b" />
                    </div>
                </>
            );
        case 'About Us':
            return (
                <>
                    <i className="b h" />
                    <Triple cls="f" />
                    <i className="b ill" />
                    <i className="b n" />
                    <i className="b l" />
                    <i className="b l s" />
                    <Person />
                    <Person />
                </>
            );
        default:
            return null;
    }
}
