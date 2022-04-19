const { Task } = require("../../models");
const { request, response } = require("express");

/**
 *
 * @param {request} req
 * @param {response} res
 */
module.exports = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findByPk(id);

    if (!task)
      return res.status(404).json({
        status: "not found",
        message: "Can't find Task with that id",
      });

    res.status(200).json({
      status: "created",
      data: { task },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};
