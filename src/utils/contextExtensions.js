export default function (bot) {
    bot.context.getUserId = function () {
        console.log('sfwefwf-------');
        return this.update.callback_query?.from?.id || this.from.id
    }

    bot.context.isAdmin = function () {
        const adminIds = process.env.LIST_OF_ADMINS.split(',').map(str => parseInt(str, 10))
        return adminIds.includes(this.getUserId())
    }
}