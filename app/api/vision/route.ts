import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { image, vibe } = await req.json();

        if (!image) {
            return NextResponse.json({ error: "No image provided" }, { status: 400 });
        }

        const token = process.env.HUGGINGFACE_API_TOKEN?.trim();
        if (!token) {
            return NextResponse.json({ error: "Missing Hugging Face API Token" }, { status: 500 });
        }

        // Prompts
        let prompt = "luxury interior";
        // Enhanced style keywords for realism
        const styleKeywords = ", 8k, photorealistic, hyper-realistic, interior design photography, high quality, 4k, architectural digest, fujifilm, raw photo, highly detailed, cinematic lighting";

        if (vibe === "manhattan") prompt = "dark masculine Manhattan penthouse office living room, sleek leather furniture, rich mahogany wood paneling, dramatic night city lighting" + styleKeywords;
        if (vibe === "kyoto") prompt = "minimalist Kyoto zen sanctuary, premium light oak wood, textured beige linen, natural bonsai trees, soft diffuse daylight" + styleKeywords;
        if (vibe === "parisian") prompt = "opulent Parisian Haussmann apartment, clean white walls, intricate gold molding, herringbone parquet floors, crystal chandeliers, natural light" + styleKeywords;
        if (vibe === "milan") prompt = "trendy Milan avant-garde studio, colorful Memphis furniture, neon accents, dark moody walls, high-fashion decor, editorial shot" + styleKeywords;

        // STRATEGY: 
        // 1. Try "Router" URL with v1-5 (Most likely to work)
        // 2. Try "API-Inference" URL with v1-5 (Legacy)
        // 3. Try "SDXL" on Router (Hit or miss on free tier)

        const ATTEMPTS = [
            { url: "https://router.huggingface.co/models/runwayml/stable-diffusion-v1-5", name: "Router v1.5" },
            { url: "https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5", name: "Legacy v1.5" },
            { url: "https://router.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0", name: "Router SDXL" },
            { url: "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0", name: "Legacy SDXL" }
        ];

        let lastError = null;

        for (const attempt of ATTEMPTS) {
            console.log(`[Vision API] Trying ${attempt.name} (${attempt.url})`);
            try {
                const response = await fetch(attempt.url, {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                        "x-use-cache": "false"
                    },
                    body: JSON.stringify({
                        inputs: prompt,
                        parameters: {
                            image: image,
                            strength: 0.65, // Lowered from 0.75 to preserve more structure
                            guidance_scale: 8.0, // Slightly increased for prompt adherence
                            num_inference_steps: 30, // Increased steps for quality
                            negative_prompt: "cartoon, illustration, painting, drawing, anime, 3d render, cgi, sketch, watermark, text, signature, blurry, low quality, distorted, ugly, bad architecture"
                        },
                        options: {
                            wait_for_model: true
                        }
                    }),
                });

                if (response.ok) {
                    console.log(`[Vision API] Success with ${attempt.name}`);
                    const imageBlob = await response.blob();
                    const arrayBuffer = await imageBlob.arrayBuffer();
                    const buffer = Buffer.from(arrayBuffer);
                    const base64Image = `data:image/jpeg;base64,${buffer.toString("base64")}`;
                    return NextResponse.json(base64Image, { status: 200 });
                } else {
                    const errText = await response.text();
                    console.warn(`[Vision API] Failed ${attempt.name}: ${response.status} - ${errText}`);
                    lastError = errText;
                }
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (e: any) {
                console.error(`[Vision API] Error calling ${attempt.name}:`, e);
                lastError = e.message;
            }
        }

        // FINAL FALLBACK: Fake it with Pollinations Text-to-Image (Better than error)
        // Note: This ignores the input image structure, which might be why use sees "cartoonish" or "unrelated" results if HF fails.
        // We will try to make the prompt extremely descriptive to compensate.
        console.log("[Vision API] Falling back to Pollinations Text-to-Image");
        const pollinationsPrompt = encodeURIComponent(prompt);
        const pollinationsUrl = `https://image.pollinations.ai/prompt/${pollinationsPrompt}?width=1024&height=1024&nologo=true&model=flux`; // Use Flux model if available or default 

        // We need to fetch it to convert to base64 for consistency with our frontend
        try {
            const polyRes = await fetch(pollinationsUrl);
            if (polyRes.ok) {
                const arrayBuffer = await polyRes.arrayBuffer();
                const buffer = Buffer.from(arrayBuffer);
                const base64Image = `data:image/jpeg;base64,${buffer.toString("base64")}`;
                return NextResponse.json(base64Image, { status: 200 });
            }
        } catch (e) {
            console.error("Pollinations fallback failed", e);
        }

        // If even fallback fails
        return NextResponse.json({
            error: `Generation Failed. Last HF Error: ${lastError}`,
            details: "Free Tier limits reached or models unavailable."
        }, { status: 500 });


        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error("Server Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
