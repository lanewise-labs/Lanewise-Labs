const WORD = 'Lanewise Labs';

const stage = document.getElementById('stage');
const scene = document.getElementById('scene');
const title = document.getElementById('title');
const logo = document.getElementById('logo');
const fx = document.getElementById('fx');
const dialog = document.getElementById('dialog');
const opts = document.getElementById('opts');
const bubble = document.getElementById('bubble');
const bsk = document.getElementById('bsk');
const win = document.getElementById('win');
const wtitle = document.getElementById('wtitle');
const wbody = document.getElementById('wbody');
const wclose = document.getElementById('wclose');
const overlay = document.getElementById('overlay');
const notice = overlay.querySelector('.notice');

const wideMQ = matchMedia('(min-width:900px)');
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

const skKv = '<div class="kv"><i class="b k"></i><i class="b"></i></div>';
const skRule = '<i class="b rule"></i>';
const skSection = skRule + '<i class="b n"></i><i class="b l"></i><i class="b l s"></i>' + skKv.repeat(3);
const skStand = skRule + '<i class="b n"></i><i class="b l"></i>';
const skPerson = '<div class="kv"><i class="b sq"></i><div class="col"><i class="b l"></i><i class="b l s"></i></div></div>';

const skMock = rev => '<div class="kv' + (rev ? ' rev' : '') + '"><i class="b mk"></i><div class="col"><i class="b n"></i><i class="b l"></i><i class="b l s"></i></div></div>';

const SK = {
    'Services': '<i class="b h"></i><i class="b circ"></i><div class="g3"><i class="b"></i><i class="b"></i><i class="b"></i></div>' + skRule + '<i class="b n"></i><i class="b l"></i>' + skKv.repeat(2),
    'Portfolio': '<i class="b h"></i><i class="b l"></i><i class="b l s"></i>' + skRule + skMock(false) + skMock(true) + '<i class="b btn"></i>',
    'Contact Us': '<i class="b h"></i><i class="b l s"></i><div class="g3"><i class="b desk"></i><i class="b desk"></i><i class="b desk"></i></div><i class="b f"></i><i class="b f"></i><i class="b t"></i><div class="kv"><i class="b btn"></i><i class="b"></i></div>',
    'About Us': '<i class="b h"></i><div class="g3"><i class="b f"></i><i class="b f"></i><i class="b f"></i></div><i class="b ill"></i><i class="b n"></i><i class="b l"></i><i class="b l s"></i>' + skPerson.repeat(2)
};


const rows = list => '<dl class="rows">' + list.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('') + '</dl>';

const service = (n, name, sub, text, list) =>
    `<section class="item"><span class="num">${n}</span><h3>${name}</h3><p class="sub">${sub}</p><p>${text}</p>${rows(list)}</section>`;

const stand = (n, name, text) =>
    `<div class="stand"><span class="num">${n}</span><h3>${name}</h3><p>${text}</p></div>`;

const member = (init, name) =>
    `<li><span class="init">${init}</span><div><b>${name}</b><small>Full-Stack Developer</small></div></li>`;

const need = (label, on = false) =>
    `<label class="chip"><input type="radio" name="need" value="${label}"${on ? ' checked' : ''}><span>${label}</span></label>`;

const LOGO = '<svg viewBox="0 0 80 88" aria-hidden="true"><path d="M10 0V52A26 26 0 0 0 36 78H78" fill="none" stroke="#E8F2F7" stroke-width="16"/><path d="M32 0V44A12 12 0 0 0 44 56H78" fill="none" stroke="#00E0FF" stroke-width="16"/></svg>';

/* ---- Services: orbit map ---- */
const SERVICES = [
    { n: '01', tag: 'WEBSITES', name: 'Business websites', sub: 'For shops, freelancers, and local services.',
      text: 'A clear, mobile-first website that tells people what you do and how to reach you. We handle the structure, the build, and the launch, and we set it up so you can edit it yourself.',
      list: [['Good for', 'Shops, freelancers, and local services that need an online presence people can trust'],
             ['You get', 'A live site you own, with your domain and accounts in your name'],
             ['Handover', 'A walkthrough and a short guide to editing the pages']] },
    { n: '02', tag: 'SYSTEMS', name: 'Small systems', sub: 'Booking, inventory, and record-keeping.',
      text: 'Tools shaped around how your business already works. We replace the notebook, the group chat, and the spreadsheet only one person understands with something the whole team can use.',
      list: [['Good for', 'Small shops, studios, and student organizations that track things by hand'],
             ['You get', 'A working system, loaded with sample data so you can test it before going live'],
             ['Handover', 'A walkthrough for staff and a simple admin guide']] },
    { n: '03', tag: 'STUDENTS', name: 'Student projects', sub: 'Portfolio sites and hands-on coaching.',
      text: 'Portfolio sites we build with you, and coaching for your own software project. We guide the design and review your work; you build it and defend it, and you understand every part.',
      list: [['Good for', 'Students and fresh graduates who want a portfolio or a mentor on their own project'],
             ['You get', 'A portfolio site, or regular check-ins and honest written feedback on your work'],
             ['Handover', 'Notes after each review, so you can keep improving on your own']] }
];

