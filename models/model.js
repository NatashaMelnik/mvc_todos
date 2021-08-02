const List_ = {
    1: [
        { id: 1, name: 'Task1 from List1' },
        { id: 2, name: 'Task2 from List1' },
        { id: 3, name: 'Task3 from List1' }
    ],
    2: [
        { id: 1, name: 'Task 1 from List2' },
        { id: 2, name: 'Task 2 from List2' },
        { id: 3, name: 'Task 3 from List2' }
    ],
    3: [
        { id: 1, name: 'Task 1 from List3' },
        { id: 2, name: 'Task 2 from List3' },
        { id: 3, name: 'Task 3 from List3' }
    ]
};

class ListTodos {
    List; 
    constructor(List) {
        this.List = List;
    }

    displayAll(listId) {
        return this.List[listId];
    }

    displaySingle(listId, id) {
        return this.List[listId][id - 1];
    }

    addTask(listId, name, done_) {
        let task = { id: this.List[listId].length + 1, name: name };
        if (done_ === false || done_ === true) {
            task = { id: this.List[listId].length + 1, name: name, done: done_ }
        }
        this.List[listId].push(task);
        return this.List[listId];
    }

    updateTask(listId, id, body) {
        let task = this.List[listId].find(t => +t.id === +id);
        if (body === false || body === true) {
            body = {done: body}
        }
        if (task) {
            Object.assign(task, body);
            return this.List[listId];
        }
        return this.List[listId];
    }

    rewriteTask(listId, id, body) {
        let task = this.List[listId].find(t => +t.id === +id);
        if (task) {
            Object.assign(task, body);
            return this.List[listId];
        }
        return this.List[listId];
    }

    deleteTask(listId, taskId) {
        if (taskId <= this.List[listId].length) {
            this.List[listId].splice(taskId - 1, 1);
            return this.List[listId];
        }
        return this.List[listId];
    }
}

const List = new ListTodos(List_);

module.exports = List;
