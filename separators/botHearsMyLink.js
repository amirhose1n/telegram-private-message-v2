const { updateOrCreateUserWithUid } = require('../controllers/users');

const botHearsMyLink = async (ctx) => {
  const {
    update: {
      message: {
        from: { first_name, last_name, id },
      },
    },
  } = ctx;
  let link = `https://t.me/whatisinyourmind_bot?start=${id}`;
  let message = `سلام ${first_name + ' ' + last_name} هستم 😊 \n 
روی لینک زیر کلیک کن و هر انتقادی که نسبت به من داری یا اعتراف و حرفی که تو دلت هست رو با خیال راحت بنویس و بفرست. بدون اینکه از اسمت باخبر بشم متنت به من می‌رسه. خودتم می‌تونی امتحان کنی و از همه بخوای راحت و ناشناس بهت پیام بفرستن، حرفای خیلی جالبی میشنوی.
   \n 
   ✔ ${link} ✔
     `;

  let { status } = await updateOrCreateUserWithUid(id, {
    first_name,
    last_name,
  });

  if (status && status === 'success') {
    ctx.reply(message);
    ctx.reply(
      'پیام بالا رو برای دوستات بفرست تا بتونن بهت پیام ناشناس بدن 👆👆'
    );
  }
};

module.exports = botHearsMyLink;
