export default async function handler(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }

    let body = req.body;
    if (typeof body === "string") {
        body = JSON.parse(body);
    }

    const { code } = body;

    if (!code) {
        return res.status(400).json({ error: "no code provided" });
    }

    const response = await fetch("https://auth.hackclub.com/oauth/token", {
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

    const data = await response.json();
    res.status(200).json(data);
}