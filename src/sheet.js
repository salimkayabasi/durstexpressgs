const sheetName = 'durstexpress';

const getSheet = (name = sheetName) =>
  SpreadsheetApp.getActiveSpreadsheet().getSheetByName(name);
const createSheet = (name) =>
  SpreadsheetApp.getActiveSpreadsheet().insertSheet(name, 0);
const removeSheet = (name) =>
  SpreadsheetApp.getActiveSpreadsheet().deleteSheet(getSheet(name));
const verifySheet = (name) => getSheet(name) || createSheet(name);

const getAllSheetsName = () =>
  SpreadsheetApp.getActiveSpreadsheet()
    .getSheets()
    .map((sheet) => sheet.getName());
const removeOtherSheets = () =>
  getAllSheetsName()
    .filter((name) => name !== sheetName)
    .forEach(removeSheet);
const prepareSheets = () => {
  verifySheet(sheetName);
  removeOtherSheets();
};
const getSheetData = () => {
  return getSheet().getDataRange().getValues();
};
const setSheetValues = (updates) => {
  const sheet = getSheet();
  const range = sheet.getDataRange();
  range.clearContent();
  if (updates && updates.length) {
    sheet.getRange(1, 1, updates.length, updates[0].length).setValues(updates);
  }
};

const addSubscription = ({ username, senderId, name, price, url }) => {
  const rows = getSheetData();
  const exists = rows.find((row) => {
    const [user, id, productName] = row;
    return (
      user === username &&
      id.toString() === senderId.toString() &&
      productName === name
    );
  });
  if (exists) {
    return;
  }
  const sheet = getSheet();
  sheet.appendRow([username, senderId.toString(), name, price, url]);
};
const getSubscriptions = ({ username, senderId }) => {
  const rows = getSheetData();
  return rows.reduce((result, row) => {
    const [user, id, name, price, url] = row;
    if (user === username && id.toString() === senderId.toString()) {
      result.push({
        username: user,
        senderId: id,
        name,
        price,
        url,
      });
    }
    return result;
  }, []);
};

const removeSubscription = (notMatch) => {
  const rows = getSheetData();
  const updates = rows.reduce((result, row) => {
    if (notMatch(row)) {
      result.push(row);
    }
    return result;
  }, []);
  setSheetValues(updates);
};

const removeSubscriptionWithTitle = (senderId, title) => {
  removeSubscription((row) => {
    const [, id, name] = row;
    return id.toString() !== senderId.toString() || title !== name;
  });
};
const removeSubscriptionWithSenderId = (senderId) => {
  removeSubscription((row) => {
    const [, id] = row;
    return id.toString() !== senderId.toString();
  });
};

module.exports = {
  getSheet,
  createSheet,
  removeSheet,
  verifySheet,
  getAllSheetsName,
  getSheetData,
  prepareSheets,
  addSubscription,
  getSubscriptions,
  removeSubscriptionWithTitle,
  removeSubscriptionWithSenderId,
  setSheetValues,
};
