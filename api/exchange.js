export default async function handler(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") return res.status(200).end();

    const rawBody = await new Promise((resolve) => {
        let data = "";
        req.on("data", chunk => data += chunk);
        req.on("end", () => resolve(data));
    });

    const { slack_id, message } = JSON.parse(rawBody);

    if (!slack_id || !message) {
        return res.status(400).json({ error: "missing slack_id or message" });
    }

    const response = await fetch("https://slack.com/api/chat.postMessage", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.SLACK_BOT_TOKEN}`
        },
        body: JSON.stringify({
            channel: slack_id,
            text: message
        })
    });

    const data = await response.json();
    res.status(200).json(data);
}