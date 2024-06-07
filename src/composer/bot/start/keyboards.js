import { Markup } from "telegraf";

export const startKeyboard =
    Markup.keyboard([[
        '💼 Подписка',
        '📊 info',
        // '🌐 language'
    ]]).oneTime().resize()

export const adminStartKeyboard =
    Markup.keyboard([[
        '💼 Подписка',
        '📊 info',
        // '🌐 language'
    ],
    ['Админ панель']])
        .oneTime().resize()


