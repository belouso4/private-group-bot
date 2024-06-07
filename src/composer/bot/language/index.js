// import { Markup, Scenes } from "telegraf";
// import User from "../../models/User.js";
// import { LANGUAGES } from "../../data.js";
// import { messages } from "../../assets/index.js";

// const setLanguage = new Scenes.WizardScene(
//     'setlanguage',
//     async ctx => {
//         await ctx.reply(
//             messages[ctx.session.language].choseLanguage,
//             Markup.keyboard(Object.keys(LANGUAGES)).oneTime().resize()
//         )
//         await ctx.wizard.next()
//     },
//     async ctx => {
//         if (!LANGUAGES[ctx.message.text]) true
//       ctx.session.language = LANGUAGES[ctx.message.text]
  
//       await User.updateOne(
//         {
//           user_id: ctx.getUserId(),
//         },
//         {
//           language: LANGUAGES[ctx.message.text],
//         }
//       )
  
//       await ctx.reply('Язык изменен.')
//       return ctx.scene.leave()
//     }
//   )

// export default setLanguage