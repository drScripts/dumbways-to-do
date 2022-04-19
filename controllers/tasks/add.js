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
      title: Joi.string().required().messages({
        "string.base": "Project title must be a type of string",
      }),
      description: Joi.string().messages({
        "string.base": "Project description must be a type of string",
      }),
      project_id: Joi.number().required().messages({
        "number.base": "Please insert project id",
        "any.required": "Please insert project id",
      }),
    });

    const validate = scheme.validate(req.body);

    if (validate.error)
      return res.status(400).json({
        status: "error",
        message: validate.error.details[0].message,
      });

    const { title, description, project_id } = req.body;

    const project = await Project.findByPk(project_id);

    if (!project)
      return res.status(404).json({
        status: "not found",
        message: "Can't find project with that id",
      });

    const task = await Task.create({ title, description, project_id });

    res.status(201).json({
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