const svcDetail = i => {
    const v = SERVICES[i];
    return service(v.n, v.name, v.sub, v.text, v.list);
};

const orbit = () => `<div class="orbit">
    <span class="orbit-ring"></span><span class="orbit-ring r2"></span>
    <div class="arm in" style="--a:0deg"><i class="dot"></i></div>
    <div class="arm in" style="--a:180deg"><i class="dot"></i></div>
    ${SERVICES.map((v, i) => `<div class="arm" style="--a:${i * 120}deg"><i class="spoke"></i><button class="node${i ? '' : ' on'}" type="button" data-svc="${i}" aria-pressed="${i === 0}"><b>${v.n}</b>${v.tag}</button></div>`).join('')}
    <div class="hub">${LOGO}</div>
</div>`;

/* ---- About: persona tabs + animated illustrations ---- */
const ILL = {
    talk: `<svg viewBox="0 0 240 120" role="img" aria-label="A question and a plain answer in two chat bubbles">
        <g class="i-b1"><rect x="14" y="12" width="128" height="36" rx="7" fill="rgba(232,242,247,.12)" stroke="#E8F2F7" stroke-opacity=".5"/><rect x="26" y="24" width="72" height="4" rx="2" fill="#E8F2F7" fill-opacity=".7"/><rect x="26" y="33" width="46" height="4" rx="2" fill="#E8F2F7" fill-opacity=".4"/></g>
        <g class="i-b2"><rect x="98" y="58" width="128" height="36" rx="7" fill="rgba(0,224,255,.16)" stroke="#00E0FF"/><rect x="110" y="70" width="84" height="4" rx="2" fill="#00E0FF"/><rect x="110" y="79" width="56" height="4" rx="2" fill="#00E0FF" fill-opacity=".55"/></g>
        <circle class="i-dot" cx="24" cy="108" r="3" fill="#E8F2F7"/><circle class="i-dot" cx="34" cy="108" r="3" fill="#E8F2F7" style="animation-delay:.2s"/><circle class="i-dot" cx="44" cy="108" r="3" fill="#E8F2F7" style="animation-delay:.4s"/>
    </svg>`,
    own: `<svg viewBox="0 0 240 120" role="img" aria-label="A website in a browser window with a key beside it">
        <rect x="26" y="12" width="150" height="96" rx="4" fill="rgba(232,242,247,.06)" stroke="#E8F2F7" stroke-opacity=".45"/>
        <path d="M26 30H176" stroke="#E8F2F7" stroke-opacity=".3"/>
        <circle cx="36" cy="21" r="2.5" fill="#00E0FF"/><circle cx="45" cy="21" r="2.5" fill="#E8F2F7" fill-opacity=".35"/><circle cx="54" cy="21" r="2.5" fill="#E8F2F7" fill-opacity=".35"/>
        <rect x="36" y="38" width="130" height="13" rx="2" fill="rgba(0,224,255,.12)" stroke="#00E0FF" stroke-opacity=".6"/>
        <text x="43" y="47.5" font-size="7" fill="#00E0FF" font-family="Orbitron, monospace">yourname.ph</text>
        <rect x="36" y="60" width="86" height="5" rx="2" fill="#E8F2F7" fill-opacity=".4"/><rect x="36" y="71" width="108" height="5" rx="2" fill="#E8F2F7" fill-opacity=".2"/><rect x="36" y="82" width="64" height="5" rx="2" fill="#E8F2F7" fill-opacity=".2"/>
        <g class="i-key" fill="none" stroke="#00E0FF" stroke-width="3" stroke-linecap="round"><circle cx="198" cy="58" r="11"/><circle cx="198" cy="58" r="3" fill="#00E0FF"/><path d="M198 70V98M198 84H208M198 94H206"/></g>
    </svg>`,
    scope: `<svg viewBox="0 0 240 120" role="img" aria-label="A written scope with items to build, items not to build, and a date">
        <rect x="56" y="8" width="128" height="104" rx="3" fill="rgba(232,242,247,.06)" stroke="#E8F2F7" stroke-opacity=".45"/>
        <rect x="70" y="20" width="12" height="12" fill="none" stroke="#00E0FF"/><polyline class="i-ck" points="72,26 76,30 82,21" fill="none" stroke="#00E0FF" stroke-width="2.2"/>
        <rect x="92" y="23" width="72" height="5" rx="2" fill="#E8F2F7" fill-opacity=".5"/>
        <rect x="70" y="50" width="12" height="12" fill="none" stroke="#E5384F"/><polyline class="i-ck d2" points="72,52 80,60" fill="none" stroke="#E5384F" stroke-width="2.2"/><polyline class="i-ck d2" points="80,52 72,60" fill="none" stroke="#E5384F" stroke-width="2.2"/>
        <rect x="92" y="53" width="54" height="5" rx="2" fill="#E8F2F7" fill-opacity=".5"/>
        <rect x="70" y="80" width="12" height="12" fill="none" stroke="#00E0FF"/><polyline class="i-ck d3" points="72,86 76,90 82,81" fill="none" stroke="#00E0FF" stroke-width="2.2"/>
        <rect x="92" y="83" width="40" height="5" rx="2" fill="#E8F2F7" fill-opacity=".5"/>
    </svg>`
};

