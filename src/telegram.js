const { subscribeToLink, listSubscriptions, removeSubscription } = require('./durstexpress');

const DEBUG = process.env.DEBUG === 'true';
const token = process.env.BOT_TOKEN;
const commands = [];

const request = (method, data) => {
  const options = {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify(data),
  };
  const url = `https://api.telegram.org/bot${token}/${method}`;
  const response = UrlFetchApp.fetch(url, options);
  if (response.getResponseCode() === 200) {
    return JSON.parse(response.getContentText());
  }
  return false;
};

const replyToSender = (senderId, text, markup) => {
  const data = {
    chat_id: `${senderId}`,
    text,
    parse_mode: 'markdown',
  };
  if (markup) {
    data.reply_markup = markup;
  }
  if (DEBUG) {
    request('sendMessage', {
      chat_id: `${senderId}`,
      text: JSON.stringify(data, null, 2),
    });
  }
  return request('sendMessage', data);
};

const reply = (senderId, data) => {
  if (typeof data === 'string') {
    return replyToSender(senderId, data);
  }
  return replyToSender(senderId, data.text, data.markup);
};

const getMe = () => request('getMe', {});

const onMessage = (message) => {
  const {
    text,
    from: { id },
  } = message;
  const senderId = `${id}`;
  if (text.charAt(0) === '/') {
    const command = commands.find((cmd) => cmd.regexp.exec(text));
    if (command) {
      return reply(senderId, command.callback(message));
    }
  }
  return reply(senderId, subscribeToLink(message));
};

const onCallback = (callback) => {
  const {
    from: { id },
    data,
  } = callback;
  const senderId = `${id}`;
  return reply(senderId, removeSubscription(senderId, data));
};

const registerCommand = (regexp, callback) => {
  commands.push({ regexp, callback });
};

registerCommand(/\/start/, () => 'Congratulations! It works!');
registerCommand(/\/stop/, listSubscriptions);
registerCommand(/\/author/, () => 'Hi from author @salimkayabasi');
registerCommand(
  /\/help/,
  () => `
You can try any of these commands below

/start - Please take a seat I'll be on your service
/stop - I am not interested in anymore
/author - Want to talk with author of this bot?
/help - If you need help

*How to add new subscription?*
Please just share the any *product link* from durstexpress which you want to track price of it.
I'll check price and let you know when it is changed
`,
);

module.exports = {
  request,
  onMessage,
  onCallback,
  getMe,
  reply,
};
