import { Markup } from "telegraf";

export const adminKeyboard =
    Markup.keyboard([['💼 Тарифы', '👥 Подписчики', '📊 Статистика'], ['Главное меню']])
        .oneTime()
        .resize()

export const cancelKeyboard = Markup.inlineKeyboard([
    Markup.button.callback('❌Отмена❌', 'cancel')
])