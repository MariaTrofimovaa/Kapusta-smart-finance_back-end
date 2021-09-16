const sgMail = require("@sendgrid/mail");
require("dotenv").config();
const { SENDGRID_API_KEY } = process.env;
sgMail.setApiKey(SENDGRID_API_KEY); //у sgMail вызываем метод setApiKey и передаем ему наш ключ

//для отправки почти создаем письмо
// const email = {
//   to: "y.p.p@meta.ua",
//   subject: "test mail",
//   html: `<p>Слава Україні!!!</p>
//   <p>Героям Слава!!!</p>`,
// };

// создаем универсальную функцию, которая отправляет письмо от нашего имени
const sendEmail = async ({ to, subject, html }) => {
  const email = {
    from: "trofimova.maria@ex.ua",
    to,
    subject,
    html,
  };
  const result = await sgMail.send(email);
  return result;
};

module.exports = sendEmail;
