const { findUserByUid } = require('../controllers/users');

const botStart = async (ctx) => {
  const { startPayload } = ctx;
  if (startPayload) {
    let { data, status } = await findUserByUid(startPayload);
    if (status === 'success') {
      const { first_name, last_name } = data;
      ctx.session.state = {
        first_name,
        last_name,
        startPayload,
        type: 'sending_message',
      };
      ctx.reply(
        `درحال نوشتن پیام به ${first_name + ' ' + last_name} هستی 👇🔥`,
        {
          reply_markup: {
            keyboard: [
              [
                {
                  text: 'بیخیال 😒👌',
                  callback_data: 'cancel_chat',
                },
              ],
            ],
          },
        }
      );
    } else {
      ctx.reply(`😒🙄 لینکی که باهاش وارد شدی اشتباه `, {
        reply_markup: {
          keyboard: [
            [
              {
                text: 'لینک من برای دریافت پیام ناشناس 😜🤳',
                callback_data: 'recive_link',
              },
            ],
          ],
        },
      });
    }
  } else {
    ctx.reply(
      `👋 به ربات پیام ناشناس خوش اومدی.
✅ به کمک این ربات میتونی یه لینک شخصی بسازی و اونو به دوستات بدی و یا توی سایت و شبکه‌های اجتماعی پخشش کنی و از بقیه بخوای که با کلیک روی اون لینک، هر حرفی یا عکس یا فیلم یا پیام صوتی ای که دوست دارن رو برات بفرستن  🤩`,
      {
        reply_markup: {
          keyboard: [
            [
              {
                text: 'لینک من برای دریافت پیام ناشناس 😜🤳',
                callback_data: 'recive_link',
              },
            ],
          ],
        },
      }
    );
  }
};

module.exports = botStart;
