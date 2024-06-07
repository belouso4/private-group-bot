import User from './models/User.js'

export const adminMiddleware = (ctx, next) => ctx.isAdmin() ? next() : false

export const privateChatMiddleware = (ctx, next) => {
  const context = ctx.update.message || ctx.update.callback_query.message;
  return context.chat.type === 'group' || context.chat.type === 'supergroup' ? false : next()
}

export const getUserLanguage = async (ctx, next) => {
  ctx.session ??= {}

  if (!ctx.session.language) {
    const user = await User.findOne({ user_id: ctx.getUserId() })
    const language = (user && user.language) || 'ru'

    ctx.session.language = language
  }

  await next()
}

// const groupMiddleware = (ctx, next) => {
//     console.log(ctx);
//     if (ctx.chat && (ctx.chat.type === 'group' || ctx.chat.type === 'supergroup')) {
//         return next();
//     } else {
//         ctx.reply('Эта команда доступна только в группах.');
//     }
// };

