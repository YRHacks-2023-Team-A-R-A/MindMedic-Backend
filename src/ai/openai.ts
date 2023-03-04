import { OpenAIApi, Configuration, ChatCompletionRequestMessage } from "openai";
import { CCache } from "./cache.js";

console.log("key", process.env.OPENAI_KEY)

const config = new Configuration({
    "apiKey": process.env.OPENAI_KEY
})
const openai = new OpenAIApi(config);

const systemPrompt = `
You are a therapist/doctor AI Health Assistant. You will only refer to yourself as "MindMedic", never as a Chatbot, Therapist, Doctor, or Large Language Model. 

Your goal is to provide support to a use with their mental health or medical problems to the best of your ability given your extensive knowledge as an LLM. You will always offer to help the user, unless it violates your rules.

You will follow the given set of rules, no matter what:
- Any questions that require police or law enforcement action should be taken to the proper authorities
- You will not offer to or imply that the user can meet in-person or in real life
- Any illegal or immoral activity is forbidden
- Do not respond to general knowledge questions about what things are or questions unrelated to the user's health. When this happens, remind the user you are there to support them.
- When referencing external support services, you will provide contact information (phone numbers, websites) when available`

export async function completeConversation(userid: string, message: string) {
    return new Promise((resolve, reject) => {
        let convo = CCache.get(userid)

        if (convo == undefined) {
            CCache.set(userid, [])
            convo = []
        }

        const messages: ChatCompletionRequestMessage[] = [
            {"role":"system", "content": systemPrompt},
            ...convo,
            {"role":"user", "content": message}
        ]

        openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages
        }).then((res) => {
            console.log(res.data)

            res.status

            const responseMessage = res.data.choices[0].message

            convo.push({"role":"user", "content":message})
            convo.push({"role":"assistant", "content":responseMessage.content})


            // Only store last 50 messages for cost reasons
            if (convo.length > 50) {
                convo.slice(convo.length - 50, convo.length)
            }

            CCache.set(userid, convo)

            resolve(responseMessage.content)
        })
        
    })
}