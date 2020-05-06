const { checkProduct } = require('./product');
const {
  addSubscription,
  getSubscriptions,
  removeSubscriptionWithTitle,
  removeSubscriptionWithSenderId,
} = require('./sheet');

const DEBUG = process.env.DEBUG === 'true';
const hostName = 'https://www.durstexpress.de/';

const chunk = (input, size) => {
  return input.reduce((arr, item, idx) => {
    return idx % size === 0 ? [...arr, [item]] : [...arr.slice(0, -1), [...arr.slice(-1)[0], item]];
  }, []);
};

const subscribeToLink = (message) => {
  const {
    text,
    from: { id: senderId, username },
  } = message;
  if (!text.startsWith(hostName)) {
    return "Sorry but I couldn't understand, please try `/help` command";
  }
  try {
    const [url] = text.split(' ');
    const { name, price } = checkProduct(url);
    addSubscription({ username, senderId, name, price, url });
    return `Price of *${name}* is *${price}* at the moment.\n\nI'll be tracking price of it and let you know when price has changed`;
  } catch (e) {
    if (DEBUG) {
      return e.message;
    }
    return 'It looks like the URL is invalid OR Durstexpress is not responding at this time.\nPlease try again later.';
  }
};
const listSubscriptions = (message) => {
  const {
    from: { id: senderId, username },
  } = message;
  const subscriptions = getSubscriptions({ username, senderId }) || [];
  if (!subscriptions.length) {
    return "You don't have any subscription yet. Just paste the link of product";
  }
  const chunks = chunk(
    subscriptions.map((s) => ({
      text: s.name,
      callback_data: s.name,
    })),
    2,
  );
  return {
    text: 'Please choose the product that you want to remove it',
    markup: {
      inline_keyboard: [
        [
          {
            text: 'Remove all',
            callback_data: 'remove-all',
          },
        ],
        ...chunks,
      ],
    },
  };
};
const removeSubscription = (senderId, title) => {
  if (title === 'remove-all') {
    removeSubscriptionWithSenderId(senderId);
    return 'All the data have been removed';
  }
  removeSubscriptionWithTitle(senderId, title);
  return `*${title}* was removed`;
};

module.exports = {
  subscribeToLink,
  listSubscriptions,
  removeSubscription,
};
