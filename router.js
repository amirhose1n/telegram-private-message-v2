const botHearsMyLink = require('./separators/botHearsMyLink');
const botCallback = require('./separators/botCallbackQuery');
const botOnText = require('./separators/botOnText');
const botStart = require('./separators/botStart');

const router = (bot) => {
  bot.start(botStart);
  bot.hears('لینک من برای دریافت پیام ناشناس 😜🤳', botHearsMyLink);
  bot.on('callback_query', botCallback);
  bot.on(['text', 'video', 'photo', 'voice'], botOnText);
};

module.exports = router;
