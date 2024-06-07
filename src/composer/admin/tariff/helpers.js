import { DURATION_LIST } from "../../../config/data.js"

export const getDuration = (sub) => {
    const duration = DURATION_LIST.find(el => el.duration === sub.duration).name
    return `${sub.name} | ${duration} | ${sub.price} ₽`
}

export const setOrder = (tariffs, id, move) => {
    const index = tariffs.findIndex(tariff => `${tariff._id}` === id)
    const item = tariffs.splice(index, 1)[0]

    if (move === 'down') {
        tariffs.splice(index + 1, 0, item)
    } else {
        tariffs.splice(index - 1, 0, item)
    }

    tariffs.forEach((tariff, index) => {
        tariff.order = index + 1;
    });
    return tariffs
}