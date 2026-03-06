require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const port = process.env.PORT || 5000;

// Initialize the Gemini SDK using the key from your .env file
const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Middleware
app.use(cors()); // Allows your React frontend to talk to this backend
app.use(express.json());

// Set up Multer to hold the uploaded PDF in memory (RAM) temporarily
const upload = multer({ storage: multer.memoryStorage() });

// The main generation route
app.post('/api/generate', upload.single('file'), async (req, res) => {
    try {
        let extractedText = "";

        if (req.file) {
            // Revert back to pdfParse function call
            const data = await pdfParse(req.file.buffer);
            extractedText = data.text;
            
            if (!extractedText || extractedText.trim().length < 10) {
                return res.status(400).json({ error: "PDF appears to be empty or an image-scan. Please use digital PDFs." });
            }
        } else if (req.body.text) {
            extractedText = req.body.text;
        }

        // IMPORTANT: Slice text to max 40,000 characters to prevent Render free-tier timeouts and Gemini context limits
        if (extractedText.length > 40000) {
            console.log(`Text too long (${extractedText.length}), slicing down to 40000 chars`);
            extractedText = extractedText.slice(0, 40000);
        }

        const prompt = `You are a professional tutor. Create exactly 7-10 high-quality study flashcards from the text provided. 
        Return ONLY a JSON array of objects. Each object must have "front" (the question) and "back" (the answer). 
        Do not use markdown blocks.
        
        Text: ${extractedText}`;

        console.log("Sending to Gemini, text length:", extractedText.length);

        // Call the AI using @google/generative-ai SDK
        const model = ai.getGenerativeModel({ model: "gemini-2.5-flash" });
        const result = await model.generateContent(prompt);
        const responseText = result.response.text();
        
        // Clean the response in case Gemini adds markdown backticks
        const cleanJson = responseText.replace(/```json|```/g, "").trim();
        console.log("Cleaned AI response:", cleanJson.substring(0, 200));
        
        const flashcards = JSON.parse(cleanJson);
        
        res.json({ flashcards });
    } catch (error) {
        console.error("Backend Error:", error);
        res.status(500).json({ error: "Generation failed: " + (error.message || "Unknown PDF parsing error") });
    }
});

app.listen(port, () => {
    console.log(`Goni Backend listening on port ${port}`);
});