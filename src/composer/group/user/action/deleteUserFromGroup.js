import { messages } from "../../../../assets/index.js";
import Subscription from "../../../../models/Subscription.js";

export const deleteUserFromGroupSchedule = async (bot) => {
    const groupId = process.env.PRIVATE_GROUP_ID
    const currentDate = Date.now();

    const expiredSubscriptions = await Subscription.find({
        end_date: { $lt: currentDate }
    }).populate('user', 'language');

    if (expiredSubscriptions?.length) {
        for (const subscription of expiredSubscriptions) {
            try {
                await bot.telegram.banChatMember(groupId, subscription.user_id)
                await Subscription.deleteOne({ _id: subscription._id })
                await bot.telegram.sendMessage(subscription.user_id, messages[subscription.user.language].subscribeExpired)
            } catch (error) {
                console.log(`Error while ban Chat Member`, error.message)
            }
        }
    }
}