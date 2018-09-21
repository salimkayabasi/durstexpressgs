export const getHtml = () => {
  const title = 'Durstexpress Price Tracker';
  const fileName = 'index.html';
  return HtmlService.createHtmlOutputFromFile(fileName)
    .setTitle(title)
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.DEFAULT)
    .setWidth(300);
};

export const show = () => {
  SpreadsheetApp.getUi().showSidebar(getHtml());
};

export const addMenu = () => {
  SpreadsheetApp.getUi()
    .createMenu('Durstexpress')
    .addItem('Open', 'show')
    .addToUi();
};

export const onOpen = () => {
  addMenu();
};
