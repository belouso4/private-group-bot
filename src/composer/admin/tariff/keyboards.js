import { Markup } from "telegraf";
import { DURATION_LIST } from "../../../config/data.js";

export const tariffsKeyboard = (tariffs) =>
    Markup.inlineKeyboard([
        ...tariffs.map((tariff) => [Markup.button.callback(`${tariff.name} | ${tariff.price} ₽`, 'tariff_' + tariff.id)]),
        [Markup.button.callback('➕', 'add'),
        Markup.button.callback('⬆️⬇️', 'order')]
    ])

export const adminOrderTariffKeyboard = (tariffs) =>
    Markup.inlineKeyboard([
        ...tariffs.map((tariff) => [Markup.button.callback(`${tariff.name} | ${tariff.price} ₽`, 'tariffOrder_' + tariff.id)]),
        [Markup.button.callback('Назад', 'cancel')]
    ])

export const adminChangeOrderTariffKeyboard = (tariffs, id, move = null) => {
    const btns = []
    tariffs.forEach((tariff, key, array) => {
        let name = `${tariff._id}` === id ? '🔸 ' + tariff.name : tariff.name
        if (key === 0 && `${tariff._id}` !== id) {
            btns.push([Markup.button.callback('up', 'up_' + id)])
            btns.push([Markup.button.callback(`${name} | ${tariff.price} ₽`, 'tariffOrder_' + tariff.id)])
            return
        }

        if (key === array.length - 1 && `${tariff._id}` !== id) {
            btns.push([Markup.button.callback(`${name} | ${tariff.price} ₽`, 'tariffOrder_' + tariff.id)])
            btns.push([Markup.button.callback('down', 'down_' + id)])
            return
        }

        btns.push([Markup.button.callback(`${name} | ${tariff.price} ₽`, 'tariffOrder_' + tariff.id)])
    })

    btns.push([Markup.button.callback('Назад', 'cancel')])

    return Markup.inlineKeyboard(btns)
}

const chunksKeyboard = (value) => {
    return value
        .map((el, key) => Markup.button.callback(el.name, 'duration_' + key))
        .reduce((acc, curr, index) => {
            const rowIndex = Math.floor(index / 3);
            if (!acc[rowIndex]) {
                acc[rowIndex] = [];
            }
            acc[rowIndex].push(curr);

            if (index === DURATION_LIST.length - 1)
                acc[rowIndex + 1] = [Markup.button.callback('❌Отмена❌', 'cancel')]

            return acc;
        }, [])
}

export const durationKeyboard = Markup.inlineKeyboard(chunksKeyboard(DURATION_LIST))

export const adminEditTariffKeyboard = (id) =>
    Markup.inlineKeyboard([
        [Markup.button.callback('Назад', 'cancel'),
        Markup.button.callback('Удалить', 'deleteTarif_' + id)],
    ])