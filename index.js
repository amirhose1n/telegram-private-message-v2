const LocalSession = require('telegraf-session-local');
const { Telegraf } = require('telegraf');
const mongoose = require('mongoose');
const router = require('./router');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const bot = new Telegraf('1444047249:AAFBiVHp8aWffcot4tkGnptBNnXeDBaqDMA');

mongoose.connect(process.env.DATABASE_LOCAL, {}).then(() => {
  console.log('db connected !');
});

bot.use(new LocalSession({ database: 'example_db.json' }).middleware());

router(bot);

bot.launch();
