import { Scenes } from 'telegraf'

import startScene from './composer/bot/start/index.js';
import tariffScene from './composer/bot/tariff/index.js';
import infoScene from './composer/bot/info/index.js';

import adminScene from './composer/admin/start/index.js';
import adminAddTariffWizard from './composer/admin/tariff/wizard/adminAddTariff.js';
import adminTariffScene from './composer/admin/tariff/index.js';
import adminStatisticScene from './composer/admin/statistic/index.js';
import adminOrderTariffScene from './composer/admin/tariff/scene/adminOrderTariff.js';
import adminEditTariffScene from './composer/admin/tariff/scene/adminEditTariff.js';


const stage = new Scenes.Stage([
    startScene,
    tariffScene,
    infoScene,
    adminScene,
    // setLanguage,

    /*-- admin scenes and wizars --*/
    adminTariffScene,
    adminStatisticScene,
    adminOrderTariffScene,
    adminEditTariffScene,

    adminAddTariffWizard,

]);

export default stage