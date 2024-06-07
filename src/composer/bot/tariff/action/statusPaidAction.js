import { DURATION_LIST } from '../../../../config/data.js';
import Subscription from '../../../../models/Subscription.js';
import bot from '../../../../telegram.js';
import { messages } from '../../../../assets/index.js';
import { joinButton } from '../../../../utils/keyboards.js';
import Transaction from '../../../../models/Transaction.js';
import { getFormatedStartDateEndDate } from '../helpers.js';


const statusPaidAction = async (data, res) => {
    try {
        if (data.event === 'payment.succeeded') {
            const transaction = await Transaction.findOneAndUpdate({ order_id: data.object.id }, {
                status: 'succeeded',
                payment_method: data.object.payment_method.title
            })
                .populate('user', 'language')
                .populate('tariff_id', 'duration')

            const { startDate, endDate } = getFormatedStartDateEndDate(transaction.tariff_id.duration)

            await Subscription.create({
                user_id: transaction.user_id,
                tariff_id: transaction.tariff_id,
                order_id: data.object.id,
                start_date: startDate.timestamp,
                end_date: endDate.timestamp
            })
            const groupId = process.env.PRIVATE_GROUP_ID
            await bot.telegram.unbanChatMember(groupId, transaction.user_id)
            const link = await bot.telegram.createChatInviteLink(process.env.PRIVATE_GROUP_ID, undefined, 1)
            const duration = findObjectByKeyValue(DURATION_LIST, transaction.tariff_id.duration)
            const durationName = duration.name === 'навсегда' ? duration.name : 'на ' + duration.name

            await bot.telegram.sendMessage(
                transaction.user_id,
                messages[transaction.user.language].successfullyPaid({ durationName, name: process.env.PRIVATE_GROUP_NAME }),
                joinButton(link.invite_link)
            )

            return res.sendStatus(200);
        }
    } catch (error) {
        console.log("Error in status paid", error);
    }
}

function findObjectByKeyValue(array, searchKey) {
    const key = Object.keys(searchKey)[0];
    const value = searchKey[key];
    return array.find(obj => obj[key] === value);
}

export default statusPaidAction;