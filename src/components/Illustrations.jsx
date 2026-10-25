export function TalkIllustration() {
    return (
        <svg viewBox="0 0 240 120" role="img" aria-label="A question and a plain answer in two chat bubbles">
        <g className="i-b1"><rect x="14" y="12" width="128" height="36" rx="7" fill="rgba(232,242,247,.12)" stroke="#E8F2F7" strokeOpacity=".5"/><rect x="26" y="24" width="72" height="4" rx="2" fill="#E8F2F7" fillOpacity=".7"/><rect x="26" y="33" width="46" height="4" rx="2" fill="#E8F2F7" fillOpacity=".4"/></g>
        <g className="i-b2"><rect x="98" y="58" width="128" height="36" rx="7" fill="rgba(0,224,255,.16)" stroke="#00E0FF"/><rect x="110" y="70" width="84" height="4" rx="2" fill="#00E0FF"/><rect x="110" y="79" width="56" height="4" rx="2" fill="#00E0FF" fillOpacity=".55"/></g>
        <circle className="i-dot" cx="24" cy="108" r="3" fill="#E8F2F7"/><circle className="i-dot" cx="34" cy="108" r="3" fill="#E8F2F7" style={{ animationDelay: '.2s' }}/><circle className="i-dot" cx="44" cy="108" r="3" fill="#E8F2F7" style={{ animationDelay: '.4s' }}/>
        </svg>
    );
}

export function OwnIllustration() {
    return (
        <svg viewBox="0 0 240 120" role="img" aria-label="A website in a browser window with a key beside it">
        <rect x="26" y="12" width="150" height="96" rx="4" fill="rgba(232,242,247,.06)" stroke="#E8F2F7" strokeOpacity=".45"/>
        <path d="M26 30H176" stroke="#E8F2F7" strokeOpacity=".3"/>
        <circle cx="36" cy="21" r="2.5" fill="#00E0FF"/><circle cx="45" cy="21" r="2.5" fill="#E8F2F7" fillOpacity=".35"/><circle cx="54" cy="21" r="2.5" fill="#E8F2F7" fillOpacity=".35"/>
        <rect x="36" y="38" width="130" height="13" rx="2" fill="rgba(0,224,255,.12)" stroke="#00E0FF" strokeOpacity=".6"/>
        <text x="43" y="47.5" fontSize="7" fill="#00E0FF" fontFamily="Orbitron, monospace">yourname.ph</text>
        <rect x="36" y="60" width="86" height="5" rx="2" fill="#E8F2F7" fillOpacity=".4"/><rect x="36" y="71" width="108" height="5" rx="2" fill="#E8F2F7" fillOpacity=".2"/><rect x="36" y="82" width="64" height="5" rx="2" fill="#E8F2F7" fillOpacity=".2"/>
        <g className="i-key" fill="none" stroke="#00E0FF" strokeWidth="3" strokeLinecap="round"><circle cx="198" cy="58" r="11"/><circle cx="198" cy="58" r="3" fill="#00E0FF"/><path d="M198 70V98M198 84H208M198 94H206"/></g>
        </svg>
    );
}

export function ScopeIllustration() {
    return (
        <svg viewBox="0 0 240 120" role="img" aria-label="A written scope with items to build, items not to build, and a date">
        <rect x="56" y="8" width="128" height="104" rx="3" fill="rgba(232,242,247,.06)" stroke="#E8F2F7" strokeOpacity=".45"/>
        <rect x="70" y="20" width="12" height="12" fill="none" stroke="#00E0FF"/><polyline className="i-ck" points="72,26 76,30 82,21" fill="none" stroke="#00E0FF" strokeWidth="2.2"/>
        <rect x="92" y="23" width="72" height="5" rx="2" fill="#E8F2F7" fillOpacity=".5"/>
        <rect x="70" y="50" width="12" height="12" fill="none" stroke="#E5384F"/><polyline className="i-ck d2" points="72,52 80,60" fill="none" stroke="#E5384F" strokeWidth="2.2"/><polyline className="i-ck d2" points="80,52 72,60" fill="none" stroke="#E5384F" strokeWidth="2.2"/>
        <rect x="92" y="53" width="54" height="5" rx="2" fill="#E8F2F7" fillOpacity=".5"/>
        <rect x="70" y="80" width="12" height="12" fill="none" stroke="#00E0FF"/><polyline className="i-ck d3" points="72,86 76,90 82,81" fill="none" stroke="#00E0FF" strokeWidth="2.2"/>
        <rect x="92" y="83" width="40" height="5" rx="2" fill="#E8F2F7" fillOpacity=".5"/>
        </svg>
    );
}
