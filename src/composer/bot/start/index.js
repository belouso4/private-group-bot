import { Markup, Scenes } from "telegraf";
import User from "../../../models/User.js";
import { adminStartKeyboard, startKeyboard } from "./keyboards.js";
import { messages } from "../../../assets/index.js";
import { privateChatMiddleware } from "../../../middleware.js";

const startScene = new Scenes.BaseScene('start-scene')

startScene.enter(privateChatMiddleware, async (ctx) => {
    try {
        const { first_name, last_name, username } = ctx.update.message.from
        const keybord = ctx.isAdmin() ? adminStartKeyboard : startKeyboard

        await User.findOneAndUpdate(
            { user_id: ctx.getUserId() },
            {
                $setOnInsert: {
                    user_id: ctx.getUserId(),
                    first_name,
                    last_name,
                    username,
                    created_at: Date.now()
                }
            },
            { new: true, upsert: true }
        );

        ctx.session.language = ctx.session.language || 'ru'

        await ctx.reply(messages[ctx.session.language].startWelcome, keybord)
        await ctx.reply(messages[ctx.session.language].chooseActions)
    } catch (error) {
        console.log('error: ', error);
    }
})

export default startScene