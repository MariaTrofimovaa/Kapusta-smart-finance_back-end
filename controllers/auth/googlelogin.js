const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(
  "98081212290-o5ci4422o4omppgvkqc2q6e9jd13ioso.apps.googleusercontent.com"
);
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;
const { User } = require("../../models");

const { nanoid } = require("nanoid");

const { users: service } = require("../../services");

const googlelogin = (req, res) => {
  const { tokenId } = req.body;
  client
    .verifyIdToken({
      idToken: tokenId,
      audience:
        "98081212290-o5ci4422o4omppgvkqc2q6e9jd13ioso.apps.googleusercontent.com",
    })
    .then((response) => {
      const { email_verified, name, email } = response.payload;

      if (email_verified) {
        User.findOne({ email }).exec((err, user) => {
          const verifyToken = nanoid();
          if (err) {
            return res.status(400).json({ error: "Something went wrong...." });
          } else {
            if (user) {
              const token = jwt.sign({ id: user.id }, SECRET_KEY);

              const { id, email, verifyToken } = user;

              service.update(user.id, { token });

              res.json({
                user: { id, token, email, verifyToken },
              });
            } else {
              let password = email + SECRET_KEY;

              let newUser = new User({
                name,
                email,
                password,
                verifyToken,
              });
              newUser.save((err, data) => {
                if (err) {
                  return res
                    .status(400)
                    .json({ error: "Something went wrong...." });
                }

                const token = jwt.sign({ id: data.id }, SECRET_KEY);

                const { id, email } = newUser;

                service.update(data.id, { token });

                res.json({
                  user: { id, token, email },
                });
              });
            }
          }
        });
      }
    });
};

module.exports = googlelogin;
