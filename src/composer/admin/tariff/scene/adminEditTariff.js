import { Scenes } from "telegraf";
import Tariff from "../../../../models/Tariff.js";
import { adminEditTariffKeyboard } from "../keyboards.js";
import { messages } from "../../../../assets/index.js";
import { privateChatMiddleware } from "../../../../middleware.js";

const adminEditTariffScene = new Scenes.BaseScene('admin-edit-tariff-scene')

adminEditTariffScene.enter(privateChatMiddleware, async (ctx) => {
    try {
        const tariff = await Tariff.findOne({ _id: ctx.match[1] })
        await ctx.editMessageText(
            messages[ctx.session.language].adminEditTariff({ name: tariff.name }),
            adminEditTariffKeyboard(ctx.match[1])
        )
    } catch (error) {
        console.log(error);
    }
})

adminEditTariffScene.action(/deleteTarif_(.+)/, async (ctx) => {
    try {
        await Tariff.deleteOne({ _id: ctx.match[1] })
        await ctx.editMessageText(messages[ctx.session.language].adminDeleteTariff)
    } catch (error) {
        console.log(error);
    }
})

adminEditTariffScene.action('cancel', async ctx => {
    await ctx.deleteMessage()
    return await ctx.scene.enter('admin-tariff-scene')
})

export default adminEditTariffScene