import { useState } from 'react';
import LOGO from '../assets/goni-logo-sm.png';
import AmbientBackground from './AmbientBackground';

export default function FlashcardScreen({ flashcards, onReset }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const nextCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      if (currentIndex < flashcards.length - 1) setCurrentIndex(prev => prev + 1);
    }, 150);
  };

  const prevCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      if (currentIndex > 0) setCurrentIndex(prev => prev - 1);
    }, 150);
  };

  const currentCard = flashcards[currentIndex];

  if (!flashcards || flashcards.length === 0) return null;

  return (
    <div style={{
      minHeight: "100vh", background: "#060d16", color: "#e8edf5",
      display: "flex", flexDirection: "column",
      fontFamily: "'DM Sans', system-ui, sans-serif",
    }}>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .fade-in { animation: fadeIn 0.5s ease both; }
        
        /* 3D Flip Magic */
        .card-scene { perspective: 1000px; width: 100%; max-width: 600px; height: 380px; margin: 0 auto; cursor: pointer; }
        .card-container {
          width: 100%; height: 100%; position: relative;
          transition: transform 0.6s cubic-bezier(0.4, 0.2, 0.2, 1);
          transform-style: preserve-3d;
        }
        .card-container.is-flipped { transform: rotateY(180deg); }
        
        .card-face {
          position: absolute; width: 100%; height: 100%;
          backface-visibility: hidden;
          border-radius: 20px; padding: 40px;
          display: flex; flex-direction: column; align-items: center; justifyContent: center;
          box-sizing: border-box; text-align: center;
          box-shadow: 0 24px 48px rgba(0,0,0,0.4), 0 0 0 1px rgba(61,155,255,0.1);
        }
        .card-front { background: #0b1622; }
        .card-back { background: #112236; transform: rotateY(180deg); border: 1px solid rgba(61,155,255,0.2); }
        
        .nav-btn:hover:not(:disabled) { background: #3D9BFF; color: #fff; border-color: #3D9BFF; }
        .nav-btn:disabled { opacity: 0.3; cursor: not-allowed; }
        .nav-btn { transition: all 0.2s; }
      `}</style>
      
      <AmbientBackground />

      {/* Nav */}
      <nav style={{ position: "relative", zIndex: 10, padding: "18px clamp(16px, 5vw, 40px)", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #0f2039" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <img src={LOGO} alt="Goni" style={{ width: "44px", height: "44px", borderRadius: "10px", objectFit: "cover" }} />
          <div>
            <div style={{ fontSize: "18px", fontFamily: "'DM Serif Display', serif" }}>Goni</div>
            <div style={{ fontSize: "11px", color: "#6a8aaa", fontFamily: "monospace" }}>{flashcards.length} ბარათი</div>
          </div>
        </div>
        
        <button onClick={onReset} style={{
          background: "transparent", color: "#5a7a9a", border: "1px solid #1a3550", 
          padding: "8px 16px", borderRadius: "8px", cursor: "pointer", 
          fontSize: "13px", fontFamily: "monospace", transition: "all 0.2s"
        }}>
          ახალი მასალა
        </button>
      </nav>

      {/* Main Area */}
      <div className="fade-in" style={{ position: "relative", zIndex: 10, flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "40px 24px" }}>
        
        {/* Progress Indicator */}
        <div style={{ marginBottom: "32px", fontSize: "14px", color: "#5a7a9a", fontFamily: "monospace", letterSpacing: "2px" }}>
          ბარათი {currentIndex + 1} / {flashcards.length}
        </div>

        {/* The 3D Card */}
        <div className="card-scene" onClick={() => setIsFlipped(!isFlipped)}>
          <div className={`card-container ${isFlipped ? 'is-flipped' : ''}`}>
            
            <div className="card-face card-front">
              <div style={{ fontSize: "12px", color: "#3D9BFF", fontFamily: "monospace", letterSpacing: "1px", marginBottom: "24px", textTransform: "uppercase" }}>შეკითხვა</div>
              <h2 style={{ fontSize: "clamp(20px, 4vw, 28px)", fontWeight: "400", margin: 0, lineHeight: 1.5, color: "#e8edf5" }}>
                {currentCard.front}
              </h2>
              <div style={{ marginTop: "auto", paddingTop: "24px", fontSize: "12px", color: "#3a6080" }}>
                დააჭირე პასუხის სანახავად
              </div>
            </div>

            <div className="card-face card-back">
              <div style={{ fontSize: "12px", color: "#4ade80", fontFamily: "monospace", letterSpacing: "1px", marginBottom: "24px", textTransform: "uppercase" }}>პასუხი</div>
              <p style={{ fontSize: "clamp(16px, 3vw, 20px)", fontWeight: "300", margin: 0, lineHeight: 1.6, color: "#c8d5e5" }}>
                {currentCard.back}
              </p>
            </div>

          </div>
        </div>

        {/* Controls */}
        <div style={{ display: "flex", alignItems: "center", gap: "24px", marginTop: "48px" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
            <button className="nav-btn" onClick={prevCard} disabled={currentIndex === 0} style={{
              width: "56px", height: "56px", borderRadius: "50%", background: "#0b1622",
              border: "1px solid #1a3550", color: "#6a8aaa", fontSize: "20px", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center"
            }}>←</button>
            <span style={{ fontSize: "11px", color: "#5a7a9a", fontFamily: "monospace", letterSpacing: "0.5px" }}>უკან დაბრუნება</span>
          </div>
          
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
            <button className="nav-btn" onClick={nextCard} disabled={currentIndex === flashcards.length - 1} style={{
              width: "56px", height: "56px", borderRadius: "50%", background: "#0b1622",
              border: "1px solid #1a3550", color: "#6a8aaa", fontSize: "20px", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center"
            }}>→</button>
            <span style={{ fontSize: "11px", color: "#5a7a9a", fontFamily: "monospace", letterSpacing: "0.5px" }}>შემდეგზე გადასვლა</span>
          </div>
        </div>

      </div>

      <div style={{ textAlign: "center", padding: "24px", fontSize: "12px", color: "#3a6080", fontFamily: "monospace", letterSpacing: "2px" }}>
        BUILT BY LUKA LOMIDZE
      </div>
    </div>
  );
}
