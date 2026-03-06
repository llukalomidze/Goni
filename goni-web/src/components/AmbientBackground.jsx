export default function AmbientBackground() {
  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      zIndex: 0,
      overflow: 'hidden',
      pointerEvents: 'none',
    }}>
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 1200 800" 
        width="100%" 
        height="100%" 
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="cardBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3D9BFF" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#3D9BFF" stopOpacity="0.01" />
          </linearGradient>
        </defs>

        <style>{`
          .net-line { stroke: #3D9BFF; strokeWidth: 1.5px; opacity: 0.15; }
          .node { fill: #3D9BFF; opacity: 0.5; filter: url(#glow); }
          .card { fill: url(#cardBg); stroke: #3D9BFF; stroke-width: 1px; stroke-opacity: 0.25; rx: 12px; }
          
          @keyframes drift1 {
            0% { transform: translate(0px, 0px) rotate(0deg); }
            100% { transform: translate(30px, -40px) rotate(3deg); }
          }
          @keyframes drift2 {
            0% { transform: translate(0px, 0px) rotate(0deg); }
            100% { transform: translate(-25px, 30px) rotate(-2deg); }
          }
          @keyframes drift3 {
            0% { transform: translate(0px, 0px); }
            100% { transform: translate(20px, 20px); }
          }
          @keyframes pulseLight {
            0%, 100% { opacity: 0.05; }
            50% { opacity: 0.25; }
          }

          .anim-drift-1 { animation: drift1 18s infinite alternate ease-in-out; }
          .anim-drift-2 { animation: drift2 22s infinite alternate ease-in-out; }
          .anim-drift-3 { animation: drift3 25s infinite alternate ease-in-out; }
          .anim-pulse { animation: pulseLight 5s infinite alternate ease-in-out; }
          .anim-pulse-slow { animation: pulseLight 8s infinite alternate ease-in-out; }
        `}</style>

        {/* Network Lines */}
        <g className="anim-drift-3">
          <line x1="250" y1="200" x2="450" y2="150" className="net-line anim-pulse" />
          <line x1="450" y1="150" x2="600" y2="350" className="net-line" />
          <line x1="600" y1="350" x2="850" y2="250" className="net-line anim-pulse-slow" />
          <line x1="600" y1="350" x2="500" y2="600" className="net-line" />
          <line x1="250" y1="200" x2="500" y2="600" className="net-line anim-pulse" />
          <line x1="850" y1="250" x2="950" y2="500" className="net-line" />
          <line x1="500" y1="600" x2="950" y2="500" className="net-line anim-pulse-slow" />
        </g>

        {/* Glowing Nodes */}
        <g className="anim-drift-3">
          <circle cx="250" cy="200" r="4" className="node" />
          <circle cx="450" cy="150" r="3" className="node" />
          <circle cx="600" cy="350" r="5" className="node" />
          <circle cx="850" cy="250" r="4" className="node" />
          <circle cx="500" cy="600" r="4" className="node" />
          <circle cx="950" cy="500" r="3" className="node" />
        </g>

        {/* Floating Flashcards */}
        <g className="anim-drift-1">
          <g transform="translate(150, 250) skewY(-15) rotate(10)">
            <rect x="0" y="0" width="140" height="90" className="card" />
            <line x1="20" y1="30" x2="80" y2="30" stroke="#3D9BFF" strokeWidth="2" strokeOpacity="0.3" strokeLinecap="round"/>
            <line x1="20" y1="50" x2="100" y2="50" stroke="#3D9BFF" strokeWidth="2" strokeOpacity="0.15" strokeLinecap="round"/>
            <line x1="20" y1="70" x2="60" y2="70" stroke="#3D9BFF" strokeWidth="2" strokeOpacity="0.15" strokeLinecap="round"/>
          </g>
        </g>

        <g className="anim-drift-2">
          <g transform="translate(750, 150) skewY(-10) rotate(-5) scale(0.8)">
            <rect x="0" y="0" width="140" height="90" className="card" />
            <line x1="20" y1="30" x2="60" y2="30" stroke="#3D9BFF" strokeWidth="2" strokeOpacity="0.3" strokeLinecap="round"/>
            <line x1="20" y1="50" x2="110" y2="50" stroke="#3D9BFF" strokeWidth="2" strokeOpacity="0.15" strokeLinecap="round"/>
          </g>
        </g>

        <g className="anim-drift-1" style={{ animationDelay: '-7s' }}>
          <g transform="translate(600, 500) skewY(-20) rotate(15) scale(1.1)">
            <rect x="0" y="0" width="140" height="90" className="card" />
            <line x1="20" y1="30" x2="90" y2="30" stroke="#3D9BFF" strokeWidth="2" strokeOpacity="0.3" strokeLinecap="round"/>
            <line x1="20" y1="50" x2="70" y2="50" stroke="#3D9BFF" strokeWidth="2" strokeOpacity="0.15" strokeLinecap="round"/>
          </g>
        </g>
      </svg>
    </div>
  );
}
