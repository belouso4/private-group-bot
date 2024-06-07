export default {
    startWelcome: 'Бот для приобретении подписки на приватный канал.',
    choseLanguage: 'Пожалуйста, выберите язык',
    selectTariff: '💎 Выберите желаемую подписку:',
    singleTariff: ({ name, price, startDate, endDate }) =>
        `*${name}*\n*Цена: ${price} ₽*\n*Начало подписки:* ${startDate}\n*Конец подписки:* ${endDate}\n\nВы получите приглашение в канал/чат 👇 \n*— Private kb*`,
    billCreated: (price) => `✅ Счет на оплату создан, нажмите 'Перейти к оплате' и оплатите тариф. \nСумма к оплате: ${price}₽.\n\nВнимание!!! После оплаты ожидайте подключение подписки. Если этого не произошло, то обратитесь к администрации.`,
    infoNoSubscription: 'У вас нет активных подписок.',
    infoSubscription: ({ startDate, endDate }) => `📊 Информация о купленной подписке: \n\n*Канал:* Private kb \n*Начало подписки:* ${startDate}\n*Конец подписки:* ${endDate}`,
    successfullyPaid: ({ durationName, name }) => `Спасибо за покупку\n\nВы получили доступ к приватной группе ${durationName}\n\n— 👥 ${name}\n\nЧтобы получить доступ к группе нажмите кнопку "🔗Ссылка для доступа" 👇`,
    subscribeExpired: 'Подписка закончилачь',
    subscriptionExist: 'Подписка уже существует',
    adminStatistic: ({ userCount, userLastthirtyDays, transactionCount, subscriptionCount }) =>
        `📊Статистика бота\n\nВсего переходов в бота: ${userCount}\nПереходов в бота за последние 30 дней: ${userLastthirtyDays}\n\n👥Количество подписчиков:\n🔸Купили подписку за всё время: ${transactionCount} раз.\n\n🔸активных подписок: ${subscriptionCount}`,
    adminEditTariff: ({ name }) => `Название тарифа - ${name}`,
    adminDeleteTariff: 'Тариф удален',
    backMunu: 'Если Вы захотите вернуться в Главное меню, отправьте боту команду - /start.',
    chooseActions: 'Выбери действия из появившего меню. \n(если меню не появилось повтори команду /start)',


    adminTariff: 'Чтобы создать новую тариф нажмите на "➕". Чтобы изменить порядок нажмите на "⬆️⬇️".',
    adminAddNameTariff: 'Напишите название тарифа: ',
    adminAddPriceTariff: 'Напишите цену: ',
    adminAddDurationTariff: 'Выберите периуд подписки: ',
    // startAction: 'Бот для приобретении подписки на приватный канал.',
}