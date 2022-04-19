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
      title: Joi.string().required().messages({
        "string.base": "Project title must be a type of string",
        "any.required": "Please insert project title",
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
    const { id: user_id } = req.user;

    const project = await Project.create({
      title,
      description,
      user_id,
    });

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
