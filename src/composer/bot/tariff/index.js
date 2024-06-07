import { Scenes } from "telegraf";
import { payTariffKeyboard, selectTariffKeyboard, tariffKeyboard } from "./keyboards.js";
import { messages } from "../../../assets/index.js";
import { getBillingLink } from "../../../services/yookassa.js";
import Tariff from "../../../models/Tariff.js";
import Subscription from "../../../models/Subscription.js";
import { privateChatMiddleware } from "../../../middleware.js";
import { getFormatedStartDateEndDate } from "./helpers.js";
import Transaction from "../../../models/Transaction.js";
import dayjs from "dayjs";

const tariffScene = new Scenes.BaseScene('tariff-scene')

tariffScene.enter(privateChatMiddleware, async (ctx) => {
    try {
        const tariffs = await Tariff.find().limit(5)
        if (!tariffs) return await ctx.reply("Ошибка. Подписок нет.")

        await ctx.reply(messages[ctx.session.language].selectTariff, tariffKeyboard(tariffs))
    } catch (error) {
        console.log(error);
    }
})

tariffScene.action(/^tariff_(.+)$/i, async (ctx) => {
    const id = ctx.callbackQuery.data.split('_')[1]

    try {
        const tariff = await Tariff.findById(id).lean()
        if (!tariff) return

        const { startDate, endDate } = getFormatedStartDateEndDate(tariff.duration)
        ctx.session.tariffData = {
            id: tariff._id,
        }

        await ctx.editMessageText(
            messages[ctx.session.language].singleTariff({
                ...tariff,
                startDate: startDate.format,
                endDate: endDate.format
            }),
            {
                ...selectTariffKeyboard,
                parse_mode: 'Markdown',
            }
        )
    } catch (error) {
        console.log(error);
    }
})

tariffScene.action('pay', async (ctx) => {
    const { id } = ctx.session.tariffData

    try {
        const transaction = await Subscription.findOne({ user_id: ctx.getUserId() })
        if (transaction) {
            return await ctx.editMessageText(
                messages[ctx.session.language].subscriptionExist
            )
        }

        const tariff = await Tariff.findById(id).lean()
        const bill = await getBillingLink(tariff)

        await Transaction.create({
            user_id: ctx.getUserId(),
            tariff_id: tariff._id,
            order_id: bill.id,
            status: bill.status,
            created_at: bill.created_at,
            amount: bill.amount.value,
            expire_bill: dayjs(bill.created_at).minute(dayjs(bill.created_at).minute() + 10).unix()
        })

        await ctx.editMessageText(
            messages[ctx.session.language].billCreated(tariff.price),
            payTariffKeyboard(bill.confirmation.confirmation_url),
        )
        // await ctx.replyWithInvoice(getInvoice(ctx.getUserId(), Number(tariff.price)))

        delete ctx.session.tariffData
    } catch (error) {
        console.log(error);

    }
})

tariffScene.action('back', async (ctx) => {
    const tariffs = await Tariff.find()
    if (!tariffs) return await ctx.reply("Ошибка. Подписок нет.")

    await ctx.editMessageText(messages[ctx.session.language].selectTariff, tariffKeyboard(tariffs))

})


export default tariffScene