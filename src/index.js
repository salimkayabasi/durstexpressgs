const { check } = require('./check');
const { prepareSheets } = require('./sheet');
const { doPost, doGet } = require('./http');

global.check = check;
global.doPost = doPost;
global.doGet = doGet;
global.prepare = prepareSheets;
