const { User, UserProfile } = require("../../models");
const { request, response } = require("express");
const { getFileUrl } = require("../../helpers");

/**
 *
 * @param {request} req
 * @param {response} res
 */
module.exports = async (req, res) => {
  try {
    const { id } = req.user;

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

    if (!user)
      return res.status(404).json({
        status: "not found",
        message: "User not found!",
      });

    user.profile.profile_pict = getFileUrl(
      user?.profile?.profile_pict,
      "users"
    );

    res.send({
      status: "success",
      data: { user },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};
