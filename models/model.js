const { Client } = require('pg');
const config = require('./config');

class ListTodos {

    async displayAll(listId) {
        const client = new Client(config);
        client.connect();
        let list = await client.query('SELECT tasks.id, name, done FROM tasks INNER JOIN lists ON tasks.list_id=lists.id where lists.id=$1', [+listId]);
        client.end();
        return list.rows;
    }

    async displaySingle(listId, id) {
        const client = new Client(config);
        client.connect();
        let list = await client.query('SELECT tasks.id, name FROM tasks INNER JOIN lists ON tasks.list_id=lists.id where lists.id=$1 and tasks.id=$2', [+listId, +id]);
        client.end();
        if (list.rows) {
            return list.rows;
        }
    }

    async addTask(listId, body) {
        const client = new Client(config);
        client.connect();
        return client.query('INSERT INTO public.tasks(id, name, list_id) VALUES (default, $1, $2);', [body.name, +listId])
    }

    async updateTask(listId, id, body) {
        const client = new Client(config);
        client.connect();
        if (typeof body.done === "boolean") {
            return client.query('UPDATE public.tasks SET done=$1 WHERE tasks.id=$2;', [body.done, +body.id])
        }
    }

    rewriteTask(listId, id, body) {
        const client = new Client(config);
        client.connect();
        if (body.name) {
            if (typeof body.done === "boolean") {
                return client.query('UPDATE public.tasks SET done=$1, name=$2 WHERE tasks.id=$3', [body.done, body.name, +body.id])
            }
        }
    }

    deleteTask(listId, taskId) {
        const client = new Client(config);
        client.connect();
        if (+taskId) {
            return client.query('DELETE FROM public.tasks WHERE tasks.id=$1;', [+taskId])
        }
    }
}

const List = new ListTodos();

module.exports = List;
