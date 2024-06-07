import { Composer } from 'telegraf'
import { message } from 'telegraf/filters'

const groupComposer = new Composer()

groupComposer.on(message("new_chat_members"), (ctx) => {
    ctx.telegram.deleteMessage(ctx.update.message.chat.id, ctx.update.message.message_id)
});
groupComposer.on(message("left_chat_member"), (ctx) => {
    ctx.telegram.deleteMessage(ctx.update.message.chat.id, ctx.update.message.message_id)
});

// groupComposer.on(message('text'), (ctx) => console.log('Chat ID:', ctx.chat.id))

export default groupComposer