const { Task, Project } = require("../../models");
const { request, response } = require("express");
const Joi = require("joi");

/**
 *
 * @param {request} req
 * @param {response} res
 */
module.exports = async (req, res) => {
  try {
    const scheme = Joi.object({
      project_id: Joi.number().required().messages({
        "number.base": "Please insert project id",
        "any.required": "Please insert project id",
      }),
    });

    const validate = scheme.validate(req.query);

    if (validate.error)
      return res.status(400).json({
        status: "error",
        message: validate.error.details[0].message,
      });

    const { project_id } = req.query;

    const project = await Project.findByPk(project_id, {
      include: {
        as: "tasks",
        model: Task,
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    if (!project)
      return res.status(404).json({
        status: "not found",
        message: "Can't find project with that id",
      });

    res.status(200).json({
      status: "created",
      data: { project },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};
