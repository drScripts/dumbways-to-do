const { Project } = require("../../models");
const { request, response } = require("express");

/**
 *
 * @param {request} req
 * @param {response} res
 */
module.exports = async (req, res) => {
  try {
    const { id } = req.user;

    const projects = await Project.findAll({ where: { user_id: id } });

    res.status(201).json({
      status: "created",
      data: { projects },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};
