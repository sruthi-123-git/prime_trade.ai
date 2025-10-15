const Task = require('../models/Task');
const { taskCreateSchema, taskUpdateSchema } = require('../validators/taskValidator');

module.exports = {
    createTask : async (req, res, next) => {
        try {
            const { error, value } = taskCreateSchema.validate(req.body);
            if (error) return res.status(400).json({ message: error.message });

            const task = await Task.create({
            title: value.title,
            description: value.description,
            userId: req.user.id
            });
            res.status(201).json(task);
        } catch (err) {
            next(err);
        }
    },

    getTasks : async (req, res, next) => {
        try {
            // If admin, maybe return all tasks, else only own tasks
            let tasks;
            if (req.user.role === 'admin') {
            tasks = await Task.findAll();
            } else {
            tasks = await Task.findAll({ where: { userId: req.user.id } });
            }
            res.json(tasks);
        } catch (err) {
            next(err);
        }
    },

    getTaskById : async (req, res, next) => {
        try {
            const task = await Task.findByPk(req.params.id);
            if (!task) {
            return res.status(404).json({ message: 'Task not found' });
            }
            // If not admin and not owned
            if (req.user.role !== 'admin' && task.userId !== req.user.id) {
            return res.status(403).json({ message: 'Forbidden' });
            }
            res.json(task);
        } catch (err) {
            next(err);
        }
    },

    updateTask : async (req, res, next) => {
        try {
            const { error, value } = taskUpdateSchema.validate(req.body);
            if (error) return res.status(400).json({ message: error.message });

            const task = await Task.findByPk(req.params.id);
            if (!task) {
            return res.status(404).json({ message: 'Task not found' });
            }
            if (req.user.role !== 'admin' && task.userId !== req.user.id) {
            return res.status(403).json({ message: 'Forbidden' });
            }
            await task.update(value);
            res.json(task);
        } catch (err) {
            next(err);
        }
    },

    deleteTask : async (req, res, next) => {
        try {
            const task = await Task.findByPk(req.params.id);
            if (!task) {
            return res.status(404).json({ message: 'Task not found' });
            }
            if (req.user.role !== 'admin' && task.userId !== req.user.id) {
            return res.status(403).json({ message: 'Forbidden' });
            }
            await task.destroy();
            res.json({ message: 'Deleted successfully' });
        } catch (err) {
            next(err);
        }
    },
};
