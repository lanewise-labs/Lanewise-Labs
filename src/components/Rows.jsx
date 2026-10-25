export default function Rows({ list }) {
    return (
        <dl className="rows">
            {list.map(([key, value]) => (
                <div key={key}>
                    <dt>{key}</dt>
                    <dd>{value}</dd>
                </div>
            ))}
        </dl>
    );
}
