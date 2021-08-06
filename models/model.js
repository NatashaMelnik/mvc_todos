const knex = require('./knexconf');
class ListTodos {

    async checkTaskExistence(listId, id) {

        return knex('tasks')
            .join('lists', 'tasks.list_id', '=', 'lists.id')
            .select('tasks.id', 'name', 'done')
            .where({ 'lists.id': +listId, 'tasks.id': +id })
            .then((data) => {
                if (data.length > 0) {
                    return true;
                }
            });
    }

    async displayAll(listId) {
        return knex('tasks')
            .join('lists', 'tasks.list_id', '=', 'lists.id')
            .select('tasks.id', 'name', 'done')
            .where('lists.id', +listId)
            .then((data) => {
                return clean(data);
            });
    }

    async displaySingle(listId, id) {
        return this.checkTaskExistence(listId, id)
            .then(condition => {
                if (condition) {
                    return knex('tasks')
                        .join('lists', 'tasks.list_id', '=', 'lists.id')
                        .select('tasks.id', 'name', 'done')
                        .where({ 'lists.id': +listId, 'tasks.id': +id })
                        .then((data) => {
                            return this.clean(data);
                        });
                }
            });
    }

    async addTask(listId, body) {
        if (typeof body.done === "boolean") {
            return knex('public.tasks').insert({ name: body.name, list_id: +listId, done: body.done });
        }
        else if (body.name) {
            return knex('public.tasks').insert({ name: body.name, list_id: +listId });
        }
    }

    async updateTask(listId, id, body) {
        return this.checkTaskExistence(listId, id)
            .then((condition) => {
                if (condition) {
                    return knex('tasks')
                        .where('tasks.id', '=', +body.id)
                        .update({
                            done: body.done
                        });
                }
            });
    }

    async rewriteTask(listId, id, body) {
        return this.checkTaskExistence(listId, id)
            .then((condition) => {
                if (condition) {
                    return knex('tasks')
                        .where('tasks.id', '=', +body.id)
                        .update(body);
                }
            });
    }

    async deleteTask(listId, taskId) {
        return this.checkTaskExistence(listId, +taskId)
            .then((condition) => {
                if (condition) {
                    return knex('tasks')
                        .where('tasks.id', '=', +taskId)
                        .del();
                }
            });
    }

    async displayTodayTasks() {
        return knex('tasks')
            .count('name')
            .whereBetween('due_date', [getToday(), getToday()]);
    }

    async undoneTasks() {
        return knex('tasks')
            .count('done', { as: 'unfinished_tasks' })
            .rightJoin('lists', 'tasks.list_id', 'lists.id')
            .where('done', '=', 'false')
            .groupByRaw('list_id');
    }

    async displayTodayTasksList() {
        return knex('tasks')
            .select('list_id', 'name', 'due_date')
            .join('lists', 'tasks.list_id', '=', 'lists.id')
            .where('due_date', '=', getToday());
    }

    async displayAllSQL(listId, all) {
        if (all + '' === 'true') {
            console.log('if');
            return knex('tasks')
                .select('list_id', 'name', 'due_date', 'done')
                .join('lists', 'tasks.list_id', '=', 'lists.id')
                .where({
                    list_id: +listId,
                    done: 'false'
                }).orWhere({
                    list_id: +listId,
                    done: 'true'
                });
        }
        else {
            console.log('else');
            return knex('tasks')
                .select('list_id', 'name', 'due_date', 'done')
                .join('lists', 'tasks.list_id', '=', 'lists.id')
                .where({
                    list_id: +listId,
                    done: 'false'
                });
        }
    }

}

function getToday() {
    let now = new Date();
    return `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
}

function clean(obj) {
    for (let i = 0; i < obj.length; i++) {
        for (let propName in obj[i]) {
            if (obj[i][propName] === null || obj[i][propName].length === 0) {
                delete obj[i][propName];
            }
        }
    }
    return obj;
}
const List = new ListTodos();

module.exports = List;
