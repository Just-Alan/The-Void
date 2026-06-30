export default async function handler(req, res) {
    const { code } = req.body;

    const response = await fetch("https://the-void-dusky.vercel.app/api/exchange", {
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