const PRINCIPLES = [
    { tab: 'Straight answers', ill: ILL.talk, text: 'Web and software only. If your project is outside that, we tell you on the first call and point you elsewhere if we can.' },
    { tab: 'You own it', ill: ILL.own, text: 'Your files, your accounts, your domain. Every project ends with a handover so you can run it without us.' },
    { tab: 'Scope in writing', ill: ILL.scope, text: 'Before work starts you get a written scope: what we will build, what we will not, and when. Changes are agreed, not assumed.' }
];

/* ---- Portfolio: alternating rows with mockups ---- */
const mockSite = '<i class="b h"></i><i class="b l"></i><i class="b l s"></i><div class="g2"><i class="b card"></i><i class="b card"></i></div><i class="b btn"></i>';
const mockApp = '<div class="g3"><i class="b f"></i><i class="b f"></i><i class="b f"></i></div><i class="b rule"></i><div class="kv"><i class="b k"></i><i class="b"></i></div><div class="kv"><i class="b k"></i><i class="b"></i></div><div class="kv"><i class="b k"></i><i class="b"></i></div>';

const frow = (cls, mock, body) =>
    `<div class="frow${cls}"><div class="mock"><div class="mbar"><i></i><i></i><i></i></div><div class="mbody">${mock}</div></div><div class="ftxt">${body}</div></div>`;

/* ---- Contact: team desks ---- */
const desk = (name, role) =>
    `<div class="desk"><svg viewBox="0 0 72 54" aria-hidden="true"><rect x="6" y="4" width="60" height="34" rx="2" fill="none" stroke="#00E0FF" stroke-opacity=".7"/><rect class="dl" x="12" y="11" width="30" height="3" fill="#E8F2F7" fill-opacity=".6"/><rect class="dl" x="12" y="19" width="42" height="3" fill="#E8F2F7" fill-opacity=".4" style="animation-delay:.5s"/><rect class="dl" x="12" y="27" width="20" height="3" fill="#00E0FF" style="animation-delay:1s"/><path d="M36 38V46M22 48H50" stroke="#8FA3B1" stroke-width="3"/></svg><b>${name}</b><small>${role}</small></div>`;

