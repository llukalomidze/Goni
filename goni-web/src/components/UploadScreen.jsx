import { useState } from 'react';
import LOGO from '../assets/goni-logo-sm.png';

export default function UploadScreen({ setScreen, onCardsGenerated }) {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null); // Changed to store the actual file object
  const [dragging, setDragging] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false); // Tracks AI loading state

  const handleFile = (uploadedFile) => {
    if (uploadedFile && uploadedFile.type === "application/pdf") {
      setFile(uploadedFile);
      setText("");
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const canGenerate = (text.trim().length > 30 || file) && !isGenerating;

  // ✨ THE MAGIC: Function to send data to your Express backend ✨
  const handleGenerate = async () => {
    setIsGenerating(true);
    
    try {
      const formData = new FormData();
      
      if (file) {
        formData.append("file", file);
      } else if (text) {
        formData.append("text", text);
      }

      // Call your local Node.js server
      const response = await fetch("http://localhost:5000/api/generate", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Server failed to generate");

      const data = await response.json();
      
      console.log("SUCCESS! Here are your flashcards:", data.flashcards);
      alert("წარმატებით დაგენერირდა! შეამოწმე კონსოლი (F12) ბარათების სანახავად.");
      
      if (onCardsGenerated) onCardsGenerated(data.flashcards);

    } catch (error) {
      console.error("Error:", error);
      alert("შეცდომა გენერაციისას. სცადე თავიდან.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh", background: "#060d16", color: "#e8edf5",
      display: "flex", flexDirection: "column",
      fontFamily: "'DM Sans', system-ui, sans-serif",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />

      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        @keyframes pulseLoad { 0% { opacity: 0.6; } 50% { opacity: 1; } 100% { opacity: 0.6; } }
        .upload-fade { animation: fadeUp 0.5s ease both; }
        .gen-btn:hover:not(:disabled) { background: #2d8aef !important; transform: translateY(-2px); box-shadow: 0 12px 40px rgba(61,155,255,0.4) !important; }
        .gen-btn { transition: all 0.25s ease; }
        .gen-btn:disabled { opacity: 0.35 !important; cursor: not-allowed !important; transform: none !important; box-shadow: none !important; }
        textarea:focus { outline: none; border-color: #3D9BFF66 !important; }
        .drop-zone:hover { border-color: #3D9BFF66 !important; background: rgba(61,155,255,0.04) !important; }
        .back-btn:hover { color: #e8edf5 !important; border-color: #3a6080 !important; }
        
        .logo-group { transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); cursor: pointer; }
        .logo-group:hover { transform: scale(1.05); }
        .loading-text { animation: pulseLoad 1.5s infinite ease-in-out; }
      `}</style>

      {/* Nav */}
      <nav style={{ padding: "18px clamp(16px, 5vw, 40px)", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #0f2039", flexWrap: "wrap", gap: "16px" }}>
        <div className="logo-group" style={{ display: "flex", alignItems: "center", gap: "12px", flexShrink: 0 }}>
          <img src={LOGO} alt="Goni" style={{ width: "44px", height: "44px", borderRadius: "10px", objectFit: "cover", boxShadow: "0 4px 20px rgba(61,155,255,0.4)" }} />
          <div style={{ marginLeft: "12px", padding: "2px 10px", borderRadius: "100px", background: "rgba(255,180,0,0.08)", border: "1px solid rgba(255,180,0,0.2)" }}>
            <span style={{ fontSize: "10px", color: "#FFB400", fontFamily: "monospace", letterSpacing: "2px" }}>ბეტა</span>
          </div>
        </div>
        
        <button className="back-btn" onClick={() => setScreen("home")} style={{
          background: "transparent", color: "#5a7a9a", border: "1px solid #1a3550", 
          padding: "8px 16px", borderRadius: "8px", cursor: "pointer", 
          fontSize: "13px", fontFamily: "monospace", transition: "all 0.2s",
          display: "flex", alignItems: "center", gap: "6px"
        }}>
          <span>←</span> მთავარი
        </button>
      </nav>

      {/* Main */}
      <div className="upload-fade" style={{ flex: 1, maxWidth: "640px", width: "100%", margin: "0 auto", padding: "60px 24px 80px", display: "flex", flexDirection: "column", gap: "32px" }}>
        
        {/* Heading */}
        <div>
          <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(28px, 5vw, 40px)", fontWeight: "400", margin: "0 0 10px", letterSpacing: "-1px" }}>
            შენი მასალა — შენი ბარათები
          </h1>
          <p style={{ color: "#4a6a8a", fontSize: "15px", margin: 0, lineHeight: 1.7, fontWeight: "300" }}>
            ჩასვი ტექსტი ან ატვირთე PDF — გონი ამოიღებს მთავარ ცნებებს და სასწავლო ბარათებს წამებში შექმნის.
          </p>
        </div>



        {/* Text area */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <textarea
            value={text}
            onChange={e => { setText(e.target.value); setFile(null); }}
            placeholder="ჩასვი ლექციის ჩანაწერები, სახელმძღვანელოს პარაგრაფი, ან ნებისმიერი სასწავლო ტექსტი..."
            disabled={isGenerating}
            style={{
              width: "100%", height: "220px", background: "#080e18",
              border: "1px solid #0f2039", borderRadius: "12px",
              color: "#e8edf5", fontSize: "14px", lineHeight: 1.7,
              padding: "18px", resize: "vertical", boxSizing: "border-box",
              fontFamily: "'DM Sans', system-ui, sans-serif",
              transition: "border-color 0.2s",
              opacity: isGenerating ? 0.5 : 1
            }}
          />
          <div style={{ textAlign: "right", fontSize: "11px", color: text.length > 30 ? "#3D9BFF" : "#2a4060", fontFamily: "monospace" }}>
            {text.length} სიმბოლო {text.length > 30 ? "✓" : "— მინ. 30"}
          </div>
        </div>

        {/* Divider */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ flex: 1, height: "1px", background: "#0f2039" }} />
          <span style={{ fontSize: "12px", color: "#2a4060", fontFamily: "monospace" }}>ან</span>
          <div style={{ flex: 1, height: "1px", background: "#0f2039" }} />
        </div>

        {/* Drop zone */}
        <div
          className="drop-zone"
          onDragOver={e => { e.preventDefault(); if(!isGenerating) setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => !isGenerating && document.getElementById("pdf-input").click()}
          style={{
            border: `1px dashed ${dragging ? "#3D9BFF" : file ? "#3D9BFF44" : "#1a3550"}`,
            borderRadius: "12px", padding: "32px 24px", textAlign: "center",
            cursor: isGenerating ? "not-allowed" : "pointer", 
            background: dragging ? "rgba(61,155,255,0.06)" : file ? "rgba(61,155,255,0.03)" : "transparent",
            transition: "all 0.2s",
            opacity: isGenerating ? 0.5 : 1
          }}
        >
          <input id="pdf-input" type="file" accept=".pdf" style={{ display: "none" }} onChange={e => handleFile(e.target.files[0])} disabled={isGenerating} />
          {file ? (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
              <span style={{ fontSize: "20px" }}>📄</span>
              <span style={{ fontSize: "14px", color: "#6ab0ff" }}>{file.name}</span>
              {!isGenerating && (
                <button onClick={e => { e.stopPropagation(); setFile(null); }} style={{ background: "none", border: "none", color: "#2a4060", cursor: "pointer", fontSize: "16px" }}>×</button>
              )}
            </div>
          ) : (
            <>
              <div style={{ fontSize: "28px", marginBottom: "10px" }}>📄</div>
              <div style={{ fontSize: "14px", color: "#4a6a8a", lineHeight: 1.6 }}>
                გადმოიტანე PDF აქ<br />
                <span style={{ fontSize: "12px", color: "#2a4060" }}>ან დააჭირე ასარჩევად</span>
              </div>
            </>
          )}
        </div>

        {/* Generate button */}
        <button
          className="gen-btn"
          disabled={!canGenerate}
          onClick={handleGenerate}
          style={{
            padding: "16px", background: canGenerate ? "#3D9BFF" : "#0f2039",
            color: canGenerate ? "#fff" : "#2a4060", border: "none",
            borderRadius: "12px", cursor: canGenerate ? "pointer" : "not-allowed",
            fontSize: "16px", fontWeight: "500",
            boxShadow: canGenerate ? "0 8px 32px rgba(61,155,255,0.25)" : "none",
          }}
        >
          {isGenerating ? <span className="loading-text">⚡ მუშავდება AI-ით...</span> : "⚡ ბარათების გენერაცია"}
        </button>

        <p style={{ textAlign: "center", fontSize: "12px", color: "#1e3a5a", fontFamily: "monospace", margin: "-16px 0 0" }}>
          გენერაცია ხდება Google AI-ის საშუალებით · შენი მასალა არ ინახება
        </p>
      </div>
    </div>
  );
}