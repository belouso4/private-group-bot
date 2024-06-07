import { Composer } from 'telegraf'
import buildXLSX from '../../utils/xlsx.js'

const adminComposer = new Composer()

adminComposer.hears('💼 Тарифы', async (ctx) => ctx.scene.enter('admin-tariff-scene'))
adminComposer.hears('👥 Подписчики', async (ctx) => await ctx.replyWithDocument(await buildXLSX()))
adminComposer.hears('📊 Статистика', async (ctx) => ctx.scene.enter('admin-statistic-scene'))
adminComposer.hears('Главное меню', async (ctx) => ctx.scene.enter('start-scene'))
adminComposer.hears('Админ панель', async (ctx) => await ctx.scene.enter('admin-scene'))

export default adminComposer