const PAGES = {
    'Services': `
        <h2>Services</h2>
        <p class="sub">Three things we build. Pick a node to see how each one works.</p>
        ${orbit()}
        <div id="svcDetail" aria-live="polite">${svcDetail(0)}</div>`,

    'Portfolio': `
        <h2>Our work is coming soon.</h2>
        <p>We are a new team, and our first two projects are still to come. Once they ship, they will be written up here: the problem, what we built, and what the client says in their own words.</p>
        ${frow('', mockSite, '<span class="num">01</span><h3>Founding project</h3><p>A business website. The write-up will cover the problem, the build, and the client\'s own words.</p><em class="soon">Coming soon</em>')}
        ${frow(' rev', mockApp, '<span class="num">02</span><h3>Founding project</h3><p>A small system. The write-up will show how it replaced the notebook and the spreadsheet.</p><em class="soon">Coming soon</em>')}
        ${frow(' rev0', '<div class="plus">+</div>', '<span class="num">03</span><h3>Yours could be next</h3><p>Our first two projects are free. Tell us what you want to build.</p><button class="cta" type="button" data-go="Contact Us">Apply for a free slot</button>').replace('class="mock"', 'class="mock empty"')}`,

    'Contact Us': `
        <h2>Tell us what you want to build.</h2>
        <p>A few lines is enough. We will reply with questions or a time for a free call. No pitch deck needed.</p>
        <div class="desks">${desk('Lawrence', 'Full-Stack Developer')}${desk('Adney', 'Full-Stack Developer')}${desk('Jerwin', 'Full-Stack Developer')}</div>
        <form id="cform">
            <label class="field">Name<input name="name" placeholder="Your name" required></label>
            <label class="field">Email<input name="email" type="email" placeholder="you@example.com" required></label>
            <fieldset>
                <legend>What do you need?</legend>
                ${need('Business website', true)}${need('Small system')}${need('Student project')}${need('Not sure yet')}
            </fieldset>
            <label class="field">When do you need it by?<input name="when" placeholder="A date, or &quot;no rush&quot;"></label>
            <label class="field">Tell us about the project<textarea name="about" rows="4" placeholder="What do you need, and what is not working today?"></textarea></label>
            <div class="send"><button class="cta" type="submit">Send message</button><small>We only use your details to reply to you.</small></div>
        </form>
        ${rows([['Email', 'lanewiselabs@gmail.com'], ['Typical reply time', '1-2 working days'], ['Based in', 'The Philippines']])}
        <p class="note"><b>Not sure what to ask for?</b> Tell us what is annoying you about how things work today. We will work out the rest on the call.</p>`,

    'About Us': `
        <h2>What we stand for</h2>
        <p class="sub">Three things you can check us on.</p>
        <div class="tabs" role="tablist" aria-label="What we stand for">
            ${PRINCIPLES.map((p, i) => `<button class="tab" role="tab" type="button" id="tab${i}" aria-controls="pane${i}" aria-selected="${i === 0}" tabindex="${i ? -1 : 0}" data-tab="${i}"><span>0${i + 1}</span>${p.tab}</button>`).join('')}
        </div>
        ${PRINCIPLES.map((p, i) => `<div class="pane" role="tabpanel" id="pane${i}" aria-labelledby="tab${i}"${i ? ' hidden' : ''}><div class="ill">${p.ill}</div><h3>${p.tab}</h3><p>${p.text}</p></div>`).join('')}
        <h2>The team</h2>
        <p class="sub">A small team that would rather tell you what it cannot do than promise everything.</p>
        <ul class="team">
            ${member('LC', 'Lawrence Andre Cabana')}${member('AC', 'Adney Zabdiel Chua')}${member('JS', 'Jerwin Sanjuan')}
        </ul>`
};

const PROMO = `
    <div class="nbar"><span>// NEW CLIENT OFFER</span><span>STATUS: ACTIVE</span></div>
    <h3 id="ntext">Our first 2 projects are free.</h3>
    <p>In return, we ask for a testimonial and permission to show the project in our portfolio.</p>
    <div class="slots"><span><b>01</b>FREE</span><span><b>02</b>FREE</span></div>
    <div class="nbtns">
        <button class="cta" type="button" data-go="Contact Us">Apply for a free slot</button>
        <button class="ghost" type="button" data-close>Maybe later</button>
    </div>`;

let audio = null;
let openName = null;
let said = '';
let muted = false;
let promoPending = false;
let talkId = 0;
let reply = null;
let current = null;
let hideT = 0;

bubble.tabIndex = -1;
bubble.setAttribute('aria-hidden', 'true');


const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

function tone(freq, dur, vol = 0.05, type = 'square', to = freq) {
    if (!audio || audio.state !== 'running' || muted) return;

    const t = audio.currentTime;
    const o = audio.createOscillator();
    const g = audio.createGain();

    o.type = type;
    o.frequency.setValueAtTime(freq, t);
    o.frequency.exponentialRampToValueAtTime(to, t + dur);
    g.gain.setValueAtTime(vol, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g).connect(audio.destination);
    o.start(t);
    o.stop(t + dur);
}

