import schedule from 'node-schedule';

import { deleteUserFromGroupSchedule } from '../composer/group/user/action/deleteUserFromGroup.js';

export const scheduleJob = (bot) => {
  schedule.scheduleJob('*/1 * * * *', async function (fireDate) {
    console.log(fireDate);

    deleteUserFromGroupSchedule(bot)
  });
}

