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
    from: "y.p.p@i.ua",
    to,
    subject,
    html,
  };
  const result = await sgMail.send(email);
  return result;
};

// у обьекта sgMail вызываем метод send и передаем ему email
sgMail
  .send(this.email)
  .then(() => console.log("email has been sended!"))
  .catch((error) => console.log(error));

module.exports = sendEmail;
