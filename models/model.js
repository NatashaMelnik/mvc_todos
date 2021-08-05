const { Client } = require('pg');
const config = require('./config');

const knex = require('knex')({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'qazpoi',
        database: 'birthdays'
    }
});

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


        // const client = new Client(config);
        // client.connect();
        // return client.query('SELECT * FROM tasks INNER JOIN lists ON tasks.list_id=lists.id where lists.id=$1 and tasks.id=$2', [+listId, +id])
        //     .then(data => {
        //         if (data.rows.length > 0) {
        //             return true;
        //         }
        //         else {
        //             return false;
        //         }
        //     });
    }

    async displayAll(listId) {
        return knex('tasks')
            .join('lists', 'tasks.list_id', '=', 'lists.id')
            .select('tasks.id', 'name', 'done')
            .where('lists.id', +listId)
            .then((data) => {
                return this.clean(data);
            });

        // const client = new Client(config);
        // client.connect();
        // let list = await client.query('SELECT tasks.id, name, done FROM tasks INNER JOIN lists ON tasks.list_id=lists.id where lists.id=$1', [+listId]);
        // return this.clean(list.rows);
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
                    // const client = new Client(config);
                    // return client.query('SELECT tasks.id, name FROM tasks INNER JOIN lists ON tasks.list_id=lists.id where lists.id=$1 and tasks.id=$2', [+listId, +id])
                    //     .then((data) => {
                    //         return data.rows[0];
                    //     });
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

        // const client = new Client(config);
        // client.connect();
        // return client.query('INSERT INTO public.tasks(id, name, list_id) VALUES (default, $1, $2);', [body.name, +listId])
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
                    // const client = new Client(config);
                    // client.connect();
                    // if (typeof body.done === "boolean") {
                    //     return client.query('UPDATE public.tasks SET done=$1 WHERE tasks.id=$2;', [body.done, +body.id])
                    // }
                }
            });
    }

    rewriteTask(listId, id, body) {
        return this.checkTaskExistence(listId, id)
            .then((condition) => {
                if (condition) {
                    return knex('tasks')
                        .where('tasks.id', '=', +body.id)
                        .update(body);
                    // const client = new Client(config);
                    // client.connect();
                    // if (body.name) {
                    //     if (typeof body.done === "boolean") {
                    //         return client.query('UPDATE public.tasks SET done=$1, name=$2 WHERE tasks.id=$3', [body.done, body.name, +body.id])
                    //     }
                    // }
                }
            });
    }

    deleteTask(listId, taskId) {
        return this.checkTaskExistence(listId, +taskId)
            .then((condition) => {
                if (condition) {
                    return knex('tasks')
                    .where('tasks.id', '=', +taskId)
                    .del();
                    // const client = new Client(config);
                    // client.connect();
                    // if (+taskId) {
                    //     return client.query('DELETE FROM public.tasks WHERE tasks.id=$1;', [+taskId])
                    // }
                }
            })
    }

    clean(obj) {
        for (let i = 0; i < obj.length; i++) {
            for (let propName in obj[i]) {
                if (obj[i][propName] === null || obj[i][propName].length === 0) {
                    delete obj[i][propName];
                }
            }
        }
        return obj;
    }
}

const List = new ListTodos();

module.exports = List;
