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
      title: Joi.string().messages({
        "string.base": "Project title must be a type of string",
      }),
      description: Joi.string().messages({
        "string.base": "Project description must be a type of string",
      }),
      status: Joi.string().valid("pending", "on-working", "complete").messages({
        "string.base": "Status must be a type of string",
        "any.only": "status value must either pending,on-working,or complete",
      }),
    });

    const validate = scheme.validate(req.body);

    if (validate.error)
      return res.status(400).json({
        status: "error",
        message: validate.error.details[0].message,
      });

    const { title, description, status } = req.body;
    const { id } = req.params;

    const task = await Task.findByPk(id);

    if (!task)
      return res.status(404).json({
        status: "not found",
        message: "Can't find task with that id",
      });

    await task.update({ title, description, status });

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
