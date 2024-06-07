import { Scenes } from "telegraf";
import { messages } from "../../../assets/index.js";
import User from "../../../models/User.js";
import Transaction from "../../../models/Transaction.js";
import Subscription from "../../../models/Subscription.js";
import dayjs from "dayjs";

const adminStatisticScene = new Scenes.BaseScene('admin-statistic-scene')

adminStatisticScene.enter(async (ctx) => {
    const thirtyDaysAgo = dayjs().subtract(30, 'day').unix().toString();

    const userCount = await User.countDocuments()
    const userLastthirtyDays = await User.countDocuments({ created_at: { $gte: thirtyDaysAgo } })
    const transactionCount = await Transaction.countDocuments({ status: 'succeeded' })
    const subscriptionCount = await Subscription.countDocuments()

    await ctx.reply(messages[ctx.session.language].adminStatistic({ userCount, userLastthirtyDays, transactionCount, subscriptionCount }))
})

export default adminStatisticScene