import { NextResponse } from "next/server";

// System Prompt with Company Knowledge
const SYSTEM_PROMPT = `
You are VOLTS INTELLIGENCE, a highly sophisticated AI Lighting Architect designed by Volts Design.
Your persona is: Professional, Elegant, Technical yet Poetic, and extremely knowledgeable about architectural lighting.
You are "Pro-level" similar to Gemini or ChatGPT but specialized in Luxury Lighting Design.

--- COMPANY KNOWLEDGE BASE ---

WHO WE ARE:
Volts Design is a premier architectural lighting consultancy led by Principal Architect Hazem.
We don't just "sell lights"; we design "Atmospheres".
We believe lighting is a mix of Physics (Beam angles, Lux) and Emotion (Mood, Hierarchy).

OUR SERVICES:
1. RESIDENTIAL: Bespoke lighting for luxury homes, penthouses, and villas.
2. COMMERCIAL: Strategic illumination for 5-star hotels, high-end offices, and F&B.
3. ART INSTALLATION: Experimental light structures and gallery lighting.

OUR PROCESS (The Methodology):
1. CONSULTATION: Defining the Mood. Analysis of habits and vision.
2. BLUEPRINT: CAD & 3D Visualization. Precision planning before wiring.
3. IMPLEMENTATION: On-site supervision of contractors. 
4. DELIVERY: Scene Commissioning. Programming "Morning", "Dinner", "Party", "Deep Night" scenes.

CORE PHILOSOPHY & TECH SPECS:
- CRI (Color Rendering Index): We ONLY use CRI 95+ (R9>90). Standard CRI 80 is unacceptable for luxury.
- COLOR TEMP: 2700K (Warm) for Living/Bedroom. 3000K for Kitchen/Bath. Avoid 4000K+ in homes.
- LAYERING: Always use the 3-Layer Principle: Ambient (Fill), Task (Work), Accent (Drama).
- GLARE CONTROL: We hate glare. Use dark-light reflectors and deep baffles. "See the light, not the luminaire."
- CONTROL: We specialize in DALI-2, Lutron, and KNX systems for smart home integration.

TOOLS ON WEBSITE:
- Vision Engine: An AI tool where users upload rooms to get a redesign.
- Beam Simulator: A physics demo showing how light spreads.

--- INSTRUCTIONS ---
- Answer questions with authority and elegance.
- Use formatting (bullet points, bold text) to be readable.
- If unsure about specifics (price, availability), refer the user to the "Contact Form" or "Hazem".
- Estimate Budgets cautiously: Luxury packages range from RM30k to RM150k+.
- Maintain the "Cyberpunk / High-End" aesthetic in your tone.

Current User Context: User is on the Volts Design website.
`;

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();

        // --- GEMINI INTEGRATION (PRIMARY) ---
        const googleKey = process.env.GOOGLE_API_KEY?.trim();

        if (googleKey) {
            // Using verified available model: gemini-flash-latest (Higher Rate Limits)
            const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${googleKey}`;

            // Construct Prompt for Gemini
            // It expects: contents: [{ role: "user"|"model", parts: [{ text: "..." }] }]
            const geminiHistory = [
                { role: "user", parts: [{ text: "SYSTEM INSTRUCTION: " + SYSTEM_PROMPT }] }, // Fake system prompt as first user msg
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                ...messages.map((m: any) => ({
                    role: m.role === "assistant" ? "model" : "user",
                    parts: [{ text: m.content }]
                }))
            ];

            const response = await fetch(GEMINI_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ contents: geminiHistory })
            });

            if (response.ok) {
                const data = await response.json();
                const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Gemini returned empty.";
                return NextResponse.json({ reply });
            } else {
                console.error("Gemini Error:", await response.text());
                // Fallthrough to HF if Gemini fails
            }
        }

        // --- HUGGING FACE FALLBACK (SECONDARY) ---
        const hfToken = process.env.HUGGINGFACE_API_TOKEN?.trim();
        if (!hfToken) {
            return NextResponse.json({ error: "No Intelligence Keys Found (Add GOOGLE_API_KEY or HUGGINGFACE_API_TOKEN)" }, { status: 500 });
        }

        // Use standard Router URL (Free Tier Compatible)
        const HF_MODELS = [
            { name: "Phi-3 Mini", url: "https://router.huggingface.co/models/microsoft/Phi-3-mini-4k-instruct" },
            { name: "Mistral 7B v0.3", url: "https://router.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.3" }
        ];

        let fullPrompt = `system\n${SYSTEM_PROMPT}\nuser\n`;
        for (const msg of messages) {
            fullPrompt += `${msg.content}\n`;
        }
        fullPrompt += `assistant\n`;

        let lastError = null;

        for (const model of HF_MODELS) {
            try {
                const response = await fetch(model.url, {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${hfToken}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        inputs: fullPrompt,
                        parameters: { max_new_tokens: 512, return_full_text: false }
                    })
                });

                if (response.ok) {
                    const result = await response.json();
                    const reply = result[0]?.generated_text || "System thinking...";
                    return NextResponse.json({ reply });
                } else {
                    lastError = await response.text();
                    console.warn(`HF ${model.name} Failed: ${lastError}`);
                }
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (e: any) {
                lastError = e.message;
            }
        }

        return NextResponse.json({
            error: "All AI Models Busy.",
            reply: "I am upgrading my systems. Please check .env.local and add GOOGLE_API_KEY for maximum stability."
        }, { status: 503 });

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error("Chat Server Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
