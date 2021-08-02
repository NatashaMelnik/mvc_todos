let List = require('../models/model');

class TaskController {

    // crud create read update delete

    displayAll(listId) {
        return List.displayAll(listId);
    }

    displaySingle(listId, id) {
        return List.displaySingle(listId, id);
    }

    addTask(listId, body) { 
        return List.addTask(listId, body);
    }

    updateTask(listId, taskId, body) {
        return List.updateTask(listId, taskId, body);
    }

    rewriteTask(listId, taskId, body) {
        return List.rewriteTask(listId, taskId, body);
    }

    deleteTask(listId, taskId) {
        return List.deleteTask(listId, taskId);
    }

}

module.exports = new TaskController();
