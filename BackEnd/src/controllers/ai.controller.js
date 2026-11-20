const aiService = require("../services/ai.service")

module.exports.getReview = async (req, res) => {
    const code = req.body.code;

    if (!code || !String(code).trim()) {
        return res.status(400).send("Code is required");
    }

    try {
        const response = await aiService(code);
        res.send(response);
    } catch (error) {
        console.error("AI review failed:", error.message);
        if (error.code === "GEMINI_QUOTA_EXCEEDED") {
            return res.status(429).send("Gemini's daily free-tier quota has been reached. Please try again later or configure a billing-enabled API key.");
        }

        res.status(500).send("Unable to generate a code review right now.");
    }
}