function noise(dur, vol) {
    if (!audio || audio.state !== 'running' || muted) return;

    const n = Math.floor(audio.sampleRate * dur);
    const buf = audio.createBuffer(1, n, audio.sampleRate);
    const data = buf.getChannelData(0);
    const src = audio.createBufferSource();
    const g = audio.createGain();

    for (let i = 0; i < n; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / n);

    g.gain.value = vol;
    src.buffer = buf;
    src.connect(g).connect(audio.destination);
    src.start();
}

const tick = () => tone(700 + Math.random() * 400, 0.035, 0.025);

const sweep = () => tone(180, 2.2, 0.05, 'sine', 900);

function impact() {
    tone(140, 0.4, 0.25, 'sine', 40);
    noise(0.3, 0.12);
    setTimeout(() => tone(880, 0.25, 0.04, 'triangle'), 120);
    setTimeout(() => tone(1320, 0.35, 0.04, 'triangle'), 240);
}

const K = () => Math.max(0.5, Math.min(1.4, Math.min(innerWidth, innerHeight) / 800));

function layout() {
    const w = scene.clientWidth;
    const h = scene.clientHeight;
    const wide = wideMQ.matches;

    scene.style.setProperty('--lx', (wide ? -w * 0.38 : -w * 0.28) + 'px');
    scene.style.setProperty('--ly', (wide ? 0 : -h * 0.26) + 'px');
}


function build() {
    title.textContent = '';

    return [...WORD].map(c => {
        const s = document.createElement('span');
        s.className = 'ch';
        s.setAttribute('aria-hidden', 'true');
        s.textContent = c === ' ' ? '\u00a0' : c;
        title.appendChild(s);
        return s;
    });
}

function fly(src, dir, cyan) {
    const r = src.getBoundingClientRect();
    const f = document.createElement('span');

    f.className = 'flyer';
    f.textContent = 'L';
    f.setAttribute('aria-hidden', 'true');
    f.style.cssText = `left:${r.left}px;top:${r.top}px;width:${r.width}px;height:${r.height}px;line-height:${r.height}px;font-size:${getComputedStyle(src).fontSize}`;
    scene.appendChild(f);
    src.style.visibility = 'hidden';

    const k = K();
    const dx = scene.clientWidth / 2 - (r.left + r.width / 2);
    const dy = scene.clientHeight / 2 - (r.top + r.height / 2);
    const t = (x, y, rot, sc) => `translate(${dx + x * k}px,${dy + y * k}px) rotate(${rot}deg) scale(${sc})`;
    const c = cyan ? '#00E0FF' : '#E8F2F7';

    return f.animate([
        { offset: 0, transform: 'translate(0px,0px) rotate(0deg) scale(1)', color: '#E8F2F7', easing: 'cubic-bezier(.3,0,.2,1)' },
        { offset: 0.3, transform: t(dir * 240, dir * 150, dir * 140, 1.7), color: c, easing: 'cubic-bezier(.4,0,.4,1)' },
        { offset: 0.62, transform: t(dir * 260, -dir * 120, dir * 300, 1.9), color: c, easing: 'cubic-bezier(.7,0,.9,.4)' },
        { offset: 1, transform: t(0, 0, dir * 360, 1.3), color: c }
    ], { duration: 2300, easing: 'linear', fill: 'forwards' });
}


function el(cls) {
    const d = document.createElement('div');
    d.className = cls;
    fx.appendChild(d);
    d.addEventListener('animationend', () => d.remove());
    return d;
}

function explode() {
    const k = K();

    impact();
    const cols = ['#00E0FF', '#E8F2F7', '#2447F5', '#00E0FF'];

    el('flash');
    el('ring');

    for (let i = 0; i < 30; i++) {
        const p = el('p');
        const a = Math.random() * Math.PI * 2;
        const d = (100 + Math.random() * 240) * k;
        const s = 4 + Math.random() * 8;

        p.style.cssText = `--x:${Math.cos(a) * d}px;--y:${Math.sin(a) * d}px;--t:${600 + Math.random() * 500}ms;width:${s}px;height:${s}px;margin:${-s / 2}px 0 0 ${-s / 2}px;background:${cols[i % 4]}`;
    }

    scene.classList.remove('shake');
    void scene.offsetWidth;
    scene.classList.add('shake');
}


