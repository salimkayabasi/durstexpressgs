import { getCustomers } from './customers';

export const sendEmail = (subject, message) => {
  const customers = TEST ? ['salim.kayabasi@gmail.com'] : getCustomers();
  customers.forEach(email => {
    MailApp.sendEmail(email, subject, message);
  });
};
