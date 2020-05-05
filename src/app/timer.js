const trigger = () => {
  ScriptApp.newTrigger('check').timeBased().everyMinutes(10).create();
};

module.exports = {
  trigger,
};