function line() {
    const p = document.createElement('p');
    p.className = 'line';
    p.innerHTML = '<span class="sr"></span><span class="t" aria-hidden="true"></span><i class="caret" aria-hidden="true"></i>';
    dialog.appendChild(p);
    return p;
}

async function say(text, p = line()) {
    const id = ++talkId;
    const t = p.querySelector('.t');

    t.textContent = '';
    p.querySelector('.sr').textContent = text;
    dialog.querySelectorAll('.caret').forEach(c => c.style.display = 'none');
    p.querySelector('.caret').style.display = '';
    logo.classList.add('talking');

    for (const ch of text) {
        if (id !== talkId) return p;
        t.textContent += ch;
        if (ch !== ' ') tick();
        await sleep(',.?'.includes(ch) ? 170 : 38);
    }

    if (id === talkId) logo.classList.remove('talking');
    return p;
}

function speak(text) {
    if (text === said) return;

    said = text;
    reply = reply || line();
    say(text, reply);
}


const mark = a => opts.querySelectorAll('.opt').forEach(o => o.classList.toggle('active', o === a));

function preview(a) {
    const name = a.dataset.name;

    clearTimeout(hideT);

    if (name === openName) {
        bubble.classList.remove('on');
        current = null;
        speak(`${name} currently showing.`);
        return;
    }

    if (name !== current) {
        current = name;
        bsk.innerHTML = SK[name];
        bubble.classList.remove('on');
        void bubble.offsetWidth;
        bubble.classList.add('on');
    }

    speak('Showing Preview...');
}

function hidePreview() {
    clearTimeout(hideT);
    hideT = setTimeout(() => {
        if (!current) return;

        bubble.classList.remove('on');
        current = null;
        if (openName) speak(`${openName} currently showing.`);
    }, 300);
}

function openPage(a) {
    const name = a.dataset.name;

    clearTimeout(hideT);
    bubble.classList.remove('on');
    current = null;
    openName = name;

    wtitle.textContent = name.toUpperCase();
    wbody.innerHTML = PAGES[name];
    wbody.scrollTop = 0;
    win.classList.add('open');
    mark(a);
    speak(`Opening ${name}...`);
}

async function showPromo() {
    if (!reduce) {
        logo.classList.add('pulse');
        await sleep(600);
        logo.classList.remove('pulse');
    }

    promoPending = win.classList.contains('open');
    if (promoPending) return;

    overlay.classList.add('show');
    overlay.querySelector('.cta').focus();

    if (reduce) return;

    const a = logo.getBoundingClientRect();
    const b = notice.getBoundingClientRect();
    const dx = a.left + a.width / 2 - (b.left + b.width / 2);
    const dy = a.top + a.height / 2 - (b.top + b.height / 2);

    notice.animate([
        { transform: `translate(${dx}px,${dy}px) scale(0.1)`, opacity: 0 },
        { transform: 'none', opacity: 1 }
    ], { duration: 600, easing: 'cubic-bezier(.2,.9,.3,1)' });
}

function closeWin() {
    openName = null;
    win.classList.remove('open');
    mark(null);
    if (promoPending) showPromo();
}


async function run() {
    layout();

    const chars = build();
    const items = opts.querySelectorAll('.opt');

    items.forEach((o, i) => {
        o.style.transitionDelay = i * 90 + 'ms';
    });

    if (reduce) {
        chars.forEach(c => c.style.display = 'none');
        logo.classList.add('show', 'docked');

        ['Hello, welcome to our website.', 'What do you want to do?'].forEach(s => {
            const p = line();
            p.querySelector('.sr').textContent = s;
            p.querySelector('.t').textContent = s;
        });

        dialog.querySelectorAll('.caret').forEach(c => c.remove());
        items.forEach(o => o.style.transitionDelay = '');
        opts.classList.add('show');
        showPromo();
        return;
    }

    await Promise.race([document.fonts.ready, sleep(1500)]);
    await sleep(400);

    for (const c of chars) {
        c.classList.add('on');
        tick();
        await sleep(90);
    }

    await sleep(500);

    chars.forEach((c, i) => {
        if (i !== 0 && i !== 9) {
            c.style.transitionDelay = i * 30 + 'ms';
            c.classList.add('gone');
        }
    });

    sweep();
    const a = fly(chars[0], -1, false);
    const b = fly(chars[9], 1, true);
    await Promise.all([a.finished, b.finished]);

    scene.querySelectorAll('.flyer').forEach(n => n.remove());
    logo.classList.add('show', 'pop');
    explode();
    await sleep(700);

    logo.classList.remove('pop');
    logo.classList.add('idle');
    await sleep(1400);

    logo.classList.add('docked');
    await sleep(1200);

    await say('Hello, welcome to Lanewise Labs.');
    await sleep(400);
    await say('What do you want to do?');
    await sleep(300);

    opts.classList.add('show');
    await sleep(900);
    items.forEach(o => o.style.transitionDelay = '');
    await sleep(500);

    await showPromo();
}


