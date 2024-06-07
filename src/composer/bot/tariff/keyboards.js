import { Markup } from "telegraf";


export const tariffKeyboard = (tariffs) =>
    Markup.inlineKeyboard([
        ...tariffs.map((tariff) => [Markup.button.callback(`${tariff.name} | ${tariff.price} ₽`, 'tariff_' + tariff._id)])
    ])

export const selectTariffKeyboard =
    Markup.inlineKeyboard([
        [Markup.button.callback('Оплатить', 'pay')],
        [Markup.button.callback('Назада', 'back')]
    ])

export const payTariffKeyboard = (url) =>
    Markup.inlineKeyboard([
        [Markup.button.url('✅ Перейти к оплате', url)]
    ])
