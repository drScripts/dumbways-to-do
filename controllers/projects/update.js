const { Project } = require("../../models");
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
      title: Joi.string().messages({
        "string.base": "Project title must be a type of string",
      }),
      description: Joi.string().messages({
        "string.base": "Project description must be a type of string",
      }),
    });

    const validate = scheme.validate(req.body);

    if (validate.error)
      return res.status(400).json({
        status: "error",
        message: validate.error.details[0].message,
      });

    const { title, description } = req.body;
    const { id } = req.params;

    const project = await Project.findByPk(id);

    if (!project)
      return res.status(404).json({
        status: "not found",
        message: "Can't find project with that id",
      });

    await project.update({ title, description });

    res.status(201).json({
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
