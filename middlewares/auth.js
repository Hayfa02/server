const jwt = require("jsonwebtoken");
const User = require("../models/User");
module.exports = async function (req, res, next) {
  const token = req.header("token");
  if (!token) return res.status(401).json({ message: "Please Signin to access to this page" });
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
    req.body.user = decoded.user.id;
    let userInformations = await User.findById(decoded.user.id);
    if (!userInformations) return res.status(404).json({ message: "Account doesn't exist or deleted" });
    if (userInformations.confirmed == false) return res.status(400).json({ message: "Please confirm your email" });
    if (userInformations.accountStatus == false) res.status(400).send({ message: "Your account is blocked !" });
    if (userInformations.DeconnectionTime > decoded.iat * 1000) res.status(401).send({ message: "Invalid Or Expired Token" });
    else next();
  } catch (e) {
    res.status(500).send({ message: "Server Error." });
  }
};