export default function Dialog({ lines, caretId }) {
    return (
        <div className="dialog">
            {lines.map(line => (
                <p className="line" key={line.id}>
                    <span className="sr">{line.text}</span>
                    <span className="t" aria-hidden="true">{line.text.slice(0, line.count)}</span>
                    {line.id === caretId && <i className="caret" aria-hidden="true" />}
                </p>
            ))}
        </div>
    );
}
