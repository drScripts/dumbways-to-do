const { Project, Task } = require("../../models");
const { request, response } = require("express");

/**
 *
 * @param {request} req
 * @param {response} res
 */
module.exports = async (req, res) => {
  try {
    const { id } = req.user;

    const projects = await Project.findAll({
      where: { user_id: id },
      include: {
        as: "tasks",
        model: Task,
        order: [["createdAt", "ASC"]],
      },
      order: [["createdAt", "ASC"]],
    });

    const mappedProjects = projects?.map((project) => {
      project.dataValues.count_task = project?.tasks?.length;

      const tasksFinished = project?.tasks?.filter(
        (task) => task?.status === "complete"
      );
      project.dataValues.count_task_complete = tasksFinished?.length || 0;
      return project;
    });

    res.status(200).json({
      status: "success",
      data: { projects: mappedProjects },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};
