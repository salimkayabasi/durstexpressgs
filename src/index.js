const { check } = require('./check');
const { prepareSheets } = require('./sheet');
const { register } = require('./telegram');
const { doPost, doGet } = require('./http');

const prepare = () => {
  prepareSheets();
  register();
};

global.check = check;
global.doPost = doPost;
global.doGet = doGet;
global.prepare = prepare;
