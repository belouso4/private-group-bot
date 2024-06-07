import { Markup, Scenes } from "telegraf";
import { adminChangeOrderTariffKeyboard, adminOrderTariffKeyboard } from "../keyboards.js";
import Tariff from "../../../../models/Tariff.js";
import { setOrder } from "../helpers.js";
import { privateChatMiddleware } from "../../../../middleware.js";

const adminOrderTariffScene = new Scenes.BaseScene('admin-order-tariff-scene')

adminOrderTariffScene.enter(privateChatMiddleware, async (ctx) => {
    await ctx.editMessageText(
        'Для изменения порядка, нажмите на тариф, после чего используйте стрелки для его перемещения.',
        adminOrderTariffKeyboard(ctx.session.tariffs)
    )
})

adminOrderTariffScene.action(/tariffOrder_(.+)/, async (ctx) => {
    const id = ctx.callbackQuery.data.split('_')[1]

    await ctx.editMessageText(
        'Для изменения порядка, нажмите на тариф, после чего используйте стрелки для его перемещения.',
        adminChangeOrderTariffKeyboard(ctx.session.tariffs, id)
    )
})

adminOrderTariffScene.action(/(up|down)_(.+)/, async (ctx) => {
    const [move, id] = ctx.callbackQuery.data.split('_')
    ctx.session.tariffs = setOrder(ctx.session.tariffs, id, move)

    const bulkOps = ctx.session.tariffs.map(item => ({
        updateOne: {
            filter: { _id: item._id },
            update: { $set: { order: item.order } }
        }
    }));

    try {
        await Tariff.bulkWrite(bulkOps);

        await ctx.editMessageText(
            'Для изменения порядка, нажмите на тариф, после чего используйте стрелки для его перемещения.',
            adminChangeOrderTariffKeyboard(ctx.session.tariffs, id)
        )
    } catch (error) {
        console.log(error);
    }
})


adminOrderTariffScene.action('cancel', async ctx => {
    await ctx.deleteMessage()
    return await ctx.scene.enter('admin-tariff-scene')
})

export default adminOrderTariffScene