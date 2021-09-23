const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(
  "98081212290-o5ci4422o4omppgvkqc2q6e9jd13ioso.apps.googleusercontent.com"
);
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;
const { GoogleUser } = require("../../models");

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
      console.log(response.payload);
      if (email_verified) {
        GoogleUser.findOne({ email }).exec((err, user) => {
          if (err) {
            return res.status(400).json({ error: "Something went wrong...." });
          } else {
            if (user) {
              const token = jwt.sign({ _id: user._id }, SECRET_KEY);
              const { _id, name, email } = user;
              res.json({
                token,
                user: { _id, name, email },
              });
            } else {
              let password = email + SECRET_KEY;
              let newGoogleUser = new GoogleUser({
                name,
                email,
                password,
              });
              newGoogleUser.save((err, data) => {
                if (err) {
                  return res
                    .status(400)
                    .json({ error: "Something went wrong...." });
                }
                const token = jwt.sign({ _id: data._id }, SECRET_KEY);
                const { _id, name, email } = newGoogleUser;
                res.json({
                  token,
                  user: { _id, name, email },
                });
              });
            }
          }
        });
      }
    });
  console.log();
};

module.exports = googlelogin;
