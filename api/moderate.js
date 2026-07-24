export default async function handler(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }

    const rawBody = await new Promise((resolve) => {
        let data = "";
        req.on("data", chunk => data += chunk);
        req.on("end", () => resolve(data));
    });

    const { content } = JSON.parse(rawBody);
    console.log("moderating content:", content);

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
        },
        body: JSON.stringify({
            model: "llama-3.3-70b-versatile",
            messages: [{
                role: "user",
                content: `You are a content moderator. Does this message contain hate speech, slurs, harassment, or harmful content? Reply with only YES or NO.\n\nMessage: ${content}`
            }],
            max_tokens: 3
        })
    });

    console.log("groq response status:", response.status);
    const data = await response.json();
    console.log("groq full response:", JSON.stringify(data));
    
    const verdict = data.choices?.[0]?.message?.content?.trim().toUpperCase();
    console.log("verdict:", verdict);

    res.status(200).json({ harmful: verdict === "YES" });
}