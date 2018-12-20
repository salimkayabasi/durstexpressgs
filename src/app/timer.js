export const trigger = () => {
  ScriptApp.newTrigger('check')
    .timeBased()
    .everyMinutes(1)
    .create();
};
