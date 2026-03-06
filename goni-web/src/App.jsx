import { useState, useEffect } from 'react';
import UploadScreen from './components/UploadScreen';
import FlashcardScreen from './components/FlashcardScreen';
import AmbientBackground from './components/AmbientBackground';
import LOGO from './assets/goni-logo-sm.png';

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [showHowItWorks, setShowHowItWorks] = useState(false);
  const [screen, setScreen] = useState("home"); // "home" | "upload"
  const [scrolled, setScrolled] = useState(false);
  const [flashcards, setFlashcards] = useState(null);

  // Handle nav bar scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (flashcards) return <FlashcardScreen flashcards={flashcards} onReset={() => setFlashcards(null)} />;

  if (screen === "upload") return <UploadScreen setScreen={setScreen} onCardsGenerated={setFlashcards} />;

  return (
    <div style={{
      fontFamily: "'DM Sans', system-ui, sans-serif",
      background: "#060d16", color: "#e8edf5", minHeight: "100vh",
      overflowX: "hidden",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />

      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
        @keyframes pulse { 0%,100% { opacity:0.4; transform:scale(1); } 50% { opacity:0.7; transform:scale(1.05); } }
        @keyframes gridMove { from { transform:translateY(0); } to { transform:translateY(60px); } }
        @keyframes introFadeIn { from { opacity:0; } to { opacity:1; } }
        @keyframes introCardUp { from { opacity:0; transform:translateY(32px) scale(0.97); } to { opacity:1; transform:translateY(0) scale(1); } }
        

        @keyframes howModalFade { from { opacity:0; backdrop-filter:blur(0px); } to { opacity:1; backdrop-filter:blur(12px); } }
        @keyframes howModalScale { 
          0% { opacity:0; transform:scale(0.9) translateY(40px); } 
          60% { transform:scale(1.02) translateY(-5px); } 
          100% { opacity:1; transform:scale(1) translateY(0); } 
        }
        .how-card { transition: all 0.4s cubic-bezier(0.2, 0, 0, 1); }
        .how-card:hover { background: rgba(61,155,255,0.08) !important; transform: translateX(8px); border-color: rgba(61,155,255,0.2) !important; }
        
        .logo-group { transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); cursor: pointer; }
        .logo-group:hover { transform: scale(1.05); }

        .fade-1 { animation: fadeUp 0.7s ease both; }
        .fade-2 { animation: fadeUp 0.7s 0.15s ease both; }
        .fade-3 { animation: fadeUp 0.7s 0.3s ease both; }
        .fade-4 { animation: fadeUp 0.7s 0.45s ease both; }
        .cta-btn:hover { background: #2d8aef !important; transform: translateY(-2px); box-shadow: 0 12px 40px rgba(61,155,255,0.4) !important; }
        .cta-btn { transition: all 0.25s ease; }
        .ghost-btn:hover { border-color: #3D9BFF !important; color: #3D9BFF !important; }
        .ghost-btn { transition: all 0.2s ease; }
        .intro-enter-btn:hover { background: #3D9BFF !important; color: #fff !important; border-color: #3D9BFF !important; }
        .intro-enter-btn { transition: all 0.2s ease; }
      `}</style>


      {showIntro && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 999,
          background: "rgba(4,9,16,0.88)", backdropFilter: "blur(12px)",
          display: "flex", padding: "24px", overflowY: "auto",
          animation: "introFadeIn 0.4s ease both",
        }}>
          <div style={{
            margin: "auto", maxWidth: "480px", width: "100%", background: "#0b1622",
            border: "1px solid #1a3550", borderRadius: "20px", padding: "clamp(24px, 6vw, 40px) clamp(20px, 5vw, 36px) clamp(24px, 6vw, 36px)",
            display: "flex", flexDirection: "column", alignItems: "center",
            animation: "introCardUp 0.5s 0.1s cubic-bezier(0.2,0,0,1) both",
            boxShadow: "0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(61,155,255,0.06)",
          }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "6px",
              padding: "4px 14px", borderRadius: "100px",
              background: "rgba(255,180,0,0.08)", border: "1px solid rgba(255,180,0,0.2)", marginBottom: "20px",
            }}>
              <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#FFB400", display: "inline-block", boxShadow: "0 0 6px #FFB400" }} />
              <span style={{ fontSize: "11px", color: "#FFB400", fontFamily: "monospace", letterSpacing: "2px", textTransform: "uppercase" }}>ბეტა ვერსია</span>
            </div>

            <img src={LOGO} alt="Goni" style={{ width: "54px", height: "54px", borderRadius: "14px", objectFit: "cover", marginBottom: "16px", boxShadow: "0 8px 24px rgba(61,155,255,0.2)" }} />

            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(22px, 5vw, 26px)", fontWeight: "400", margin: "0 0 12px", textAlign: "center", letterSpacing: "-0.5px", color: "#f0eee8" }}>
              გონი — ახალი დასაწყისია
            </h2>
            <p style={{ fontSize: "clamp(13px, 3.5vw, 15px)", color: "#5a7a9a", lineHeight: 1.6, textAlign: "center", margin: "0 0 10px", fontWeight: "300" }}>
              გონი ახლა პირველი ნაბიჯებს დგამს. ეს ბეტა ვერსიაა — ნაკლოვანებები შეიძლება იყოს, მაგრამ ძირითადი ფუნქცია სრულად მუშაობს.
            </p>
            <p style={{ fontSize: "clamp(13px, 3.5vw, 15px)", color: "#5a7a9a", lineHeight: 1.6, textAlign: "center", margin: "0 0 24px", fontWeight: "300" }}>
              ჩვენ ვვითარდებით — შენი აზრი პირდაპირ ავსებს გადაწყვეტილებებს.
            </p>

            <div style={{ width: "100%", height: "1px", background: "linear-gradient(90deg, transparent, #1a3550, transparent)", marginBottom: "20px" }} />

            <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "8px", marginBottom: "28px" }}>
              {[
                ["⚡", "ბარათების გენერაცია — ტექსტზე, PDF-ზე"],
                ["🧠", "სივრცული გამეორება — არ დაგავიწყდეს"],
                ["🔓", "უფასო — რეგისტრაცია არ საჭირო"],
              ].map(([icon, text], i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "8px 12px", borderRadius: "10px", background: "rgba(61,155,255,0.04)", border: "1px solid #0f2236" }}>
                  <span style={{ fontSize: "15px" }}>{icon}</span>
                  <span style={{ fontSize: "12.5px", color: "#7a9ab8", lineHeight: 1.4 }}>{text}</span>
                </div>
              ))}
            </div>

            <button className="intro-enter-btn" onClick={() => setShowIntro(false)} style={{
              width: "100%", padding: "12px", borderRadius: "10px",
              background: "transparent", color: "#3D9BFF",
              border: "1px solid #3D9BFF", cursor: "pointer",
              fontSize: "14px", fontWeight: "500", letterSpacing: "0.3px",
            }}>
              გავიგე, ვცადოთ →
            </button>
            <p style={{ fontSize: "11px", color: "#2a4060", marginTop: "16px", fontFamily: "monospace", letterSpacing: "1px" }}>v0.1 · გონი · 2026</p>
          </div>
        </div>
      )}


      {showHowItWorks && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 1000,
          background: "rgba(4,9,16,0.85)", display: "flex", padding: "24px", overflowY: "auto",
          animation: "howModalFade 0.4s ease forwards",
        }} onClick={() => setShowHowItWorks(false)}>
          <div style={{
            margin: "auto", maxWidth: "540px", width: "100%", background: "#0b1622",
            border: "1px solid #1a3550", borderRadius: "24px", padding: "clamp(32px, 8vw, 48px) clamp(24px, 6vw, 40px)",
            display: "flex", flexDirection: "column", position: "relative",
            animation: "howModalScale 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
            boxShadow: "0 40px 100px rgba(0,0,0,0.8), 0 0 0 1px rgba(61,155,255,0.1)",
          }} onClick={e => e.stopPropagation()}>
            
            <button onClick={() => setShowHowItWorks(false)} style={{
              position: "absolute", top: "20px", right: "20px", background: "none", border: "none", color: "#5a7a9a", fontSize: "20px", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", width: "40px", height: "40px", transition: "all 0.2s", borderRadius: "50%"
            }} onMouseEnter={e => {e.currentTarget.style.background="rgba(255,255,255,0.05)"; e.currentTarget.style.color="#fff";}} onMouseLeave={e => {e.currentTarget.style.background="none"; e.currentTarget.style.color="#5a7a9a";}}>
              ✕
            </button>

            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "32px", fontWeight: "400", margin: "0 0 8px", color: "#f0eee8", letterSpacing: "-0.5px" }}>
              როგორ მუშაობს გონი?
            </h2>
            <p style={{ fontSize: "15px", color: "#6a8aaa", lineHeight: 1.6, margin: "0 0 32px", fontWeight: "300" }}>
              სამი ძალზედ მარტივი ნაბიჯი სრულყოფილი დამახსოვრებისთვის.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {[
                { icon: "📄", title: "1. ატვირთე მასალა", desc: "ჩააგდე PDF ან უბრალოდ ჩასვი ტექსტი შენი კონსპექტებიდან." },
                { icon: "✨", title: "2. AI ქმნის ბარათებს", desc: "ხელოვნური ინტელექტი აანალიზებს ტექსტს და ქმნის შეკითხვა-პასუხის ბარათებს." },
                { icon: "🧠", title: "3. ისწავლე ეფექტურად", desc: "გონი გაჩვენებს ბარათებს სივრცული გამეორებით, ზუსტად მაშინ, როცა დაგავიწყდებოდა." }
              ].map((step, i) => (
                <div key={i} className="how-card" style={{ 
                  display: "flex", alignItems: "flex-start", gap: "16px", 
                  padding: "20px", borderRadius: "16px", 
                  background: "rgba(61,155,255,0.03)", border: "1px solid rgba(61,155,255,0.08)",
                  animation: `fadeUp 0.5s ${0.2 + (i * 0.1)}s ease both`,
                }}>
                  <div style={{ 
                    fontSize: "24px", width: "48px", height: "48px", 
                    background: "rgba(61,155,255,0.1)", borderRadius: "12px", 
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0, boxShadow: "inset 0 0 12px rgba(61,155,255,0.1)"
                  }}>
                    {step.icon}
                  </div>
                  <div style={{ paddingTop: "2px" }}>
                    <h3 style={{ margin: "0 0 6px", fontSize: "16px", color: "#e8edf5", fontWeight: "500" }}>{step.title}</h3>
                    <p style={{ margin: 0, fontSize: "14px", color: "#7a9ab8", lineHeight: 1.6, fontWeight: "300" }}>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="cta-btn" onClick={() => { setShowHowItWorks(false); setScreen("upload"); }} style={{
              marginTop: "40px", width: "100%", padding: "16px", borderRadius: "12px",
              background: "#3D9BFF", color: "#fff", border: "none", cursor: "pointer",
              fontSize: "15px", fontWeight: "500", letterSpacing: "0.5px",
              boxShadow: "0 12px 32px rgba(61,155,255,0.3)"
            }}>
              ვცადოთ →
            </button>
          </div>
        </div>
      )}


      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "18px clamp(16px, 5vw, 40px)", display: "flex", alignItems: "center", justifyContent: "space-between",
        background: scrolled ? "rgba(6,13,22,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid #0f2039" : "1px solid transparent",
        transition: "all 0.3s ease",
      }}>
        <div className="logo-group" style={{ display: "flex", alignItems: "center", gap: "12px", flexShrink: 0 }}>
          <img src={LOGO} alt="Goni logo" style={{ width: "44px", height: "44px", borderRadius: "10px", objectFit: "cover", boxShadow: "0 4px 20px rgba(61,155,255,0.4)" }} />
        </div>
        <div style={{ display: "flex", gap: "clamp(12px, 3vw, 32px)", alignItems: "center", flexWrap: "wrap", justifyContent: "flex-end" }}>
          {["როგორ მუშაობს"].map(l => (
            <a key={l} href="#" style={{ color: "#6a8aaa", textDecoration: "none", fontFamily: "'DM Mono', monospace", fontSize: "15px", letterSpacing: "0.5px" }}
              onMouseEnter={e => e.currentTarget.style.color = "#e8edf5"}
              onMouseLeave={e => e.currentTarget.style.color = "#6a8aaa"}
              onClick={(e) => {
                e.preventDefault();
                if (l === "როგორ მუშაობს") setShowHowItWorks(true);
              }}
            >{l}</a>
          ))}
          <button className="cta-btn" onClick={() => setScreen("upload")} style={{
            padding: "9px 22px", background: "#3D9BFF", color: "#fff", border: "none",
            borderRadius: "8px", cursor: "pointer", fontSize: "13px", fontWeight: "500",
            boxShadow: "0 4px 20px rgba(61,155,255,0.25)",
          }}>დაიწყე უფასოდ</button>
        </div>
      </nav>


      <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", padding: "120px 24px 80px", overflow: "hidden" }}>


        <div style={{
          position: "absolute", inset: 0, zIndex: 0,
          backgroundImage: "linear-gradient(rgba(61,155,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(61,155,255,0.04) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          animation: "gridMove 8s linear infinite",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, black 40%, transparent 100%)",
        }} />


        <div style={{ position: "absolute", top: "20%", left: "10%", width: "400px", height: "400px", background: "radial-gradient(circle, rgba(61,155,255,0.08) 0%, transparent 70%)", animation: "pulse 6s ease infinite", zIndex: 0 }} />
        <div style={{ position: "absolute", bottom: "20%", right: "10%", width: "300px", height: "300px", background: "radial-gradient(circle, rgba(230,57,70,0.05) 0%, transparent 70%)", animation: "pulse 8s 2s ease infinite", zIndex: 0 }} />

        <AmbientBackground />


        <div style={{
          position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
          fontSize: "clamp(120px, 20vw, 280px)", color: "rgba(61,155,255,0.025)",
          fontFamily: "'DM Serif Display', serif", userSelect: "none", zIndex: 0, lineHeight: 1, letterSpacing: "-8px",
        }}>გონი</div>

        <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "0", textAlign: "center" }}>


          <div className="fade-1" style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            padding: "6px 16px", borderRadius: "100px",
            border: "1px solid rgba(61,155,255,0.25)", background: "rgba(61,155,255,0.06)", marginBottom: "28px",
          }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#3D9BFF", display: "inline-block", boxShadow: "0 0 8px #3D9BFF" }} />
            <span style={{ fontSize: "12px", color: "#6ab0ff", fontFamily: "monospace", letterSpacing: "1px" }}>ხელოვნური ინტელექტი · ქართული · უფასოდ</span>
          </div>


          <h1 className="fade-2" style={{
            fontSize: "clamp(44px, 7vw, 88px)", fontWeight: "400", margin: "0 0 10px",
            fontFamily: "'DM Serif Display', serif", lineHeight: 1.05,
            letterSpacing: "-2px", maxWidth: "800px",
          }}>
            ისწავლე ჭკვიანურად.<br />
            <span style={{ color: "#3D9BFF" }}>დაიმახსოვრე მეტი.</span>
          </h1>



          <p className="fade-3" style={{
            fontSize: "18px", color: "#6a8aaa", maxWidth: "480px",
            lineHeight: 1.7, margin: "0 0 40px", fontWeight: "300",
          }}>
            ატვირთე შენი ჩანაწერები. გონი ხელოვნური ინტელექტის დახმარებით შექმნის სასწავლო ბარათებს.
          </p>


          <div className="fade-4" style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center" }}>
            <button className="cta-btn" onClick={() => setScreen("upload")} style={{
              padding: "14px 32px", background: "#3D9BFF", color: "#fff", border: "none",
              borderRadius: "10px", cursor: "pointer", fontSize: "15px", fontWeight: "500",
              boxShadow: "0 8px 32px rgba(61,155,255,0.3)",
            }}>დაიწყე უფასოდ →</button>
            <button className="ghost-btn" onClick={() => setShowHowItWorks(true)} style={{
              padding: "14px 32px", background: "transparent", color: "#5a7a9a",
              border: "1px solid #1e3a5f", borderRadius: "10px", cursor: "pointer", fontSize: "15px",
            }}>ნახე, როგორ მუშაობს</button>
          </div>
        </div>
      </section>


      <footer style={{ borderTop: "1px solid #0f2039", padding: "28px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <img src={LOGO} alt="Goni" style={{ width: "24px", height: "24px", borderRadius: "6px", objectFit: "cover" }} />
          <span style={{ fontSize: "14px", color: "#3a6080", fontFamily: "monospace" }}>Goni · გონი · 2026</span>
        </div>
        <div style={{ fontSize: "12px", color: "#3a6080", fontFamily: "monospace", letterSpacing: "2px" }}>
          BUILT BY LUKA LOMIDZE
        </div>
        <a href="https://lukalomidze.com" target="_blank" rel="noopener noreferrer" style={{ color: "#2a4a6a", fontSize: "12px", textDecoration: "none", fontFamily: "monospace" }}>კონტაქტი</a>
      </footer>
    </div>
  );
}
