const { User, UserProfile } = require("../../models");
const { request, response } = require("express");
const Joi = require("joi");
const { getFileUrl } = require("../../helpers");
const path = require("path");
const fs = require("fs");
const { Model } = require("sequelize");

/**
 *
 * @param {request} req
 * @param {response} res
 */
module.exports = async (req, res) => {
  try {
    const scheme = Joi.object({
      name: Joi.string().messages({
        "string.base": "Your name should a type of name",
      }),
      profession: Joi.string().messages({
        "string.base": "Your profession should a type of string",
      }),
    });

    const validate = scheme.validate(req.body);

    if (validate.error)
      return res.status(400).json({
        status: "error",
        message: validate.error.details[0].message,
      });

    const { name, profession } = req.body;
    const { id } = req.user;
    const file = req.file;

    const user = await User.findByPk(id, {
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

    await User.update({ name }, { where: { id } });

    const dataProfile = {};

    if (profession) {
      dataProfile.profession = profession;
    }

    if (file) {
      dataProfile.profile_pict = file.filename;
      const filePath = path.resolve(
        __dirname,
        `../../public/images/users/${user?.profile?.profile_pict}`
      );
      console.log("FILEPATH", filePath);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await UserProfile.update(dataProfile, { where: { user_id: id } });

    const newUser = await User.findByPk(id, {
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

    res.status(201).json({
      status: "success",
      data: { newUser },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};
