const jwt = require("jsonwebtoken");
const { SECRET } = require("../env");

const { verifyPassword } = require("../models/user");

const verifyCredential = async (req, res) => {
  const result = await verifyPassword(req.body.email, req.body.password);
  if (result) {
    const token = jwt.sign({ userId: result }, SECRET);
    res.set("AccessToken", token);
    res.status(200).json(true);
  } else {
    res.status(401).send("Unauthorized");
  }
};

module.exports = {
  verifyCredential,
};
