import express from "express"
import bodyParser from "body-parser";
import cors from "cors"
import { CIDCache, Sessions, SPCache } from "../ai/cache.js";
import { completeConversation } from "../ai/openai.js";
import message from "../events/message";

const app = express()

app.use(bodyParser.json())
app.use(cors())

// Limit trial conversations to 5 messages
const MessageCounts = new Map<string,number>()

// Trial Conversation on website
// POST /api/trialconvo
// Body: JSON, 2 fields
// id - randomly generated string on website
// message - user input for trial

// Possible JSON response fields:
// error - error message
// message - response message to display to user

// Status Codes:
// 400 - Bad Input/Request
// 200 - Normal/OK
// 429 - Too Many Requests/Trial Expired

app.post("/api/trialconvo", (req, res) => {
    if (req.headers["content-type"] != "application/json") {
        return res.status(400).json({"error":"Request must be JSON"})
    }


    // Check input
    let missing = []
    if (req.body.id == undefined) {
        missing.push("id")
    }
    if (req.body.message == undefined) {
        missing.push("message")
    }

    if (missing.length > 0) {
        return res.status(400).json({"error":`Missing fields: ${missing.join(",")}`})
    }

    const convoId = `trial-${req.body.id}`
    if (!Sessions.has(convoId)) {
        Sessions.add(convoId)
        MessageCounts.set(convoId,0)
    }

    if (MessageCounts.get(convoId) >= 5) {
        return res.status(429).json({"message":"Trial Expiry Placeholder"})
    }

    CIDCache.set(convoId, convoId)
    SPCache.set(convoId, "Therapist")

    completeConversation("Trial User", convoId, req.body.message).then((response) => {
       
        let current = MessageCounts.get(convoId)
        MessageCounts.set(convoId, current+1)

        return res.status(200).json({"message":response})
    })
});

app.listen(process.env.PORT)