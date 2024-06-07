import 'dotenv/config'
import { setupBot } from './src/bot.js';
import MDBConnect from './mongodb.js';

(async function () {
    try {
        await MDBConnect();
        (await setupBot()).launch({
            dropPendingUpdates: true,
            // webhook: {
            //     domain: 'f57b-118-69-65-141.ngrok-free.app',
            //     hookPath: '/secret-path',
            // },
        });

        console.log("</ Бот успешно запущен >")

    } catch (error) {
        console.log('Ошибка запуска: ', error)
    }

}())