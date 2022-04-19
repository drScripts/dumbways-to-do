const { User, UserProfile } = require("../../models");
const { request, response } = require("express");
const { sign } = require("jsonwebtoken");
const { compareSync } = require("bcrypt");
const Joi = require("joi");
const { jwtSecret } = require("../../config");
const { getFileUrl } = require("../../helpers");

/**
 *
 * @param {request} req
 * @param {response} res
 */
module.exports = async (req, res) => {
  try {
    const scheme = Joi.object({
      email: Joi.string().email().required().messages({
        "string.base": "Your email should a type of email",
        "string.email": "Your email should an active email",
        "any.required": "Please insert your email",
      }),
      password: Joi.string().required().messages({
        "string.base": "Your password should a type of string",
        "any.required": "Please insert your email",
      }),
    });

    const validate = scheme.validate(req.body);

    if (validate.error)
      return res.status(400).json({
        status: "error",
        message: validate.error.details[0].message,
      });

    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user)
      return res.status(404).json({
        status: "Not found!",
        message: "Can't find user with that email",
      });

    const isValidPass = compareSync(password, user.password);

    if (!isValidPass)
      return res.status(400).json({
        status: "error",
        message: "Wrong password!",
      });

    const newUser = await User.findByPk(user.id, {
      include: {
        as: "profile",
        model: UserProfile,
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
      attributes: {
        exclude: ["password", "createdAt", "updatedAt"],
      },
    });

    newUser.profile.profile_pict = getFileUrl(
      newUser?.profile?.profile_pict,
      "users"
    );

    const payload = {
      ...newUser.dataValues,
      profile: newUser.dataValues.profile.dataValues,
    };

    const jwt = sign(payload, jwtSecret);

    return res.status(200).json({
      status: "success",
      data: {
        user: newUser,
        token: jwt,
        token_type: "Bearer",
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};
