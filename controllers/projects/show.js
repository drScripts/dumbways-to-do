const { Project, Task } = require("../../models");
const { request, response } = require("express");

/**
 *
 * @param {request} req
 * @param {response} res
 */
module.exports = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findByPk(id, {
      include: {
        as: "tasks",
        model: Task,
      },
    });

    if (!project)
      return res.status(404).json({
        status: "not found",
        message: "Can't find project with that id",
      });

    project.dataValues.count_task = project?.tasks?.length;
    const tasksFinished = project?.tasks?.filter(
      (task) => task?.status === "complete"
    );
    project.dataValues.count_task_complete = tasksFinished?.length || 0;

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
