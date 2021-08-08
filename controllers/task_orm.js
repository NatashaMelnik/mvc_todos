let List_orm = require('../orm_model/model');

class TaskController {

    // crud create read update delete

    displayAll(listId) {
        return List_orm.displayAll(listId);
    }

    displaySingle(listId, id) {
        return List_orm.displaySingle(listId, id);
    }

    addTask(listId, body) { 
        return List_orm.addTask(listId, body);
    }

    updateTask(listId, taskId, body) {
        return List_orm.updateTask(listId, taskId, body);
    }

    rewriteTask(listId, taskId, body) {
        return List_orm.rewriteTask(listId, taskId, body);
    }

    deleteTask(listId, taskId) {
        return List_orm.deleteTask(listId, taskId);
    }

}

module.exports = new TaskController();
