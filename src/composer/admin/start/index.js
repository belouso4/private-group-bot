import { Scenes } from "telegraf";
import { adminKeyboard } from "./keyboards.js";
import { adminMiddleware } from "../../../middleware.js";
import messages from '../../../assets/messages/index.js'

const adminScene = new Scenes.BaseScene('admin-scene')

adminScene.enter(adminMiddleware, async (ctx) => await ctx.reply(messages[ctx.session.language].backMunu, adminKeyboard))

export default adminScene