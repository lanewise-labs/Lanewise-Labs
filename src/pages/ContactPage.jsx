import { EMAIL, NEEDS } from '../data/site';
import Rows from '../components/Rows';

export default function ContactPage({ onSend }) {
    const handleSubmit = e => {
        e.preventDefault();

        const f = new FormData(e.currentTarget);
        const body = [
            'Name: ' + f.get('name'),
            'Email: ' + f.get('email'),
            'Needs: ' + f.get('need'),
            'Needed by: ' + f.get('when'),
            '',
            f.get('about')
        ].join('\n');

        window.location.href =
            'mailto:' + EMAIL +
            '?subject=' + encodeURIComponent('New project: ' + f.get('need')) +
            '&body=' + encodeURIComponent(body);
        onSend();
    };

    return (
        <>
            <h2>Tell us what you want to build.</h2>
            <p>A few lines is enough. We will reply with questions or a time for a free call. No pitch deck needed.</p>
            <form onSubmit={handleSubmit}>
                <label className="field">
                    Name
                    <input name="name" placeholder="Your name" required />
                </label>
                <label className="field">
                    Email
                    <input name="email" type="email" placeholder="you@example.com" required />
                </label>
                <fieldset>
                    <legend>What do you need?</legend>
                    {NEEDS.map((label, i) => (
                        <label className="chip" key={label}>
                            <input type="radio" name="need" value={label} defaultChecked={i === 0} />
                            <span>{label}</span>
                        </label>
                    ))}
                </fieldset>
                <label className="field">
                    When do you need it by?
                    <input name="when" placeholder={'A date, or "no rush"'} />
                </label>
                <label className="field">
                    Tell us about the project
                    <textarea name="about" rows="4" placeholder="What do you need, and what is not working today?" />
                </label>
                <div className="send">
                    <button className="cta" type="submit">Send message</button>
                    <small>We only use your details to reply to you.</small>
                </div>
            </form>
            <Rows list={[['Email', EMAIL], ['Typical reply time', '1-2 working days'], ['Based in', 'The Philippines']]} />
            <p className="note">
                <b>Not sure what to ask for?</b> Tell us what is annoying you about how things work today. We will work out the rest on the call.
            </p>
        </>
    );
}
