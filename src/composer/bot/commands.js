import { Composer } from 'telegraf'
import adminComposer from '../admin/commands.js'
import { adminMiddleware, privateChatMiddleware } from '../../middleware.js'

const botComposer = new Composer()

botComposer.command('start', async (ctx) => await ctx.scene.enter('start-scene'))
botComposer.hears('💼 Подписка', async (ctx) => await ctx.scene.enter('tariff-scene'))
botComposer.hears('📊 info', async (ctx) => await ctx.scene.enter('info-scene'))
// botComposer.hears('🌐 language', async (ctx) => await ctx.scene.enter('setlanguage'))

botComposer.use(Composer.compose([adminMiddleware, privateChatMiddleware]), adminComposer.middleware());

export default botComposer