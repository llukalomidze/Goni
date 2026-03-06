import { useState, useEffect } from 'react';
import UploadScreen from './components/UploadScreen';
import LOGO from './assets/goni-logo-sm.png';

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [screen, setScreen] = useState("home"); // "home" | "upload"
  const [scrolled, setScrolled] = useState(false);

  // Handle nav bar scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (screen === "upload") return <UploadScreen />;

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

      {/* ── Intro Modal ── */}
      {showIntro && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 999,
          background: "rgba(4,9,16,0.88)", backdropFilter: "blur(12px)",
          display: "flex", alignItems: "center", justifyContent: "center", padding: "24px",
          animation: "introFadeIn 0.4s ease both",
        }}>
          <div style={{
            maxWidth: "480px", width: "100%", background: "#0b1622",
            border: "1px solid #1a3550", borderRadius: "20px", padding: "44px 40px 36px",
            display: "flex", flexDirection: "column", alignItems: "center",
            animation: "introCardUp 0.5s 0.1s cubic-bezier(0.2,0,0,1) both",
            boxShadow: "0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(61,155,255,0.06)",
          }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "6px",
              padding: "4px 14px", borderRadius: "100px",
              background: "rgba(255,180,0,0.08)", border: "1px solid rgba(255,180,0,0.2)", marginBottom: "24px",
            }}>
              <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#FFB400", display: "inline-block", boxShadow: "0 0 6px #FFB400" }} />
              <span style={{ fontSize: "11px", color: "#FFB400", fontFamily: "monospace", letterSpacing: "2px", textTransform: "uppercase" }}>ბეტა ვერსია</span>
            </div>

            <img src={LOGO} alt="Goni" style={{ width: "64px", height: "64px", borderRadius: "16px", objectFit: "cover", marginBottom: "20px", boxShadow: "0 8px 24px rgba(61,155,255,0.2)" }} />

            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "28px", fontWeight: "400", margin: "0 0 16px", textAlign: "center", letterSpacing: "-0.5px", color: "#f0eee8" }}>
              გონი — ახალი დასაწყისია
            </h2>
            <p style={{ fontSize: "15px", color: "#5a7a9a", lineHeight: 1.75, textAlign: "center", margin: "0 0 12px", fontWeight: "300" }}>
              გონი ახლა პირველი ნაბიჯებს დგამს. ეს ბეტა ვერსიაა — ნაკლოვანებები შეიძლება იყოს, მაგრამ ძირითადი ფუნქცია სრულად მუშაობს.
            </p>
            <p style={{ fontSize: "15px", color: "#5a7a9a", lineHeight: 1.75, textAlign: "center", margin: "0 0 32px", fontWeight: "300" }}>
              ჩვენ ვვითარდებით — შენი აზრი პირდაპირ ჩვენს გადაწყვეტილებებს აყალიბებს.
            </p>

            <div style={{ width: "100%", height: "1px", background: "linear-gradient(90deg, transparent, #1a3550, transparent)", marginBottom: "28px" }} />

            <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "10px", marginBottom: "32px" }}>
              {[
                ["⚡", "ბარათების AI გენერაცია — ტექსტიდან, PDF-იდან"],
                ["🧠", "სივრცული გამეორება — რომ ვერაფერი დაგავიწყდეს"],
                ["🔓", "სრულიად უფასო — რეგისტრაცია არ საჭირო"],
              ].map(([icon, text], i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px 14px", borderRadius: "10px", background: "rgba(61,155,255,0.04)", border: "1px solid #0f2236" }}>
                  <span style={{ fontSize: "16px" }}>{icon}</span>
                  <span style={{ fontSize: "13px", color: "#7a9ab8", lineHeight: 1.5 }}>{text}</span>
                </div>
              ))}
            </div>

            <button className="intro-enter-btn" onClick={() => setShowIntro(false)} style={{
              width: "100%", padding: "14px", borderRadius: "12px",
              background: "transparent", color: "#3D9BFF",
              border: "1px solid #3D9BFF", cursor: "pointer",
              fontSize: "15px", fontWeight: "500", letterSpacing: "0.3px",
            }}>
              გავიგე, ვცადოთ →
            </button>
            <p style={{ fontSize: "11px", color: "#2a4060", marginTop: "16px", fontFamily: "monospace", letterSpacing: "1px" }}>v0.1 · გონი · 2025</p>
          </div>
        </div>
      )}

      {/* ── Nav ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "18px 40px", display: "flex", alignItems: "center", justifyContent: "space-between",
        background: scrolled ? "rgba(6,13,22,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid #0f2039" : "1px solid transparent",
        transition: "all 0.3s ease",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <img src={LOGO} alt="Goni logo" style={{ width: "36px", height: "36px", borderRadius: "8px", objectFit: "cover", boxShadow: "0 4px 16px rgba(61,155,255,0.3)" }} />
          <span style={{ fontSize: "20px", fontFamily: "'DM Serif Display', serif", letterSpacing: "-0.5px" }}>Goni</span>
        </div>
        <div style={{ display: "flex", gap: "32px", alignItems: "center" }}>
          {["შესაძლებლობები", "როგორ მუშაობს"].map(l => (
            <a key={l} href="#" style={{ color: "#6a8aaa", textDecoration: "none", fontFamily: "'DM Mono', monospace", fontSize: "12px", letterSpacing: "0.5px" }}
              onMouseEnter={e => e.currentTarget.style.color = "#e8edf5"}
              onMouseLeave={e => e.currentTarget.style.color = "#6a8aaa"}
            >{l}</a>
          ))}
          <button className="cta-btn" onClick={() => setScreen("upload")} style={{
            padding: "9px 22px", background: "#3D9BFF", color: "#fff", border: "none",
            borderRadius: "8px", cursor: "pointer", fontSize: "13px", fontWeight: "500",
            boxShadow: "0 4px 20px rgba(61,155,255,0.25)",
          }}>დაიწყე უფასოდ</button>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", padding: "120px 24px 80px", overflow: "hidden" }}>

        {/* Grid background */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 0,
          backgroundImage: "linear-gradient(rgba(61,155,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(61,155,255,0.04) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          animation: "gridMove 8s linear infinite",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, black 40%, transparent 100%)",
        }} />

        {/* Glow blobs */}
        <div style={{ position: "absolute", top: "20%", left: "10%", width: "400px", height: "400px", background: "radial-gradient(circle, rgba(61,155,255,0.08) 0%, transparent 70%)", animation: "pulse 6s ease infinite", zIndex: 0 }} />
        <div style={{ position: "absolute", bottom: "20%", right: "10%", width: "300px", height: "300px", background: "radial-gradient(circle, rgba(230,57,70,0.05) 0%, transparent 70%)", animation: "pulse 8s 2s ease infinite", zIndex: 0 }} />

        {/* Georgian watermark */}
        <div style={{
          position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
          fontSize: "clamp(120px, 20vw, 280px)", color: "rgba(61,155,255,0.025)",
          fontFamily: "'DM Serif Display', serif", userSelect: "none", zIndex: 0, lineHeight: 1, letterSpacing: "-8px",
        }}>გონი</div>

        <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "0", textAlign: "center" }}>

          {/* Badge */}
          <div className="fade-1" style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            padding: "6px 16px", borderRadius: "100px",
            border: "1px solid rgba(61,155,255,0.25)", background: "rgba(61,155,255,0.06)", marginBottom: "28px",
          }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#3D9BFF", display: "inline-block", boxShadow: "0 0 8px #3D9BFF" }} />
            <span style={{ fontSize: "12px", color: "#6ab0ff", fontFamily: "monospace", letterSpacing: "1px" }}>ხელოვნური ინტელექტი · ქართული · უფასოდ</span>
          </div>

          {/* Headline */}
          <h1 className="fade-2" style={{
            fontSize: "clamp(44px, 7vw, 88px)", fontWeight: "400", margin: "0 0 10px",
            fontFamily: "'DM Serif Display', serif", lineHeight: 1.05,
            letterSpacing: "-2px", maxWidth: "800px",
          }}>
            ისწავლე ჭკვიანურად.<br />
            <span style={{ color: "#3D9BFF" }}>დაიმახსოვრე მეტი.</span>
          </h1>

          {/* Georgian subtitle */}
          <div className="fade-3" style={{ fontSize: "15px", color: "#2d5a8a", fontFamily: "monospace", letterSpacing: "2px", marginBottom: "16px" }}>
            — გონი · ბრძნულად ისწავლე —
          </div>

          <p className="fade-3" style={{
            fontSize: "18px", color: "#6a8aaa", maxWidth: "480px",
            lineHeight: 1.7, margin: "0 0 40px", fontWeight: "300",
          }}>
            ჩასვი შენი ჩანაწერები. გონი ხელოვნური ინტელექტის დახმარებით შექმნის სასწავლო ბარათებს და სივრცული გამეორებით გასწავლის — ისე, რომ ვერაფერი დაგავიწყდეს.
          </p>

          {/* CTAs */}
          <div className="fade-4" style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center" }}>
            <button className="cta-btn" onClick={() => setScreen("upload")} style={{
              padding: "14px 32px", background: "#3D9BFF", color: "#fff", border: "none",
              borderRadius: "10px", cursor: "pointer", fontSize: "15px", fontWeight: "500",
              boxShadow: "0 8px 32px rgba(61,155,255,0.3)",
            }}>დაიწყე უფასოდ →</button>
            <button className="ghost-btn" style={{
              padding: "14px 32px", background: "transparent", color: "#5a7a9a",
              border: "1px solid #1e3a5f", borderRadius: "10px", cursor: "pointer", fontSize: "15px",
            }}>ნახე, როგორ მუშაობს</button>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ borderTop: "1px solid #0f2039", padding: "28px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <img src={LOGO} alt="Goni" style={{ width: "24px", height: "24px", borderRadius: "6px", objectFit: "cover" }} />
          <span style={{ fontSize: "14px", color: "#3a6080", fontFamily: "monospace" }}>Goni · გონი · 2025</span>
        </div>
        <a href="#" style={{ color: "#2a4a6a", fontSize: "12px", textDecoration: "none", fontFamily: "monospace" }}>კონტაქტი</a>
      </footer>
    </div>
  );
}
