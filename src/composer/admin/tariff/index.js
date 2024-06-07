import { Scenes } from "telegraf";
import { messages } from "../../../assets/index.js";
import Tariff from "../../../models/Tariff.js";
import { tariffsKeyboard } from "./keyboards.js";

const adminTariffScene = new Scenes.BaseScene('admin-tariff-scene')

adminTariffScene.enter(async (ctx) => {
    const tariffs = await Tariff.find().sort('order')
    ctx.session.tariffs = tariffs
    await ctx.reply(messages[ctx.session.language].adminTariff, tariffsKeyboard(tariffs))
})

adminTariffScene.action('add', async (ctx) => ctx.scene.enter('admin-add-tariff-wizard'))
adminTariffScene.action('order', async (ctx) => ctx.scene.enter('admin-order-tariff-scene'))
adminTariffScene.action(/tariff_(.+)/, async (ctx) => ctx.scene.enter('admin-edit-tariff-scene'))

export default adminTariffScene
