const { verify } = require("jsonwebtoken");
const { request, response } = require("express");
const { jwtSecret } = require("../config");

/**
 *
 * @param {request} req
 * @param {response} res
 * @param {*} next
 */
module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization)
    return res.status(401).json({
      status: "error",
      message: "Unauthorized user!",
    });
  const token = authorization.split("Bearer ")[1];

  if (!token)
    return res.status(401).json({
      status: "error",
      message: "Unauthorized user!",
    });

  const validate = verify(token, jwtSecret);

  if (!validate)
    return res.status(401).json({
      status: "error",
      message: "Unauthorized user!",
    });

  req.user = validate;

  next();
};
