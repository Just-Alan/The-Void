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

    console.log("rawBody received:", rawBody);

    let code;
    try {
        const parsed = JSON.parse(rawBody);
        code = parsed.code;
    } catch(e) {
        console.log("JSON parse error:", e);
        return res.status(400).json({ error: "bad json" });
    }

    console.log("code:", code);

    if (!code) {
        return res.status(400).json({ error: "no code" });
    }

    const tokenResponse = await fetch("https://auth.hackclub.com/oauth/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            client_id: process.env.HCA_CLIENT_ID,
            client_secret: process.env.HCA_CLIENT_SECRET,
            code: code,
            redirect_uri: "https://the-void-dusky.vercel.app/auth/callback.html",
            grant_type: "authorization_code"
        })
    });

    const tokenData = await tokenResponse.json();
    console.log("tokenData:", JSON.stringify(tokenData));

    if (!tokenData.access_token) {
        return res.status(400).json({ error: "no access token", details: tokenData });
    }

    const userResponse = await fetch("https://auth.hackclub.com/api/v1/me", {
        headers: { "Authorization": `Bearer ${tokenData.access_token}` }
    });

    const userData = await userResponse.json();
    console.log("userData:", JSON.stringify(userData));

    res.status(200).json({
        user_id: userData.identity.id,
        verified: userData.identity.verification_status
    });
}