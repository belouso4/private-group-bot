import { Composer, Telegraf, session } from 'telegraf'
import express from 'express';
import stage from './stage.js';
import { getUserLanguage } from './middleware.js';
import routes from './routes/index.js';

import botComposer from './composer/bot/commands.js'
import groupComposer from './composer/group/commands.js'
import contextExtensions from './utils/contextExtensions.js';
import { scheduleJob } from './utils/schedule.js';

const PORT = process.env.PORT || 3001;
const app = express();
const bot = new Telegraf(process.env.BOT_TOKEN)

app.use(express.json());
app.use(bot.webhookCallback('/secret-path'));

app.listen(PORT, (err) => {
  err ? console.log(err) : console.log(`Listening port ${PORT}`);
});

app.use(routes);
bot.use(session());
bot.use(getUserLanguage); // init session language
bot.use(stage.middleware());

/* --------- schedule ---------- */

scheduleJob(bot)

/* --------- set context ---------- */

contextExtensions(bot)

/* --------- composer middleware ---------- */

bot.use(Composer.privateChat(botComposer));
// bot.use(Composer.compose([adminMiddleware, privateChatMiddleware]), adminComposer);
bot.use(Composer.groupChat(groupComposer));


// bot.catch(err => {
//     console.log(err);
//   })

//   bot.startPolling()

export const setupBot = async () => {
  return bot;
}