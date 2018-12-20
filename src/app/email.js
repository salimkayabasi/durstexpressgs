export const sendEmail = (recipient, subject, body) => {
  MailApp.sendEmail(recipient, subject, body);
};

export const getEmailTemplate = ({ name, url, price, actualPrice }) => {
  const message = 'It was %s now %s \n%s\n\nIt must be available for ordering';
  const subject = Utilities.formatString('Price Changed %s (%s -> %s)', name, price, actualPrice);
  const body = Utilities.formatString(message, price, actualPrice, url);
  return {
    subject,
    body
  };
};

export const notify = (customers, product) => {
  const { subject, body } = getEmailTemplate(product);
  customers.forEach(recipient => {
    sendEmail(recipient, subject, body);
  });
};
