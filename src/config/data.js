const { PROVIDER_TOKEN } = process.env.PROVIDER_TOKEN

export const DATE_FORMAT = 'DD.MM.YYYY'

export const LANGUAGES = {
    'English': 'en',
    'Русский': 'ru'
}

export const DURATION_LIST = [
    {
        name: '7 дней',
        duration: 7 * 24 * 60 * 60 * 1000,
        days: 7,
    },
    {
        name: '14 дней',
        duration: 7 * 24 * 60 * 60 * 1000,
        days: 14,
    },
    {
        name: '1 месяц',
        duration: 30 * 24 * 60 * 60 * 1000,
        months: 1
    },
    {
        name: '3 месяца',
        duration: 90 * 24 * 60 * 60 * 1000,
        months: 3
    },
    {
        name: '6 месяцев',
        duration: 180 * 24 * 60 * 60 * 1000,
        months: 6
    },
    {
        name: '1 год',
        duration: 360 * 24 * 60 * 60 * 1000,
        years: 1
    },
    {
        name: 'Навсегда',
        duration: 200 * 365 * 24 * 60 * 60 * 1000,
        years: 100
    },
]

export const getInvoice = (id, price) => {
    const invoice = {
        chat_id: id, // Unique identifier of the target chat or username of the target channel
        provider_token: PROVIDER_TOKEN, // token issued via bot @SberbankPaymentBot
        start_parameter: 'get_access', // Unique parameter for deep links. If you leave this field blank, forwarded copies of the forwarded message will have a Pay button that allows multiple users to pay directly from the forwarded message using the same account. If not empty, redirected copies of the sent message will have a URL button with a deep link to the bot (instead of a payment button) with a value used as an initial parameter.
        title: 'InvoiceTitle', // Product name, 1-32 characters
        description: 'InvoiceDescription', // Product description, 1-255 characters
        currency: 'RUB', // ISO 4217 Three-Letter Currency Code
        prices: [{ label: 'Invoice Title', amount: price * 100 }], // Price breakdown, serialized list of components in JSON format 100 kopecks * 100 = 100 rubles
        payload: { // The payload of the invoice, as determined by the bot, 1-128 bytes. This will not be visible to the user, use it for your internal processes.
            unique_id: `${id}_${Number(new Date())}`,
            provider_token: PROVIDER_TOKEN
        }
    }

    return invoice
}