const { register, onMessage, onCallback, getMe, request } = require('./telegram');
const { prepareSheets } = require('./sheet');

const DEBUG = process.env.DEBUG === 'true';

const responder = (content) => {
  const html = `<b>Hello from DurstExpressBot</b>\n\n\n<code>${JSON.stringify(content)}</code>`;
  Logger.log(html);
  return HtmlService.createHtmlOutput(html);
};

const doGet = () => {
  register();
  prepareSheets();
  const response = getMe();
  Logger.log(response);
  return responder(response);
};
const doPost = (e) => {
  Logger.log(e);
  if (!e) {
    return responder({ success: false });
  }
  try {
    if (e && e.postData && e.postData.type === 'application/json') {
      const postData = JSON.parse(e.postData.contents);
      if (DEBUG) {
        request('sendMessage', {
          chat_id: '773504249',
          text: JSON.stringify(postData, null, 2),
        });
      }

      if (postData) {
        if (postData.message) {
          return responder(onMessage(postData.message));
        }
        if (postData.callback_query) {
          return responder(onCallback(postData.callback_query));
        }
      }
    }
    return responder({ success: true });
  } catch (err) {
    if (DEBUG) {
      request('sendMessage', {
        chat_id: '773504249',
        text: JSON.stringify(
          {
            error: true,
            message: err.message,
          },
          null,
          2,
        ),
      });
    }
    return responder({ success: false });
  }
};

module.exports = {
  doGet,
  doPost,
};
