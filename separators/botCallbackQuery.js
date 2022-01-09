const botCallback = async (ctx) => {
  const { data } = ctx.callbackQuery;
  if (data.split(' ')[0] === 'reply_message') {
    const receiverId = data.split(' ')[2];
    const receiverChatId = data.split(' ')[1];
    ctx.session.state = { type: 'sending_reply', receiverChatId, receiverId };
    ctx.reply(
      'در حال جواب دادن به پیامی که روش کلیک کردی هستی 🤩 برای انصراف رو دکمه ی زیر کلیک کن 👇☺',
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
  }
};

module.exports = botCallback;
