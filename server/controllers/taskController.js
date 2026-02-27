import TaskModel from "../models/taskModel.js";

const TaskController = {
  async createTask(req, res) {
    try {
      const task = await TaskModel.create(req.body);
      res.status(201).json(task);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getAllTasks(req, res) {
    try {
      const tasks = await TaskModel.getAll();
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },


  async updateTask(req, res) {
    try {
      const task = await TaskModel.update(req.params.id, req.body);
      if (!task) return res.status(404).json({ error: "Task not found" });
      res.status(200).json(task);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async deleteTask(req, res) {
    try {
      await TaskModel.delete(req.params.id);
      res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async searchTasks(req, res) {
    try {
      const { q } = req.query;
      const tasks = await TaskModel.search(q || "");
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default TaskController;
