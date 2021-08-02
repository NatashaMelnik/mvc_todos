let List = require('../models/model');

class TaskController {

    // crud create read update delete

    displayAll(res, listId) {
        return res.send(List[+listId]);
    }

    displaySingle(res, listId, id) {
        return res.send(List[listId][id - 1]);
    }

    createTask(req) {
        const listId = +req.params.listId;
        let task = { id: List[listId].length + 1, name: req.body.name };
        List[listId].push(task);
        if (req.body.done === false || req.body.done === true) {
            Object.assign(task, req.body);
        }
        return List;
    }

    addTask(req, res) { 
        return res.send(this.createTask(req));
    }

    updateTask(req, res) {
        const listId = +req.params.listId;
        const taskId = parseInt(req.params.id);
        let task = List[listId].find(t => +t.id === +taskId);
        if (task) {
            Object.assign(task, req.body);
            return res.json(List[listId]);
        }
        return res.json(List[listId]);
    }

    rewriteTask(req, res) {
        const listId = +req.params.listId;
        const taskId = parseInt(req.params.id);
        let task = List[listId].find(t => +t.id === +taskId);
        if (task) {
            Object.assign(task, req.body);
            return res.json(List[listId]);
        }
        return res.json(List[listId]);
    }

    deleteTask(req, res) {
        const listId = +req.params.listId;
        const taskId = parseInt(req.params.id);
        if (taskId <= List[listId].length) {
            List[listId].splice(taskId - 1, 1);
            return res.json(List[listId]);
        }
        return res.json(List[listId]);
    }

}

module.exports = new TaskController();
