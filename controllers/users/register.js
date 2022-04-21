const { request, response } = require("express");
const Joi = require("joi");
const { User, UserProfile } = require("../../models");
const { hashSync } = require("bcrypt");
const { getFileUrl } = require("../../helpers");
const {
  jwtSecret,
  isProduction,
  cloudApiKey,
  cloudApiSecret,
  cloudName,
} = require("../../config");
const { sign } = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2;

/**
 *
 * @param {request} req
 * @param {response} res
 * @returns
 */
module.exports = async (req, res) => {
  try {
    const scheme = Joi.object({
      name: Joi.string().required().messages({
        "string.base": "Your name should be a type of string",
        "any.required": "Please insert your name",
      }),
      email: Joi.string().email().required().messages({
        "string.base": "Your email should be a type of string",
        "string.email": "Your email should be a type of active email",
        "any.required": "Please insert your email",
      }),
      password: Joi.string().min(8).required().messages({
        "string.base": "Your password should be a type of string",
        "string.min":
          "Your password length must be greater than equeal 8 character",
        "any.required": "Please insert your password",
      }),
      profession: Joi.string().messages({
        "string.base": "Your Profession must be a type of string",
      }),
    });

    const validate = scheme.validate(req.body);

    if (validate.error)
      return res.status(400).json({
        status: "error",
        message: validate.error.details[0].message,
      });

    const { name, email, password, profession } = req.body;

    const hashedPassword = hashSync(password, 10);

    const file = req.file;

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const profileData = {
      profession,
      user_id: user.id,
    };

    if (file) {
      if (isProduction) {
        cloudinary.config({
          api_key: cloudApiKey,
          cloud_name: cloudName,
          api_secret: cloudApiSecret,
        });

        const { url } = await cloudinary.uploader.upload(file.path, {
          use_filename: true,
          unique_filename: false,
          folder: "todo_users",
        });
        profileData.profile_pict = url;
      } else {
        profileData.profile_pict = file.filename;
      }
    }

    await UserProfile.create(profileData);

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
      profile: newUser.profile.dataValues,
    };

    const token = sign(payload, jwtSecret);

    res.status(201).json({
      status: "success",
      data: { user: newUser, token, token_type: "Bearer" },
    });
  } catch (err) {
    console.log(err);
    if (err?.errors) {
      if (err?.errors[0]?.path === "EMAIL_UNIQUE")
        return res.status(409).json({
          status: "conflict",
          message: "Email has already registered! Please use another email!",
        });
    }

    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};
