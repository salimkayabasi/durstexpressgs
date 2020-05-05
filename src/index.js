const { check } = require('./app');
const { trigger } = require('./app/timer');
const { prepareSheets } = require('./app/sheet');
const { register } = require('./telegram');
const { doPost, doGet } = require('./http');

const prepare = () => {
  prepareSheets();
  register();
};

global.check = check;
global.trigger = trigger;
global.doPost = doPost;
global.doGet = doGet;
global.prepare = prepare;
