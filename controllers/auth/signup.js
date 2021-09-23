const { users: service } = require("../../services");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// const { SENDGRID_API_KEY } = process.env;

// const { sendEmail } = require("../../utils");
const { nanoid } = require("nanoid");

const signup = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await service.getOne({ email });
    if (user) {
      return res.status(409).json({
        status: "error",
        code: 409,
        message: "Already registered",
      });
    }
    const verifyToken = nanoid();
    // записываем токен в базу человеку, который регистрируется
    const newUser = await service.add({ ...req.body, verifyToken });

    res.json({
      status: "success",
      code: 201,
      message: "Successfully registered. Please verify your email!!",
      data: {
        email,
        verifyToken,
      },
    });
  } catch (error) {
    next(error);
  }
  const { URL } = process.env;

  // создаем еmail со ссылкой на адрес сайта с роутом верификации
  const sendToEmail = {
    from: "y.p.p@i.ua",
    to: newUser.email,
    subject: "Verify email",
    html: `<a href="${URL}/api/v1/auth/verify/${verifyToken}" target="_blank">Please verify your email<a/>`,
  };

  try {
    await sgMail.send(sendToEmail);
    console.log("Email sent");
    //отправляем письмо юзеру
  } catch (error) {
    console.log(error);
  }
};

module.exports = signup;
