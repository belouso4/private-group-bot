import { Scenes } from "telegraf";
import { durationKeyboard } from "../keyboards.js";
import { DURATION_LIST } from "../../../../config/data.js";
import { cancelKeyboard } from "../../start/keyboards.js";
import Tariff from "../../../../models/Tariff.js";
import { messages } from "../../../../assets/index.js";

const adminAddTariffWizard = new Scenes.WizardScene(
    'admin-add-tariff-wizard',
    async (ctx) => {
        ctx.wizard.state.tarif = {}

        await ctx.editMessageText(messages[ctx.session.language].adminAddNameTariff, cancelKeyboard)
        await ctx.wizard.next()
    },
    async (ctx) => {
        ctx.wizard.state.tarif.name = ctx.message.text

        await ctx.reply(messages[ctx.session.language].adminAddPriceTariff, cancelKeyboard)
        await ctx.wizard.next()
    },
    async (ctx) => {
        ctx.wizard.state.tarif.price = ctx.message.text

        await ctx.reply(messages[ctx.session.language].adminAddDurationTariff, durationKeyboard)
        await ctx.wizard.next()
    },
    async (ctx) => {
        const data = ctx.update.callback_query.data
        if (!data.match(/duration_(.+)/)) return

        const tariffId = data.split('_')[1];
        const tariff = DURATION_LIST[tariffId];

        if (!tariff) return ctx.reply('Неверный тариф.');

        const createTariff = new Tariff({ ...ctx.wizard.state.tarif, duration: { ...tariff } });
        await createTariff.save();

        await ctx.reply('Тариф добавлен')
        await ctx.answerCbQuery()

        return await ctx.scene.leave()
    },

)

adminAddTariffWizard.leave(async (ctx) => {
    delete ctx.wizard.state.tarif
})

adminAddTariffWizard.action('cancel', async ctx => {
    await ctx.editMessageText('*Действие отменено*', { parse_mode: 'MarkdownV2' })
    return await ctx.scene.leave()
})

export default adminAddTariffWizard