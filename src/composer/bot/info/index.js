import { Scenes } from "telegraf";
import Subscription from "../../../models/Subscription.js";
import { privateChatMiddleware } from "../../../middleware.js";
import { messages } from "../../../assets/index.js";
import dayjs from "dayjs";
import { DATE_FORMAT } from "../../../config/data.js";
import { joinButton } from "../../../utils/keyboards.js";

const infoScene = new Scenes.BaseScene('info-scene')

infoScene.enter(privateChatMiddleware, async (ctx) => {
    const subscription = await Subscription.findOne({ user_id: ctx.getUserId() })

    if (!subscription) {
        return ctx.reply(messages[ctx.session.language].infoNoSubscription);
    }

    const startDate = dayjs(+subscription.start_date).format(DATE_FORMAT)
    const endDate = dayjs(+subscription.end_date).format(DATE_FORMAT)

    const link = await ctx.telegram.createChatInviteLink(process.env.PRIVATE_GROUP_ID, undefined, 1)

    return ctx.reply(
        messages[ctx.session.language].infoSubscription({ startDate, endDate }),
        { parse_mode: 'Markdown', ...joinButton(link.invite_link) }
    );
})

export default infoScene