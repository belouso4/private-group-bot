import { Markup } from "telegraf";

export const joinButton = (link) =>
    Markup.inlineKeyboard([Markup.button.url('🔗Ссылка для доступа', link)])