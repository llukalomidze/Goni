import { useState } from 'react';
import LOGO from '../assets/goni-logo-sm.png';

export default function UploadScreen() {
  const [text, setText] = useState("");
  const [fileName, setFileName] = useState("");
  const [dragging, setDragging] = useState(false);

  const handleFile = (file) => {
    if (file && file.type === "application/pdf") {
      setFileName(file.name);
      setText("");
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const canGenerate = text.trim().length > 30 || fileName;

  return (
    <div style={{
      minHeight: "100vh", background: "#060d16", color: "#e8edf5",
      display: "flex", flexDirection: "column",
      fontFamily: "'DM Sans', system-ui, sans-serif",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />

      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        .upload-fade { animation: fadeUp 0.5s ease both; }
        .gen-btn:hover { background: #2d8aef !important; transform: translateY(-2px); box-shadow: 0 12px 40px rgba(61,155,255,0.4) !important; }
        .gen-btn { transition: all 0.25s ease; }
        .gen-btn:disabled { opacity: 0.35 !important; cursor: not-allowed !important; transform: none !important; box-shadow: none !important; }
        textarea:focus { outline: none; border-color: #3D9BFF66 !important; }
        .drop-zone:hover { border-color: #3D9BFF66 !important; background: rgba(61,155,255,0.04) !important; }
      `}</style>

      {/* Nav */}
      <nav style={{ padding: "18px 32px", display: "flex", alignItems: "center", gap: "10px", borderBottom: "1px solid #0f2039" }}>
        <img src={LOGO} alt="Goni" style={{ width: "30px", height: "30px", borderRadius: "7px", objectFit: "cover" }} />
        <span style={{ fontSize: "18px", fontFamily: "'DM Serif Display', serif", letterSpacing: "-0.5px" }}>Goni</span>
        <div style={{ marginLeft: "12px", padding: "2px 10px", borderRadius: "100px", background: "rgba(255,180,0,0.08)", border: "1px solid rgba(255,180,0,0.2)" }}>
          <span style={{ fontSize: "10px", color: "#FFB400", fontFamily: "monospace", letterSpacing: "2px" }}>ბეტა</span>
        </div>
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

        {/* Tab indicator */}
        <div style={{ display: "flex", gap: "24px", borderBottom: "1px solid #0f2039", paddingBottom: "0" }}>
          {[["📋", "ტექსტის ჩასმა"], ["📄", "PDF-ის ატვირთვა"]].map(([icon, label], i) => (
            <div key={i} style={{
              paddingBottom: "12px", fontSize: "13px", color: i === 0 ? "#3D9BFF" : "#3a6080",
              borderBottom: i === 0 ? "2px solid #3D9BFF" : "2px solid transparent",
              fontFamily: "monospace", letterSpacing: "0.5px", cursor: "default",
              display: "flex", alignItems: "center", gap: "6px",
            }}>
              <span>{icon}</span>{label}
            </div>
          ))}
        </div>

        {/* Text area */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <textarea
            value={text}
            onChange={e => { setText(e.target.value); setFileName(""); }}
            placeholder="ჩასვი ლექციის ჩანაწერები, სახელმძღვანელოს პარაგრაფი, ან ნებისმიერი სასწავლო ტექსტი..."
            style={{
              width: "100%", height: "220px", background: "#080e18",
              border: "1px solid #0f2039", borderRadius: "12px",
              color: "#e8edf5", fontSize: "14px", lineHeight: 1.7,
              padding: "18px", resize: "vertical", boxSizing: "border-box",
              fontFamily: "'DM Sans', system-ui, sans-serif",
              transition: "border-color 0.2s",
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
          onDragOver={e => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => document.getElementById("pdf-input").click()}
          style={{
            border: `1px dashed ${dragging ? "#3D9BFF" : fileName ? "#3D9BFF44" : "#1a3550"}`,
            borderRadius: "12px", padding: "32px 24px", textAlign: "center",
            cursor: "pointer", background: dragging ? "rgba(61,155,255,0.06)" : fileName ? "rgba(61,155,255,0.03)" : "transparent",
            transition: "all 0.2s",
          }}
        >
          <input id="pdf-input" type="file" accept=".pdf" style={{ display: "none" }} onChange={e => handleFile(e.target.files[0])} />
          {fileName ? (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
              <span style={{ fontSize: "20px" }}>📄</span>
              <span style={{ fontSize: "14px", color: "#6ab0ff" }}>{fileName}</span>
              <button onClick={e => { e.stopPropagation(); setFileName(""); }} style={{ background: "none", border: "none", color: "#2a4060", cursor: "pointer", fontSize: "16px" }}>×</button>
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
          style={{
            padding: "16px", background: canGenerate ? "#3D9BFF" : "#0f2039",
            color: canGenerate ? "#fff" : "#2a4060", border: "none",
            borderRadius: "12px", cursor: canGenerate ? "pointer" : "not-allowed",
            fontSize: "16px", fontWeight: "500",
            boxShadow: canGenerate ? "0 8px 32px rgba(61,155,255,0.25)" : "none",
          }}
        >
          ⚡ ბარათების გენერაცია
        </button>

        <p style={{ textAlign: "center", fontSize: "12px", color: "#1e3a5a", fontFamily: "monospace", margin: "-16px 0 0" }}>
          გენერაცია ხდება Google AI-ის საშუალებით · შენი მასალა არ ინახება
        </p>
      </div>
    </div>
  );
}
