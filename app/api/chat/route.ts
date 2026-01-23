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
            // Using verified available model from list-models.js check
            const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${googleKey}`;

            console.log(`[DEBUG] Attempting Gemini Call using: ${GEMINI_URL.replace(googleKey, 'REDACTED')}`);
            console.log(`[DEBUG] Key Length: ${googleKey.length}`);

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

            try {
                const response = await fetch(GEMINI_URL, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ contents: geminiHistory })
                });

                console.log(`[DEBUG] Gemini Response Status: ${response.status} ${response.statusText}`);

                if (response.ok) {
                    const data = await response.json();
                    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Gemini returned empty.";
                    return NextResponse.json({ reply });
                } else {
                    const errText = await response.text();
                    console.error("[DEBUG] Gemini Error Body:", errText);
                    // Fallthrough to HF if Gemini fails
                }
            } catch (fetchErr) {
                console.error("[DEBUG] Gemini Network Error:", fetchErr);
            }
        }

        // --- HUGGING FACE FALLBACK (SECONDARY) ---
        const hfToken = process.env.HUGGINGFACE_API_TOKEN?.trim();
        if (hfToken) {
            // Use correct Router URL structure for serverless inference
            const HF_MODELS = [
                { name: "Phi-3 Mini", url: "https://router.huggingface.co/models/microsoft/Phi-3-mini-4k-instruct" },
                { name: "Mistral 7B v0.3", url: "https://router.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.3" }
            ];

            let fullPrompt = `system\n${SYSTEM_PROMPT}\nuser\n`;
            for (const msg of messages) {
                fullPrompt += `${msg.content}\n`;
            }
            fullPrompt += `assistant\n`;

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
                    }
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                } catch (e: any) {
                    console.warn("HF Model Failed", e);
                }
            }
        }

        // --- FINAL FALLBACK: LOCAL SIMULATED INTELLIGENCE (TERTIARY) ---
        // Since APIs are unstable, we use a rudimentary keyword engine to give "Smart" answers.

        const lastUserMessage = messages[messages.length - 1].content.toLowerCase();
        let fallbackReply = "Systems are calibrating. Could you describe specific dimensions or elements of the space?";

        // Intelligent Keyword Matching
        if (lastUserMessage.includes("kitchen")) {
            fallbackReply = "For kitchens, functionality is key. \n\n1. **Task Layer**: Use 3000K-4000K downlights over the island.\n2. **Shadow Elimination**: Install high-CRI under-cabinet strips to light the countertops.\n3. **Atmosphere**: Add a pendant with warm dimming (2700K) over the dining area for contrast.";
        } else if (lastUserMessage.includes("bedroom") || lastUserMessage.includes("sleep")) {
            fallbackReply = "Bedrooms require serenity. \n\n• Avoid direct downlights over the bed (glare bomb).\n• Use **Hidden Cove Lighting** for a soft glow.\n• Aim for 2700K color temperature to promote melatonin production.\n• Reading lights should be focused, tight beams (15-24°).";
        } else if (lastUserMessage.includes("living") || lastUserMessage.includes("couch")) {
            fallbackReply = "The Living Room is about flexibility. \n\nLayering is essential:\n1. **Ambient**: Soft cove lighting or uplighting.\n2. **Accent**: Graze textured walls or highlight art with 3000K spots.\n3. **Control**: Ensure you have at least 3 scenes: 'Day', 'Evening', and 'Cinema'.";
        } else if (lastUserMessage.includes("bathroom") || lastUserMessage.includes("toilet")) {
            fallbackReply = "Luxury bathrooms need flattering light.\n\n• **Vanity**: Side-lighting (sconces) is better than overhead to avoid shadows on the face.\n• **Shower**: Use an IP65 rated recessed fixture, preferably grazing the tile wall.\n• **Temperature**: 3000K is ideal for clean, crisp reflection.";
        } else if (lastUserMessage.includes("cri")) {
            fallbackReply = "**CRI (Color Rendering Index)** is critical. \n\nStandard LEDs are CRI 80 (makes food/skin look dull).\nWe ONLY specify **CRI 95+**. \n\nIt ensures red tones (R9) pop, making wood furniture and skin tones look vibrant and authentic.";
        } else if (lastUserMessage.includes("glare")) {
            fallbackReply = "Glare is the enemy of luxury. \n\nWe fight it by:\n1. using **Deep Baffles** to hide the light source.\n2. positioning fixtures **Close to Walls** (grazing) rather than in the center of the room.\n3. using **Honeycombs** to cut lateral light spill.";
        } else if (lastUserMessage.includes("hi") || lastUserMessage.includes("hello")) {
            fallbackReply = "Systems Online. I am Volts Intelligence. \n\nI can analyze your space or discuss lighting physics. Try asking about **'Kitchen Layering'** or **'Bedroom Glare Control'**.";
        }

        return NextResponse.json({
            reply: fallbackReply + "\n\n*(Note: Operating on Local Logic Core due to cloud latency.)*"
        });

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error("Chat Server Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
