const { Project } = require("../../models");
const { request, response } = require("express");

/**
 *
 * @param {request} req
 * @param {response} res
 */
module.exports = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findByPk(id);

    if (!project)
      return res.status(404).json({
        status: "not found",
        message: "Can't find project with that id",
      });

    await project.destroy();

    res.status(201).json({
      status: "created",
      message: "Project deleted!",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};