opts.querySelectorAll('.opt').forEach(a => {
    a.addEventListener('mouseenter', () => preview(a));
    a.addEventListener('focus', () => preview(a));
    a.addEventListener('mouseleave', hidePreview);
    a.addEventListener('blur', hidePreview);

    a.addEventListener('click', e => {
        e.preventDefault();
        openPage(a);
    });
});

document.addEventListener('click', e => {
    const go = e.target.closest('[data-go]');

    if (go) {
        e.preventDefault();
        openPage(opts.querySelector(`[data-name="${go.dataset.go}"]`));
    }

    if (go || e.target === overlay || e.target.closest('[data-close]')) {
        overlay.classList.remove('show');
    }
});

wbody.addEventListener('submit', e => {
    e.preventDefault();

    const f = new FormData(e.target);
    const body = ['Name: ' + f.get('name'), 'Email: ' + f.get('email'), 'Needs: ' + f.get('need'), 'Needed by: ' + f.get('when'), '', f.get('about')].join('\n');

    location.href = 'mailto:lanewiselabs@gmail.com?subject=' + encodeURIComponent('New project: ' + f.get('need')) + '&body=' + encodeURIComponent(body);
    speak('Opening your email app...');
});

wbody.addEventListener('click', e => {
    const node = e.target.closest('[data-svc]');
    const tab = e.target.closest('[data-tab]');

    if (node) {
        wbody.querySelectorAll('.node').forEach(n => {
            const on = n === node;
            n.classList.toggle('on', on);
            n.setAttribute('aria-pressed', on);
        });
        wbody.querySelector('#svcDetail').innerHTML = svcDetail(+node.dataset.svc);
        tick();
    }

    if (tab) selectTab(+tab.dataset.tab);
});

wbody.addEventListener('keydown', e => {
    const tab = e.target.closest('[data-tab]');
    if (!tab || !['ArrowLeft', 'ArrowRight'].includes(e.key)) return;

    const n = PRINCIPLES.length;
    selectTab((+tab.dataset.tab + (e.key === 'ArrowRight' ? 1 : n - 1)) % n, true);
});

function selectTab(i, focus) {
    const tabs = [...wbody.querySelectorAll('.tab')];

    tabs.forEach((t, j) => {
        t.setAttribute('aria-selected', j === i);
        t.tabIndex = j === i ? 0 : -1;
    });
    wbody.querySelectorAll('.pane').forEach((p, j) => p.hidden = j !== i);
    if (focus) tabs[i].focus();
    tick();
}

notice.innerHTML = PROMO;

wclose.addEventListener('click', closeWin);

addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        closeWin();
        overlay.classList.remove('show');
    }
});

addEventListener('resize', layout);

function unlockAudio() {
    if (audio) return;

    const toggle = document.createElement('button');

    audio = new (window.AudioContext || window.webkitAudioContext)();
    audio.resume();

    toggle.className = 'sound';
    toggle.type = 'button';
    toggle.textContent = 'SOUND: ON';
    toggle.addEventListener('click', () => {
        muted = !muted;
        toggle.textContent = muted ? 'SOUND: OFF' : 'SOUND: ON';
    });
    stage.appendChild(toggle);
}

if (!reduce) ['click', 'keydown', 'touchend'].forEach(ev => addEventListener(ev, unlockAudio));

new FluxLines(document.getElementById('flux'), {
    colors: ['#2447F5', '#00E0FF', '#E8F2F7'],
    speed: 0.35,
    scale: 1.8,
    glow: 1.8,
    rimWidth: 0.2,
    lineWidth: 1,
    flowDirection: 'down',
    opacity: 0.75,
    mouseInteraction: true,
    clickSwirl: true,
    dpr: Math.min(devicePixelRatio || 1, 1.5)
});

run();
