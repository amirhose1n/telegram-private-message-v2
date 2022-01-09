const botOnText = (ctx) => {
  const { session, message } = ctx;
  const { text, video, photo, caption, voice } = message;

  if (!session.state) {
    ctx.reply(`از بین گزینه ها انتخاب کن میخای برات چیکار کنم 🙏`, {
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
  } else if (text === 'بیخیال 😒👌') {
    session.state = null;
    ctx.reply(
      `تو از ارسال پیام انصراف دادی , برای ساخت لینک خودت رو دکمه ی پایین کلیک کن 🐱‍👤🤷‍♀️`,
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
  } else if (session.state) {
    const {
      state: { type },
    } = session;
    if (type === 'sending_reply') {
      const { receiverId, receiverChatId } = ctx.session.state;

      if (video || photo || voice) {
        const options = {
          reply_to_message_id: receiverChatId,
        };

        if (caption) {
          options.caption = caption;
        }

        ctx.telegram.sendMessage(receiverId, `جواب این پیامت 👆🔥`, {
          reply_to_message_id: receiverChatId,
        });

        if (photo) {
          ctx.telegram.sendPhoto(receiverId, message.photo[0].file_id, {
            ...options,
          });
        }
        if (video) {
          ctx.telegram.sendVideo(receiverId, message.video.file_id, {
            ...options,
          });
        }
        if (voice) {
          ctx.telegram.sendVoice(receiverId, message.voice.file_id, {
            ...options,
          });
        }
      }

      if (text) {
        ctx.telegram.sendMessage(receiverId, `جواب این پیامت 👆🔥 \n${text}`, {
          reply_to_message_id: receiverChatId,
        });

        ctx.session = '';
        ctx.reply(`جوابت ارسال شد 🐱‍👤✔`, {
          reply_markup: {
            keyboard: [
              [
                {
                  text: 'لینک من برای دریافت پیام ناشناس 😜🤳',
                  callback_data: `receive_link`,
                },
              ],
            ],
          },
        });
      }
    }
    if (type === 'sending_message') {
      //TODO
      const { state } = session;
      const { first_name, last_name, startPayload } = state;
      session.state = null;
      const {
        message: { message_id },
      } = ctx;
      const {
        update: {
          message: {
            from: { id },
          },
        },
      } = ctx;

      if (video || photo || voice) {
        const options = {
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: 'جواب دادن به این پیام 😜🤳',
                  callback_data: `reply_message ${message_id} ${id}`,
                },
              ],
            ],
          },
        };

        if (caption) {
          options.caption = caption;
        }

        ctx.telegram.sendMessage(startPayload, `پیام جدید داری 😎🤩`);

        if (photo) {
          ctx.telegram.sendPhoto(startPayload, message.photo[0].file_id, {
            ...options,
          });
        }
        if (video) {
          ctx.telegram.sendVideo(startPayload, message.video.file_id, {
            ...options,
          });
        }
        if (voice) {
          ctx.telegram.sendVoice(startPayload, message.voice.file_id, {
            ...options,
          });
        }
      }

      if (text) {
        ctx.telegram.sendMessage(
          startPayload,
          `پیام جدید داری 😎🤩 \n \n  ${text}`,
          {
            reply_markup: {
              inline_keyboard: [
                [
                  {
                    text: 'جواب دادن به این پیام 😜🤳',
                    callback_data: `reply_message ${message_id} ${id}`,
                  },
                ],
              ],
            },
          }
        );
        // }
        ctx.reply(
          `پیامت ارسال شد 😜✔ برای ساخت لینک خودت رو دکمه ی پایین کلیک کن 👇`,
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
    }
  }
};

module.exports = botOnText;
